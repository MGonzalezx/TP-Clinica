import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Especialidad } from 'src/app/clases/especialidad';
import { Especialista } from 'src/app/clases/especialista';
import { Paciente } from 'src/app/clases/paciente';
import { Turno } from 'src/app/clases/turno';
import { FirebaseService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss']
})
export class SolicitarTurnoComponent implements OnInit {
  selectedImage: any = null;
  imagenURL: string = '';
  user: any;
  form!: FormGroup;
  errorCheck: boolean = false;
  Message: string = '';
  especialidades: Especialidad[] = [];
  especialistas: Especialista[] = [];
  especialistasFiltrados: Especialista[] = [];
  especialidadesFiltradas: Especialidad[] = [];
  pacientes: Paciente[] = [];
  especialidadSeleccionada: string | undefined = '';
  especialistaSeleccionado: string = '';


  esAdmin: boolean = false;
  fechaObtenida: boolean = false;
  especialista: string | undefined = undefined;
  especialidad: string | undefined = undefined;
  especialistaFalso:boolean = false;

  constructor(private authService: FirebaseService, private router: Router, private cdr: ChangeDetectorRef) 
  {

  }


  async ngOnInit(): Promise<void> {
    this.form = new FormGroup({
      especialidad: new FormControl('', [Validators.required]),
      especialista: new FormControl('', [Validators.required]),
      paciente: new FormControl('', this.esAdmin ? [Validators.required] : []),
      hora: new FormControl('', [Validators.required]),
      fecha: new FormControl('', [Validators.required]),
    });
    this.cargarEspecialistas();
    this.cargarEspecialidades();
    let id = localStorage.getItem('logueado');
    this.esAdmin = localStorage.getItem('admin') === 'true';
    if (id) {
      let admin = await this.authService.getUserByUidAndType(id,'admins');
      if (admin != null) {
        this.esAdmin = true;
        this.cargarPacientes();
        localStorage.setItem('admin', 'true');
      }
    } 
  }

  onEspecialidadChange(uid: any) {
    this.especialidadSeleccionada = uid;
    //this.especialidad = uid;
    this.form.controls['especialidad'].setValue(uid);
    this.fechaObtenida = false;
   
    console.log('Especialidad seleccionada: ' + this.especialidadSeleccionada);
    
  }

  onEspecialistaChange(uid: any) {
    this.especialistaSeleccionado = uid;
    this.especialista = uid;
    this.form.controls['especialista'].setValue(uid);
    this.filtrarEspecialidades();
    this.especialidadSeleccionada = undefined;
    this.fechaObtenida = false;
    this.cdr.detectChanges();
    
    //console.log(this.especialidad);
    
  }

  async cargarPacientes() {
    this.pacientes = await this.authService.getAllPacientes();
  }

  async cargarEspecialidades() {
    const especialidadesData = await this.authService.obtenerEspecialidades();
    this.especialidades = especialidadesData.map((especialidadData: any) => {
      const especialidad = new Especialidad(
        especialidadData.id,
        especialidadData.nombre,
        especialidadData.img
      );
      return especialidad;
    });

    this.cargarEspecialistas();
  }

  async cargarEspecialistas() {
    const especialistasData = await this.authService.obtenerEspecialistas();
    const especialidades = this.especialidades;

    this.especialistas = especialistasData.map((especialistaData: any) => {
      const especialidadesDelEspecialista = Array.isArray(
        especialistaData.especialidades
      )
        ? especialistaData.especialidades.map((especialidadId: string) => {
            const especialidad = especialidades.find(
              (esp: any) => esp.uid === especialidadId
            );
            return especialidad ? especialidad.uid : 'Especialidad Desconocida';
          })
        : [];

       let esp = new Especialista(
          especialistaData.uid,
          especialistaData.nombre,
          especialistaData.apellido,
          especialistaData.edad,
          especialistaData.dni,
          especialidadesDelEspecialista,
          especialistaData.foto1,
          especialistaData.verificado
        );
        esp.turnos = especialistaData.turnos
      return esp;
    });
  }


