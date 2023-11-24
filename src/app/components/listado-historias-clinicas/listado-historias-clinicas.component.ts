import { Component } from '@angular/core';
import { HistoriaClinica } from 'src/app/clases/historia-clinica';
import { Horario } from 'src/app/clases/horario';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-listado-historias-clinicas',
  templateUrl: './listado-historias-clinicas.component.html',
  styleUrls: ['./listado-historias-clinicas.component.scss']
})
export class ListadoHistoriasClinicasComponent {
  identidad: string | null = '';
  usuario: any = null;
  historiasClinicas: HistoriaClinica[] = [];

  constructor(private authService: FirebaseService) {}

  async ngOnInit(): Promise<void> {
    await this.user();
    this.identidad = localStorage.getItem('identidad');
    await this.obtenerHistorias();
  }

  async obtenerHistorias() {
    let historias = await this.authService.obtenerTodasHistoriaClinica();

    switch (this.identidad) {
      case 'paciente':
        this.historiasClinicas = historias.filter(historia => historia.idPaciente === this.usuario.uid);
        break;
      case 'especialista':
        this.historiasClinicas = historias.filter(historia => historia.idEspecialista === this.usuario.uid);
        break;
      case 'admin':
        this.historiasClinicas = historias;
        break;
    }
  }

  async user() {
    const user = localStorage.getItem('logueado');

    if (!user) {
        return;
    }

    const tiposUsuario = ['especialistas', 'pacientes', 'admins'];
    for (const tipo of tiposUsuario) {
        const tipoSingular = tipo.slice(0, -1); // Eliminar la 's' al final si existe
        const usuario = await this.authService.getUserByUidAndType(user, tipo);
        if (usuario) {
            this.identidad = tipoSingular;
            this.usuario = usuario;
            localStorage.setItem('identidad', tipoSingular);
            break; // Salir del bucle si se encuentra el tipo de usuario
        }
    }
}
}
