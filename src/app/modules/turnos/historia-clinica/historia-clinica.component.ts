import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HistoriaClinica } from 'src/app/clases/historia-clinica';
import { Turno } from 'src/app/clases/turno';
import { AlertasService } from 'src/app/services/alertas.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.scss']
})
export class HistoriaClinicaComponent {
  historiaClinica = new HistoriaClinica();
  form: FormGroup;
  @Input() turno: Turno | null = null;

  constructor(private firestoreService: FirebaseService, private alertas: AlertasService) {
    this.form = new FormGroup({
      altura: new FormControl('', [
        Validators.required,
        Validators.min(100),
        Validators.max(230),
      ]),
      peso: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(200),
      ]),
      temperatura: new FormControl('', [
        Validators.required,
        Validators.min(34),
        Validators.max(42),
      ]),
      presion: new FormControl('', Validators.required),
      datosDinamicos: new FormGroup({
        clave: new FormControl(null, Validators.required),
        valor: new FormControl(null, Validators.required),
      }),
    });
  }

  async onSubmit() {
    if (this.form.valid && this.turno) {
      this.historiaClinica = this.form.value;
      this.historiaClinica.idPaciente = this.turno.idPaciente;
      this.historiaClinica.idEspecialista = this.turno.idEspecialista;
      console.log(this.historiaClinica);
      let id = await this.firestoreService.guardarHistoriaClinica(
        this.historiaClinica
      );
      if (id) {
        try {
          this.turno.historiaClinica = id;
          console.log(this.turno);
          await this.firestoreService.modificarTurno(this.turno);
          this.alertas.mostraAlertaSimpleSuccess('Historia clinica cargada','Completado');
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Hubo un problema',
            text: 'no se pudo enviar la historia clinica..',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    }
  }
}
