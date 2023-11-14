import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { RegisterEspecialistaComponent } from 'src/app/components/register-especialista/register-especialista.component';
import { RegisterPacienteComponent } from 'src/app/components/register-paciente/register-paciente.component';
import { RegisterAdministradorComponent } from 'src/app/components/register-administrador/register-administrador.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

@NgModule({
  declarations: [
    RegisterComponent,
    RegisterEspecialistaComponent,
    RegisterPacienteComponent,
    RegisterAdministradorComponent,
    
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    UsuariosModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],exports:[RegisterAdministradorComponent]
})
export class RegisterModule {}