  filtrarEspecialistas() {
    this.especialistasFiltrados = this.especialistas.filter(
      (especialista: any) =>
        especialista.especialidades.includes(this.especialidadSeleccionada)
    );
  }

  filtrarEspecialidades() {

     // Seleccionamos al especialista y tenemos el uid en especialistaSeleccionado
    const especialistaActual = this.especialistas.find((especialista: any) => especialista.uid === this.especialistaSeleccionado);
    console.log(especialistaActual);
    
    if (especialistaActual) {
      this.especialidadesFiltradas = this.especialidades.filter(
        (especialidad: any) => especialistaActual.especialidades.includes(especialidad.uid)
      );
  
      console.log(this.especialidadesFiltradas);
    } else {
      console.log("Especialista no encontrado");
    }
    
  }

  onTurnoSeleccionado(turno: { dia: string; hora: string }) {
     if(turno.hora == ''){
      this.fechaObtenida = false;
      this.especialista = undefined;
      this.especialistaFalso =  true;
      Swal.fire({
        icon: 'error',
        title: 'Error, el especialista no tiene horarios cargados...',
        timer: 2500,
      })
      return;
    }
    const fechaSeleccionada: string = turno.dia;
    const horaSeleccionada: string = turno.hora;
    
  
    
    this.form.controls['fecha'].setValue(fechaSeleccionada);
    this.form.controls['hora'].setValue(horaSeleccionada);
    this.fechaObtenida = true;
    

    Swal.fire({
      icon: 'warning',
      text:
        'La fecha seleccionada es ' +
        fechaSeleccionada  +
        ' y la hora es ' +
        horaSeleccionada ,
      title: '¡Fecha!',
      showConfirmButton: false,
      timer: 2000,
    });
  }

  async onSubmit() {

    Swal.fire({
      title: '¿Está seguro/a que quiero tomar este turno?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      },
    }).then(async (result) => {

      if (result.isConfirmed) {
        if (this.form.valid && this.especialistaFalso == false) {
          let paciente = localStorage.getItem('logueado');
          if (this.esAdmin) {
            paciente = this.form.controls['paciente'].value;
          }
          if (paciente) {
            const puedeCargarTurno = await this.validarTurno(paciente);
            if (puedeCargarTurno) {
              this.cargarTurno(paciente);
              
            }
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error, complete los datos correctamente',
            timer: 2500,
          });
        }
      } else if (result.isDenied) {
        Swal.fire('Accion Cancelada', '', 'info')
      }
    })

   
  }

  async validarTurno(pacienteId: string) {
    const especialidad = this.form.controls['especialidad'].value;

    const turnosDelPaciente = await this.authService.obtenerTurnosDelUsuario(
      pacienteId,'paciente'
    );

    const turnosEnLaMismaEspecialidad = turnosDelPaciente.filter(
      (turno) => turno.idEspecialidad == especialidad
    );

    if (turnosEnLaMismaEspecialidad.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El paciente ya tiene un turno en esta especialidad.',
        timer: 2500,
      });
      return false;
    } else {
      return true;
    }
  }

  async cargarTurno(paciente: string) {
    try {
      let turno = new Turno(
        '',
        this.form.controls['especialista'].value,
        this.form.controls['especialidad'].value,
        paciente,
        'espera',
        this.form.controls['fecha'].value,
        this.form.controls['hora'].value
      );
      await this.authService.guardarTurno(turno);
      Swal.fire({
        icon: 'success',
        text: 'debera esperar que el especialista acepte!',
        title: '¡Turno solicitado!',
        showConfirmButton: false,
        timer: 1500,
      });
      this.form.reset();
      this.especialista = undefined;
      this.fechaObtenida = false;
      this.especialidadSeleccionada = undefined;
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Error al solicitar turno',
        text: this.Message,
        timer: 4000,
      });
    }
  }
}
