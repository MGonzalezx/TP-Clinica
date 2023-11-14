import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterAdministradorComponent } from 'src/app/components/register-administrador/register-administrador.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { AdministrarEspecialistasComponent } from './administrar-especialistas/administrar-especialistas.component';
import { AdministrarTurnosComponent } from './administrar-turnos/administrar-turnos.component';
import { SolicitarTurnoComponent } from 'src/app/components/solicitar-turno/solicitar-turno.component';
import { MiPerfilComponent } from 'src/app/components/mi-perfil/mi-perfil.component';
import { authGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  {
    path: 'admin',
    component: AdministradorComponent,
  },
  { 
    path: 'registerAdmin', component: RegisterAdministradorComponent, 
  },
  {
    path: 'administrar-especialistas',component: AdministrarEspecialistasComponent,
  },
  { path: 'administrar-turnos', component: AdministrarTurnosComponent },
  { path: 'solicitar-turno', component: SolicitarTurnoComponent },
  { path: 'perfil', component: MiPerfilComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRoutingModule {}