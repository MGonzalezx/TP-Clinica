import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar-adm',
  templateUrl: './navbar-adm.component.html',
  styleUrls: ['./navbar-adm.component.scss']
})
export class NavbarAdmComponent {
  constructor(private authService: FirebaseService, private router: Router) {}
  logOut() {
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: '¿Estás seguro de que deseas cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, cerramos la sesión
        this.authService.logout();
        localStorage.removeItem('logueado');
        localStorage.removeItem('identidad');
        localStorage.removeItem('admin');  
        this.router.navigate(['/bienvenida']);
      }
    });
  }

  mostrarRegistroAdministradores: boolean = false;
  mostrarAmdministrarEspecialistas: boolean = false;
  mostrarRegistroAdministrador() {
    this.mostrarRegistroAdministradores = true;
    this.mostrarAmdministrarEspecialistas = false;
  }
  mostrarListaEspecialistas() {
    this.mostrarRegistroAdministradores = false;
    this.mostrarAmdministrarEspecialistas = true;
  }
}
