import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-turnos-paciente',
  templateUrl: './turnos-paciente.component.html',
  styleUrls: ['./turnos-paciente.component.scss']
})
export class TurnosPacienteComponent implements OnInit {
  turnos: any[] = [];
  @Input() pacienteId: string = '';

  @ViewChild('filtroEspecialidad') filtroEspecialidad!: ElementRef;
  @ViewChild('filtroEspecialista') filtroEspecialista!: ElementRef;

  private _turnos = new BehaviorSubject<any[]>([]);
  turnosFiltrados = this._turnos.asObservable().pipe(
    map(turnos => 
      turnos.filter(turno => 
        turno.Especialidad.includes(this.filtroEspecialidad.nativeElement.value) &&
        turno.Especialista.includes(this.filtroEspecialista.nativeElement.value)
      )
    )
  );

  constructor(
    private firestoreService: FirebaseService,

  ) {}

  ngOnInit(){
   // Tarda mucho en cargar, poner spninner luego
    this.cargarTurnos();
    
  }

  // async cargarTurnos() {
  //   if (this.pacienteId !== '') {
  //     let turnos = await this.firestoreService.obtenerTurnosDelUsuario(
  //       this.pacienteId,'paciente'
  //     );
  //     let especialidades = await this.firestoreService.obtenerEspecialidades();

  //     for (let turno of turnos) {
  //       let especialidad = especialidades.find(
  //         (especialidad) => especialidad.id === turno.idEspecialidad
  //       );
  //       turno.Especialidad = especialidad.nombre;
  //       turno.idEspecialidad = especialidad.id;

  //       let especialista = await this.firestoreService.getUserByUidAndType(
  //         turno.idEspecialista,
  //         'especialistas'
  //       );

  //       turno.Especialista = especialista.nombre + ' ' + especialista.apellido;
  //       turno.idEspecialista = especialista.id;
  //     }

  //     this._turnos.next(turnos);
  //   }
  // }

  async cargarTurnos() {
    if (!this.pacienteId) return;
  
    try {
      const turnos = await this.firestoreService.obtenerTurnosDelUsuario(this.pacienteId,'paciente');
      const especialidades = await this.firestoreService.obtenerEspecialidades();
  
      //ejecutar múltiples promesas de manera concurrente y esperar a que todas se resuelvan antes de continuar con la ejecución del código.
      const turnosConDatos = await Promise.all(
        turnos.map(async (turno) => {
          const especialidad = especialidades.find((especialidad) => especialidad.id === turno.idEspecialidad);
          const especialista = await this.firestoreService.getUserByUidAndType(turno.idEspecialista, 'especialistas');
  
          turno.Especialidad = especialidad?.nombre || '';
          turno.idEspecialidad = especialidad?.id || '';
          turno.Especialista = `${especialista?.nombre} ${especialista?.apellido}` || '';
          turno.idEspecialista = especialista?.id || '';
  
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


}
