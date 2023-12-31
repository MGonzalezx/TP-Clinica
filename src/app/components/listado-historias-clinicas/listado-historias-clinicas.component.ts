import { Component } from '@angular/core';
import { HistoriaClinica } from 'src/app/clases/historia-clinica';
import { FirebaseService } from 'src/app/services/firebase.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { Turno } from 'src/app/clases/turno';
import { slideInAnimation } from 'src/app/animations/animation';

@Component({
  selector: 'app-listado-historias-clinicas',
  templateUrl: './listado-historias-clinicas.component.html',
  styleUrls: ['./listado-historias-clinicas.component.scss'],
  animations:[slideInAnimation]
})

export class ListadoHistoriasClinicasComponent {
  identidad: string | null = '';
  usuario: any = null;
  historiasClinicas: Turno[] = [];
  historiasClinicasPorPaciente: Turno[] = [];
  turno: Turno | null = null;
  historiaVer: boolean = false;
  mostrar: boolean = false;
  historiapruebaPdf: HistoriaClinica = new HistoriaClinica();

  constructor( 
    private authService: FirebaseService,
    ) {}

  async ngOnInit(): Promise<void> {
    
    await this.user();
    this.identidad = localStorage.getItem('identidad');
    await this.obtenerHistorias();
    console.log(this.historiasClinicas);
    
  }

  mostrarHistoria(turno: Turno) {
    this.historiaVer = true;
    this.turno = turno;
  }

  descargarHistoriasClinicas(Turnos: Turno[]) {
    // Convetimos cada historia clínica en un objeto que se pueda convertir a Excel
    const historiasClinicasArray = Turnos.map((turno) => {
      // Creamos una copia de historiaClinica para no modificar el objeto original
      let historiaClinicaCopia: Partial<Turno> = {
        ...turno,
      };

      // Eliminamos los campos que no queremos incluir

      // Desglosar el objeto datosDinamicos en propiedades individuales
      let datosDinamicosDesglosados: { [clave: string]: any } = {};
      for (let clave in turno.historiaClinica?.datosDinamicos) {
        datosDinamicosDesglosados[clave] =
          turno.historiaClinica.datosDinamicos[clave];
      }

      return {
        Especialidad: turno.Especialidad,
        Especialista: turno.Especialista,
        Paciente: turno.Paciente,
        fecha: turno.fecha,
        altura: turno.historiaClinica?.altura,
        peso: turno.historiaClinica?.peso,
        presion: turno.historiaClinica?.presion,
        temperatura: turno.historiaClinica?.temperatura,
        ...datosDinamicosDesglosados,
      } as any;
    });

    const worksheet = XLSX.utils.json_to_sheet(historiasClinicasArray);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    saveAs(
      new Blob([excelBuffer]),
      `${Turnos[0].Paciente}_historias_clinicas.xlsx`
    );
  }

  

 

  historiasClinicasUnicas: Turno[] = [];
  async obtenerHistorias() {
    let historiasClinicasA: Turno[] = [];
    let pacientes = await this.authService.getAllPacientes();
    let especialidades = await this.authService.obtenerEspecialidades();
    let especialistas = await this.authService.obtenerEspecialistas();
    switch (this.identidad) {
      case 'paciente':
        historiasClinicasA = await this.authService.obtenerTurnosDelUsuario(
          this.usuario.uid,
          'paciente'
        );
        break;
      case 'especialista':
        historiasClinicasA = await this.authService.obtenerTurnosDelUsuario(
          this.usuario.uid,
          'especialista'
        );
        break;
      case 'admin':
        historiasClinicasA = await this.authService.obtenerTodosLosTurnos();
        break;
    }

    for (const historia of historiasClinicasA) {
      const pacienteEncontrado = pacientes.find(
        (p) => p.uid === historia.idPaciente
      );

      if (pacienteEncontrado) {
        const nombrePaciente = pacienteEncontrado.nombre;
        const fotoPaciente = pacienteEncontrado.foto1;

        historia.Paciente = nombrePaciente;
        historia.fotoPaciente = fotoPaciente;
      } else {
        historia.Paciente = 'Desconocido';
      }
      if (
        !this.historiasClinicasUnicas.some(
          (h) => h.Paciente === historia.Paciente
        )
      ) {
        this.historiasClinicasUnicas.push(historia);
      }

      historia.Especialista =
        especialistas.find((e) => e.uid === historia.idEspecialista)?.nombre ||
        'Desconocido';
      historia.Especialidad =
        especialidades.find((e) => e.id === historia.idEspecialidad)?.nombre ||
        'Desconocido';
    }
    this.historiasClinicas = historiasClinicasA.filter(
      (historia) => historia.historiaClinica !== null
    );

    console.log(this.historiasClinicas);
  }
  mostrarHistoriasClinicasDePaciente(idPaciente: string) {
    
    console.log(idPaciente);
    console.log('idPacienteidPacienteidPacienteidPaciente');

    this.historiasClinicasPorPaciente = this.historiasClinicas.filter(
      (historia) => historia.idPaciente === idPaciente
    );
  }

  mostraryDescargarHistoriasClinicasDePaciente(idPaciente: string) {
    this.historiasClinicasPorPaciente = this.historiasClinicas.filter(
      (historia) => historia.idPaciente === idPaciente
    );
    this.descargarHistoriasClinicas(this.historiasClinicasPorPaciente);
  }

  uidSeleccionado: string = '';

  checkboxSeleccionado: any;

  mostrarResena(historia: Turno, event: any) {
    if (
      this.checkboxSeleccionado &&
      this.checkboxSeleccionado !== event.target
    ) {
      this.checkboxSeleccionado.checked = false;
    }
    this.checkboxSeleccionado = event.target;
    this.mostrar = event.target.checked;
    this.uidSeleccionado = historia.uid;
  }

  async user() {
    let user = localStorage.getItem('logueado');
    if (user) {
      const especialista = await this.authService.getUserByUidAndType(
        user,
        'especialistas'
      );
      if (especialista) {
        this.identidad = 'especialista';
        this.usuario = especialista;
        localStorage.setItem('identidad', 'especialista');
      } else {
        const paciente = await this.authService.getUserByUidAndType(
          user,
          'pacientes'
        );
        if (paciente) {
          this.identidad = 'paciente';
          this.usuario = paciente;
          localStorage.setItem('identidad', 'paciente');
        } else {
          const admin = await this.authService.getUserByUidAndType(
            user,
            'admins'
          );
          this.identidad = 'admin';
          this.usuario = admin;
          localStorage.setItem('identidad', 'admin');
        }
      }
    }
  }
}
