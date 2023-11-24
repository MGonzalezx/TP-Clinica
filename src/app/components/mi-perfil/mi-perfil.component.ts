import { Component, OnInit } from '@angular/core';
import { Horario } from 'src/app/clases/horario';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss']
})
export class MiPerfilComponent implements OnInit {

  identidad: string | null = '';
  usuario: any = null;
  horario: { [key: string]: string } = {};
  mostrarHorarios = false;
  estadoInicialHorarios: any;


  constructor(private authService: FirebaseService, private router: Router) {}

  ngOnInit(): void {
    console.log('hace algo');
    this.user();
    this.identidad = localStorage.getItem('identidad');
  }

  guardar() {   
    this.usuario.turnos = [];
    for (let especialidadId in this.horario) {
      let turno = this.horario[especialidadId];
      let nuevoHorario = {
        especialidad: especialidadId,
        especialista: this.usuario.uid,
        turno: turno,
      };
      this.usuario.turnos.push(nuevoHorario);
    }
    this.authService.actualizarHorariosEspecialista(
      this.usuario.uid,
      this.usuario.turnos
    );    
  this.estadoInicialHorarios = {...this.horario};
  }
  
  sonIguales(obj1: any, obj2: any) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }
  
  async user() {
    let user = localStorage.getItem('logueado');
    
    
    if (user) {
      const especialista = await this.authService.getUserByUidAndType(user,'especialistas');
      if (especialista) {
        const especialidades = await this.authService.obtenerEspecialidades();
        this.identidad = 'especialista';
        this.usuario = {
          ...especialista,
          especialidades: especialista.especialidades.map(
            (especialidadId: string) => {
              const especialidad = especialidades.find(
                (esp: any) => esp.id === especialidadId
              );
              return especialidad
                ? especialidad.nombre
                : 'Especialidad Desconocida';
            }
          ),
          especialidadesMap: especialista.especialidades.reduce(
            (map: any, especialidadId: string) => {
              const especialidad = especialidades.find(
                (esp: any) => esp.id === especialidadId
              );
              if (especialidad) {
                map[especialidad.nombre] = especialidadId;
              }
              return map;
            },
            {}
          ),
        };

        this.horario = this.usuario.turnos.reduce(
          (map: any, turno: Horario) => {
            map[turno.especialidad] = turno.turno;
            return map;
          },
          {}
        );

        this.estadoInicialHorarios = {...this.horario};

        localStorage.setItem('identidad', 'especialista');
      } else {
        const paciente = await this.authService.getUserByUidAndType(user,'pacientes');
        if (paciente) {
          this.identidad = 'paciente';
          this.usuario = paciente;
          localStorage.setItem('identidad', 'paciente');
        } else {
          const admin = await this.authService.getUserByUidAndType(user,'admins');
          this.identidad = 'admin';
          this.usuario = admin;
          localStorage.setItem('identidad', 'admin');
        }
      }
    }
  }

  verhistorias(){
    this.router.navigate(['/historias']);
  }
}
