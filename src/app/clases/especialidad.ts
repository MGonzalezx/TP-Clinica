export class Especialidad {
    uid: string;
    nombre: string;
    img: string;
    constructor(
      uid: string,
      nombre: string,
      img: string,
    ) {
      this.uid = uid;
      this.nombre = nombre;
      this.img = img;
    }
}