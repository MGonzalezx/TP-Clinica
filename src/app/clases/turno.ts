import { HistoriaClinica } from './historia-clinica';
export class Turno {
  uid: string;
  idEspecialista: string;
  Especialista: string;
  idEspecialidad: string;
  Especialidad: string;
  idPaciente: string;
  Paciente: string;
  resena: string;
  comentario: string;
  atencion: string;
  encuesta: string;
  estado: string;
  fecha: string;
  hora: string;
  historiaClinica:  HistoriaClinica | null;
  comentarioPaciente: string;
  fotoPaciente: string;
  constructor(
    uid: string,
    idEspecialista: string,
    idEspecialidad: string,
    idPaciente: string,
    estado: string,
    fecha: string,
    hora: string,
    
  ) {
    this.uid = uid;
    this.idEspecialista = idEspecialista;
    this.idEspecialidad = idEspecialidad;
    this.idPaciente = idPaciente;
    this.estado = estado;
    this.fecha = fecha;
    this.hora = hora;
    this.Especialidad='';
    this.Especialista='';
    this.Paciente = '';
    this.resena='';
    this.comentario='';
    this.atencion='';
    this.encuesta='';
    this.historiaClinica= null;
    this.comentarioPaciente='';
    this.fotoPaciente = '';
  }
}