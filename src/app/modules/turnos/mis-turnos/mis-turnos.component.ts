import { Component } from '@angular/core';

import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss']
})
export class MisTurnosComponent {
  user: any;
  id: string = '';
  esPaciente: boolean = false;

  constructor(private authService: FirebaseService) {}

  async ngOnInit(): Promise<void> {
    let id = localStorage.getItem('logueado');
    this.esPaciente = localStorage.getItem('esPaciente') === 'true';
    if (id) {
      this.id = id;
      let pac = await this.authService.getUserByUidAndType(id, 'pacientes');
      if (pac != null) {
        this.esPaciente = true;
        localStorage.setItem('esPaciente', 'true');
      }
    }
  }
}
