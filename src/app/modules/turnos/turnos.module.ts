import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurnosRoutingModule } from './turnos-routing.module';
import { MisTurnosComponent } from './mis-turnos/mis-turnos.component';
import { TurnosEspecialistaComponent } from 'src/app/modules/turnos/turnos-especialista/turnos-especialista.component';
import { TurnosPacienteComponent } from 'src/app/modules/turnos/turnos-paciente/turnos-paciente.component';
import { SolicitarTurnoComponent } from 'src/app/components/solicitar-turno/solicitar-turno.component';
import { ListadoDiasTurnoComponent } from './listado-dias-turno/listado-dias-turno.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatepipePipe } from 'src/app/pipes/datepipe.pipe';
import { EncuestaComponent } from './encuesta/encuesta.component';
import { MedicoPipe } from 'src/app/pipes/medico.pipe';
@NgModule({
  declarations: [
    MisTurnosComponent,
    TurnosEspecialistaComponent,
    TurnosPacienteComponent,
    SolicitarTurnoComponent,    
    ListadoDiasTurnoComponent,
    EncuestaComponent,
    DatepipePipe,
    MedicoPipe
  ],
  imports: [
    CommonModule,
    TurnosRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    
  ]
})
export class TurnosModule { }
