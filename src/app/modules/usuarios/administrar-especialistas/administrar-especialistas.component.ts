import { Component } from '@angular/core';
import { Especialista } from 'src/app/clases/especialista';
import { FirebaseService } from 'src/app/services/firebase.service';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
@Component({
  selector: 'app-administrar-especialistas',
  templateUrl: './administrar-especialistas.component.html',
  styleUrls: ['./administrar-especialistas.component.scss']
})
export class AdministrarEspecialistasComponent {
  especialistas: Especialista[] = [];
  seLogueoAdmin:boolean = false;
  constructor(
    private authService: FirebaseService,
  ) {}

  ngOnInit(): void {
    this.cargarEspecialistas();
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
    
        const uid = user.uid;
        console.log(uid);
        const admin =  this.authService.getUserByUidAndType(uid,'admins');
        if(admin != null){
          this.seLogueoAdmin = true;
          console.log(admin);
          
        }
    
      } else {
      
      }
   });
  }

  async cargarEspecialistas() {
    const especialistasData = await this.authService.obtenerEspecialistas();
    const especialidades = await this.authService.obtenerEspecialidades();
  
    this.especialistas = especialistasData.map((especialistaData: any) => {
      const especialidadesDelEspecialista = Array.isArray(especialistaData.especialidades)
      ? especialistaData.especialidades.map((especialidadId: string) => {
          const especialidad = especialidades.find((esp: any) => esp.id === especialidadId);
          return especialidad ? especialidad.nombre : 'Especialidad Desconocida';
        })
      : [];
      
      return new Especialista(
        especialistaData.uid,
        especialistaData.nombre,
        especialistaData.apellido,
        especialistaData.edad,
        especialistaData.dni,
        especialidadesDelEspecialista,
        especialistaData.foto1,
        especialistaData.verificado
      );
    });
  }

  async aceptarEspecialista(especialista: Especialista): Promise<void> {
    try {
      await this.authService.actualizarVerificadoEspecialista(
        especialista.uid,
        'true'
      );
      especialista.verificado = 'true';
    } catch (error) {
      console.error('Error al aceptar al especialista: ', error);
      throw error;
    }
  }

  async rechazarEspecialista(especialista: Especialista) {
    try {
      await this.authService.actualizarVerificadoEspecialista(
        especialista.uid,
        'null'
      );
      especialista.verificado = 'null';
    } catch (error) {
      console.error('Error al rechazar al especialista: ', error);
      throw error;
    }
  }
}
