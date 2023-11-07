import { Injectable } from '@angular/core';
import Swal from'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  public reenvioEmail:boolean = false;
  public confirmoTurno:boolean = false;

  constructor() { }

  async mostrarAlertaConfirmacionEmail(mensaje:string,titulo:string,mensajeConfirmed:string){
    const result = await Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Reenviar email de verificación'
    });
    
    if (result.isConfirmed) {
      Swal.fire(
        'Enviado!',
        mensajeConfirmed,
        'success'
      );
      this.reenvioEmail = true;
    }
    else {
      this.reenvioEmail = false;

    }
    return result;
  }
  mostraAlertaSimple(mensaje:string,titulo:string){
    // console.log(mensaje)
    Swal.fire({
      icon: 'error',
      title: titulo,
      text: mensaje,
    })
  }
  mostraAlertaSimpleSuccess(mensaje:string,titulo:string){
    // console.log(mensaje)
    Swal.fire({
      icon: 'success',
      title: titulo,
      text: mensaje,
    })
  }
  mostraAlertaSimpleSinIcono(mensaje:string,titulo:string){
    // console.log(mensaje)
    Swal.fire({
      title: titulo,
      text: mensaje,
    })
  }
  public async mostraAlertaTurno(mensaje:string,titulo:string) {
    // console.log(mensaje)
    let retorno = false;
    let result = await Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    })

      if (result.isConfirmed) {
        console.log(result)
        Swal.fire(
          'Turno confirmado',
          'El turno ha sido tomado',
          'success'
        )
        this.confirmoTurno = true;
      }
      else{
        this.confirmoTurno= false;
      }
    return result;
  }

  public async mostraAlertaInput(titulo:string,mensaje:string){
    // console.log(mensaje)
    
    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: titulo,
      inputPlaceholder: mensaje,
      inputAttributes: {
        'aria-label': mensaje
      },
      showCancelButton: true
    })
    console.log(text);
    
    return text;
  }
  
}