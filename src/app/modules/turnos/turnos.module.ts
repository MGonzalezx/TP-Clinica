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
import { SharedModulesModule } from '../shared-modules/shared-modules.module';
import { HistoriaClinicaComponent } from './historia-clinica/historia-clinica.component';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [
    MisTurnosComponent,
    TurnosEspecialistaComponent,
    TurnosPacienteComponent,
    SolicitarTurnoComponent,    
    ListadoDiasTurnoComponent,
    EncuestaComponent,
    DatepipePipe,
    HistoriaClinicaComponent,
    
  ],
  imports: [
    CommonModule,
    TurnosRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModulesModule,
    NgxSpinnerModule
    
  ]
})
export class TurnosModule { }
