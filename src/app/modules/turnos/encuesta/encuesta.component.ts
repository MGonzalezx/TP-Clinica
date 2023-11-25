import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Encuesta } from 'src/app/clases/encuesta';
import { FirebaseService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2';
import { openbox } from 'src/app/animations/animation';
@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss'],
  animations: [openbox]
})
export class EncuestaComponent {

  isOpen = false;

  form!: FormGroup;
  checkError: boolean = false;
  errorMessage: string = '';
  @Output() encuestaEnviada = new EventEmitter<string>();
  constructor(private authService: FirebaseService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      puntajeClinica: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(10),
      ]),
      comentarioClinica: new FormControl('', [Validators.required]),
      puntajePersonal: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(10),
      ]),
      comentarioPersonal: new FormControl('', [Validators.required]),
    });
  }

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      try {
        let encuesta = new Encuesta(
          this.form.controls['puntajeClinica'].value,
          this.form.controls['comentarioClinica'].value,
          this.form.controls['puntajePersonal'].value,
          this.form.controls['comentarioPersonal'].value
        );
        console.log(encuesta);
        let id = await this.authService.guardarEncuesta(encuesta);
        if(id){
          this.encuestaEnviada.emit(id);
        }
        Swal.fire({
          icon: 'success',
          text: 'se cargo su encuesta!',
          title: '¡Encuesta enviada!',
          showConfirmButton: false,
          timer: 1500,
        });
        this.form.reset();
      } catch (error: any) {
        Swal.fire({
          icon: 'error',
          title: 'Error al enviar encuesta',
          text: 'hubo un problema al enviar la encuesta',
          timer: 4000,
        });
      }
    }
  }
}
