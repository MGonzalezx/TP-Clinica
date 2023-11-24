import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { AdministradorComponent } from './administrador/administrador.component';
import { AdministrarEspecialistasComponent } from './administrar-especialistas/administrar-especialistas.component';
import { NavbarAdmComponent } from './navbar-adm/navbar-adm.component';
import { AdministrarTurnosComponent } from './administrar-turnos/administrar-turnos.component';
//import { RegisterModule } from '../register/register.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModulesModule } from '../shared-modules/shared-modules.module';
@NgModule({
  declarations: [
    AdministradorComponent,
    AdministrarEspecialistasComponent,
    NavbarAdmComponent,
    AdministrarTurnosComponent,
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModulesModule
    //RegisterModule
  ],exports:[NavbarAdmComponent]
})
export class UsuariosModule { }