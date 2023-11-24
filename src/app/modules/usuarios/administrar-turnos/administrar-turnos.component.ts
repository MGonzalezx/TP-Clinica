import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Turno } from 'src/app/clases/turno';
import { AlertasService } from 'src/app/services/alertas.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-administrar-turnos',
  templateUrl: './administrar-turnos.component.html',
  styleUrls: ['./administrar-turnos.component.scss']
})
export class AdministrarTurnosComponent {
  turnos: any[] = [];
  turnoA: Turno | null = null;
  comentario: boolean = false;

  motivoCancelacion: string = '';

  @ViewChild('filtroEspecialidad') filtroEspecialidad!: ElementRef;
  @ViewChild('filtroEspecialista') filtroEspecialista!: ElementRef;

  private _turnos = new BehaviorSubject<any[]>([]);
  turnosFiltrados = this._turnos
    .asObservable()
    .pipe(
      map((turnos) =>
        turnos.filter(
          (turno) =>
            turno.Especialidad.includes(
              this.filtroEspecialidad.nativeElement.value
            ) &&
            turno.Paciente.includes(this.filtroEspecialista.nativeElement.value)
        )
      )
    );

  constructor(
    private firestoreService: FirebaseService,
    private alertas: AlertasService
  ) {}

  async ngOnInit(): Promise<void> {
   
    await this.cargarTurnos();
   
  }

  async cargarTurnos() {
    try {
        const [turnos, especialidades] = await Promise.all([
            this.firestoreService.obtenerTodosLosTurnos(),
            this.firestoreService.obtenerEspecialidades()
        ]);

        

        const turnosConDatos = await Promise.all(turnos.map(async (turno) => {
          console.log(turno);
          
            const especialidad = especialidades.find((especialidad) => especialidad.id === turno.idEspecialidad);
            const especialista = await this.firestoreService.getUserByUidAndType(turno.idEspecialista, 'especialistas');
            const paciente = await this.firestoreService.getUserByUidAndType(turno.idPaciente, 'pacientes');
          
            turno.Especialidad = especialidad?.nombre || '';
            turno.idEspecialidad = especialidad?.id || '';
            turno.Especialista = `${especialista?.nombre} ${especialista?.apellido}` || '';
            turno.idEspecialista = especialista?.uid || '';
            turno.Paciente = `${paciente?.nombre} ${paciente?.apellido}` || '';
            turno.idPaciente = paciente?.uid || '';

            return turno;
        }));

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

  cargarComentario(turno: Turno) {
    this.motivoCancelacion = '';
    this.comentario = true;
    this.turnoA = turno;
  }
}
