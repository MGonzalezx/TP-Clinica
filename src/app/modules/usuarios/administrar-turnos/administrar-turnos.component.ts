import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { BehaviorSubject, Observable  } from 'rxjs';
import { map } from 'rxjs/operators';
import { Turno } from 'src/app/clases/turno';
import { AlertasService } from 'src/app/services/alertas.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

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

  @ViewChild('filtro') filtro!: ElementRef;

  private _turnos = new BehaviorSubject<any[]>([]);
  turnosFiltrados!: Observable<any[]>;

  ngAfterViewInit() {
    
    setTimeout(() => {
      this.turnosFiltrados = this._turnos
        .asObservable()
        .pipe(
          map((turnos) => {
            let filtro = this.filtro.nativeElement.value.toLowerCase();
            return turnos.filter((turno) => {
              let especialidad = turno.Especialidad.toLowerCase();
              let especialista = turno.Especialista.toLowerCase();
              return especialidad.includes(filtro) || especialista.includes(filtro);
            });
          })
        );
       
    }, 4500);  
  }

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

  // obtenerFechaHoraFormateada(fecha: any, hora: string): string {
  //   const fechaFormateada = fecha.toDate().toLocaleDateString('es-AR');
  //   return `${fechaFormateada} ${hora}`;
  // }

  // obtenerFechaFormateada(fecha: any): string {
  //   const fechaFormateada = fecha.toDate().toLocaleDateString('es-AR');
  //   return `${fechaFormateada}`;
  // }

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
