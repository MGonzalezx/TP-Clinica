import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
//import { adminGuard } from './guards/admin.guard copy';
import { ListadoHistoriasClinicasComponent } from './components/listado-historias-clinicas/listado-historias-clinicas.component';
import { HomeVistaComponent } from './components/home-vista/home-vista.component';

const routes: Routes = [
  { path: 'bienvenida', component: BienvenidaComponent},
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'turnos',
        loadChildren: () =>
          import('./modules/turnos/turnos.module').then((m) => m.TurnosModule),
      },
      { path: 'perfil', component: MiPerfilComponent },
      { path: 'pacientes', component: ListadoHistoriasClinicasComponent },
      { path: 'historias', component: ListadoHistoriasClinicasComponent },
      { path: 'vista', component: HomeVistaComponent },
    ],
  },

  { path: 'homeAdmin', loadChildren: () => import('./modules/usuarios/usuarios.module').then(m => m.UsuariosModule), canActivate:[authGuard] },
  { path: 'register', loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterModule)},
  { path: '', redirectTo: '/bienvenida', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
