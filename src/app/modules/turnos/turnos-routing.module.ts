import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisTurnosComponent } from './mis-turnos/mis-turnos.component';
import { SolicitarTurnoComponent } from '../../components/solicitar-turno/solicitar-turno.component';

const routes: Routes = [
  { path: 'mis-turnos', component: MisTurnosComponent },
  { path: 'solicitar-turno', component: SolicitarTurnoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurnosRoutingModule { }