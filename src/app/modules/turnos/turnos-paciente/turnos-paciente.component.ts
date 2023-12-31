import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Turno } from 'src/app/clases/turno';
import { AlertasService } from 'src/app/services/alertas.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { openbox } from 'src/app/animations/animation';
@Component({
  selector: 'app-turnos-paciente',
  templateUrl: './turnos-paciente.component.html',
  styleUrls: ['./turnos-paciente.component.scss'],
  animations: [openbox]
})
export class TurnosPacienteComponent{

  isOpen = false;

  turnos: any[] = [];
  turnoA: Turno | null = null;
  @Input() pacienteId: string = '';
  encuesta: boolean = false;
  @ViewChild('filtro') filtro!: ElementRef;

  private _turnos = new BehaviorSubject<any[]>([]);

  turnosFiltrados = this._turnos
  .asObservable()
  .pipe(
    map((turnos) => {
      if (this.filtro && this.filtro.nativeElement) {
        const filtro = this.filtro.nativeElement.value.toLowerCase();
        return turnos.filter((turno) => {
          return Object.keys(turno).some((key) => {
            const val = turno[key];
            if (key === 'historiaClinica' && val !== null && typeof val === 'object') {
              // Buscar dentro del objeto de historia clínica
              return Object.values(val).some((clinicaVal: any) => {
                if (clinicaVal && typeof clinicaVal === 'object') {
                  // Si es un objeto (clave-valor), buscar dentro de los valores
                  return Object.values(clinicaVal).some((nestedVal: any) =>
                    nestedVal.toString().toLowerCase().includes(filtro)
                  );
                } else {
                  // Si no es un objeto, buscar normalmente
                  return clinicaVal.toString().toLowerCase().includes(filtro);
                }
              });
            } else {
              // Buscar en otros valores del turno
              return val && val.toString().toLowerCase().includes(filtro);
            }
          });
        });
      } else {
        return turnos;
      }
    })
  );

  constructor(
    private firestoreService: FirebaseService,
    private alertas: AlertasService,
    private spinner: NgxSpinnerService
  ) {}

  async ngOnInit(): Promise<void> {
    this.spinner.show();
    await this.cargarTurnos();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

  async cargarTurnos() {
    if (!this.pacienteId) return;
  
    try {
      const turnos = await this.firestoreService.obtenerTurnosDelUsuario(this.pacienteId,'paciente');
      const especialidades = await this.firestoreService.obtenerEspecialidades();
      console.log(turnos);
      
      //ejecutar múltiples promesas de manera concurrente y esperar a que todas se resuelvan antes de continuar con la ejecución del código.
      const turnosConDatos = await Promise.all(
        turnos.map(async (turno) => {
          const especialidad = especialidades.find((especialidad) => especialidad.id === turno.idEspecialidad);
          const especialista = await this.firestoreService.getUserByUidAndType(turno.idEspecialista, 'especialistas');
          const paciente = await this.firestoreService.getUserByUidAndType(turno.idPaciente,'pacientes');

          turno.Especialidad = especialidad?.nombre || '';
          turno.idEspecialidad = especialidad?.id || '';
          turno.Especialista = `${especialista?.nombre} ${especialista?.apellido}` || '';
          turno.idEspecialista = especialista?.uid || '';
          turno.Paciente = `${paciente?.nombre} ${paciente?.apellido}` || '';
          return turno;
        })
      );
  
      this._turnos.next(turnosConDatos);
    } catch (error) {
      console.error('Error al cargar los turnos:', error);
    }
  }

  filtrarTurnos() {
    this._turnos.next(this._turnos.value);
  }


  obtenerFechaHoraFormateada(fecha: any, hora: string): string {
    const fechaFormateada = fecha.toDate().toLocaleDateString('es-AR');
    return `${fechaFormateada} ${hora}`;
  }

  obtenerFechaFormateada(fecha: any): string {
    const fechaFormateada = fecha.toDate().toLocaleDateString('es-AR');
    return `${fechaFormateada}`;
  }

  async cancelarTurno( turno: Turno) {
    this.alertas.mostraAlertaInput('Cancelar Turno','Ingrese motivo de la cancelación').then(comentario=>{
      if(comentario != undefined){

        turno.estado = 'cancelado';
        turno.comentarioPaciente = comentario;
        
        
        this.firestoreService.modificarTurno(turno);

      }

    });
  }

  verResenia(turno:Turno){
    console.log(turno.comentario);
    console.log(turno.resena);

    
    this.alertas.mostraAlertaSimpleSinIcono(turno.resena + turno.comentario ,'Reseña del Turno');

  }

  async manejarEncuestaEnviada(id: string) {
    console.log('Encuesta enviada:', id);
    if (this.turnoA ) {
      this.turnoA.encuesta = id;
      try {
        console.log(this.turnoA);
        await this.firestoreService.modificarTurno(this.turnoA);
        Swal.fire({
          icon: 'success',
          title: 'Encuesta enviada',
          text: 'Encuesta enviada..',
          showConfirmButton: false,
          timer: 1500,
        });
        this.encuesta = false;
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Hubo un problema',
          text: 'no se pudo enviar la encuesta..',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  }

  completarEncuesta(turno : Turno) {
    
    setTimeout(() =>{
      this.isOpen = !this.isOpen;
    },150)
    setTimeout(() =>{
      this.encuesta = !this.encuesta;
    },100)
   
   
   
    this.turnoA = turno;
    console.log(this.encuesta);
    console.log(this.turnoA);
    
    
  }

  calificarAtencion(turno: Turno){
    this.alertas.mostraAlertaInput('Reseña atención','Por favor, ingrese una reseña sobre la atencion de ' + turno.Especialista).then(texto=>{

      if(texto != undefined){
          
        turno.atencion = texto;
        
        this.firestoreService.modificarTurno(turno);
        
      }
    });
  }
}
