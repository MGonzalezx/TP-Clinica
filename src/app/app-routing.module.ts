import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
//import { adminGuard } from './guards/admin.guard copy';

const routes: Routes = [
  { path: 'bienvenida', component: BienvenidaComponent},
  { path: '', redirectTo: '/bienvenida', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate:[authGuard], children:[
    { path: 'turnos', loadChildren: () => import('./modules/turnos/turnos.module').then(m => m.TurnosModule) }
  ] },  
  { path: 'homeAdmin', loadChildren: () => import('./modules/usuarios/usuarios.module').then(m => m.UsuariosModule), canActivate:[authGuard] },
  { path: 'register', loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
