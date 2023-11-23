export class Encuesta {
  uid: string;
  puntajeClinica: number;
  comentarioClinica: string;
  puntajePersonal: number;
  comentarioPersonal: string;
  constructor(
    puntajeClinica: number,
    comentarioClinica: string,
    puntajePersonal: number,
    comentarioPersonal: string
  ) {
    this.puntajeClinica = puntajeClinica;
    this.comentarioClinica = comentarioClinica;
    this.puntajePersonal = puntajePersonal;
    this.comentarioPersonal = comentarioPersonal;
    this.uid = '';
  }
}