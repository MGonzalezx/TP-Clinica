import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { slideInAnimation } from 'src/app/animations/animation';
@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.scss'],
  animations: [slideInAnimation]
  
})
export class BienvenidaComponent {
  constructor(private router: Router) {}

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
  goToRegister(): void {
    this.router.navigate(['/register']);
  }
  goToRegisterA(): void {
    this.router.navigate(['/registerAdmin']);
  }
}
