import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterAdministradorComponent } from 'src/app/components/register-administrador/register-administrador.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { AdministrarEspecialistasComponent } from './administrar-especialistas/administrar-especialistas.component';

const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  {
    path: 'admin',
    component: AdministradorComponent,
  },
  { path: 'registerAdmin', component: RegisterAdministradorComponent, pathMatch: 'full' },
  {
    path: 'administrar-especialistas',
    component: AdministrarEspecialistasComponent, pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRoutingModule {}