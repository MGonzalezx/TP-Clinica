import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { AdministradorComponent } from './administrador/administrador.component';
import { AdministrarEspecialistasComponent } from './administrar-especialistas/administrar-especialistas.component';
import { NavbarAdmComponent } from './navbar-adm/navbar-adm.component';
//import { RegisterModule } from '../register/register.module';


@NgModule({
  declarations: [
    AdministradorComponent,
    AdministrarEspecialistasComponent,
    NavbarAdmComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    //RegisterModule
  ],exports:[NavbarAdmComponent]
})
export class UsuariosModule { }