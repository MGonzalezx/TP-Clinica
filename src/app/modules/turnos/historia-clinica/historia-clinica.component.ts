import { Component,  Input,  } from '@angular/core';
import { AbstractControl,FormArray,FormBuilder,FormGroup,Validators} from '@angular/forms';
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

  constructor(
    private firestoreService: FirebaseService,
    private fb: FormBuilder,
    private alertas: AlertasService
  ) {
    this.form = this.fb.group({
      altura: ['',[Validators.required, Validators.min(100), Validators.max(230)],],
      peso: ['', [Validators.required, Validators.min(1), Validators.max(200)]],
      temperatura: ['',[Validators.required, Validators.min(34), Validators.max(42)],],
      presion: ['', Validators.required],
      datosDinamicos: this.fb.array([]),
    });
  }

  agregarDatoDinamico() {
    const datosDinamicos = this.form.get('datosDinamicos') as FormArray;

    if (datosDinamicos && datosDinamicos.length < 3) {
      const nuevoDato = this.fb.group({
        clave: [null, Validators.required],
        valor: [null, Validators.required],
      });
      datosDinamicos.push(nuevoDato);
    }
  }

  quitarDatoDinamico(index: number) {
    const datosDinamicos = this.form.get('datosDinamicos') as FormArray;

    if (datosDinamicos) {
      datosDinamicos.removeAt(index);
    }
  }

  isFormArray(control: AbstractControl | null): control is FormArray {
    return control instanceof FormArray;
  }

  getDatosDinamicosControls(): AbstractControl[] {
    const formArray = this.form.get('datosDinamicos') as FormArray;
    return formArray ? formArray.controls : [];
  }

  async onSubmit() {
    if (this.form.valid && this.turno) {
      this.historiaClinica = this.form.value;
      const datosDinamicosObj: any = {};
      for (const dato of (this.form.get('datosDinamicos') as FormArray)
        .controls) {
        const { clave, valor } = dato.value;
        datosDinamicosObj[clave] = valor;
      }

      this.historiaClinica.datosDinamicos = datosDinamicosObj;
      
      console.log(this.historiaClinica);
      let id = await this.firestoreService.guardarHistoriaClinica(
        this.historiaClinica
      );
      if (id) {
        try {
          this.turno.historiaClinica = this.historiaClinica;
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
