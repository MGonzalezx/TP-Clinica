import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Turno } from 'src/app/clases/turno';
import Swal from 'sweetalert2';
import { AlertasService } from 'src/app/services/alertas.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-turnos-especialista',
  templateUrl: './turnos-especialista.component.html',
  styleUrls: ['./turnos-especialista.component.scss']
})
export class TurnosEspecialistaComponent {
  turnos: any[] = [];
  turnoSeleccionado: Turno | null = null;
  turnoA: Turno | null = null;
  comentario: boolean = false;
  rechazo: boolean = false;
  resena: boolean = false;
  finalizar: boolean = false;
  motivoCancelacion: string = '';
  turnoFinalizado: string = '';
  datoResena: string = '';
  datoComentario: string = '';
  @Input() especialistaId: string = '';

  @ViewChild('filtro') filtro!: ElementRef;

  private _turnos = new BehaviorSubject<any[]>([]);
  turnosFiltrados = this._turnos
  .asObservable()
  .pipe(
    map((turnos) => {
      if (this.filtro && this.filtro.nativeElement) {
        const filtro = this.filtro.nativeElement.value.toLowerCase();
        return turnos.filter((turno) =>
          Object.values(turno).some((val: any) =>
            val.toString().toLowerCase().includes(filtro)
          )
        );
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
    if (!this.especialistaId) return;
  
    try {
      const turnos = await this.firestoreService.obtenerTurnosDelUsuario(this.especialistaId,'especialista');
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
          turno.idPaciente = paciente.uid;

          console.log(turno);
          
          console.log(turno.comentario);
          console.log(turno.resena);
          
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


 async aceptarTurno(turno: Turno){

  turno.estado = 'aceptado';
  try {
    console.log(turno);
    await this.firestoreService.modificarTurno(turno);
    this.alertas.mostraAlertaSimpleSuccess('Turno aceptado','Estado del Turno');
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Hubo un problema',
      text: 'el turno no ha sido aceptado..',
      showConfirmButton: false,
      timer: 1500,
    });
  }
  }

  finalizarTurno(turno:Turno){
    
    this.alertas.mostraAlertaInput('Finalizar Turno','Por favor, ingrese una reseña sobre la consulta').then(comentario=>{
      if(comentario != undefined){
        
        turno.estado = 'finalizado'
        turno.resena = comentario;
        this.firestoreService.modificarTurno(turno);
        

      }
    });
  }

  async cancelarTurno( turno: Turno) {
    this.alertas.mostraAlertaInput('Cancelar Turno','Ingrese motivo de la cancelación').then(comentario=>{
      if(comentario != undefined){

        turno.estado = 'cancelado';
        turno.comentario = comentario;
        
        
        this.firestoreService.modificarTurno(turno);

      }

    });
  }


  verResenia(turno:Turno){
    console.log(turno.comentario);
    console.log(turno.resena);

    
    this.alertas.mostraAlertaSimpleSinIcono(turno.resena + turno.comentario ,'Reseña del Turno');

  }

  rechazarTurno(turno: Turno){
    this.turnoSeleccionado = turno;
    this.alertas.mostraAlertaInput('Cancelar Turno','Ingrese motivo de la cancelación').then(comentario=>{
      if(comentario != undefined){
        this.turnoA = turno;
        
       
        turno.comentario = comentario;
        turno.estado = 'rechazado';
      
        this.firestoreService.modificarTurno(this.turnoA);

      }

    });
  }
}
