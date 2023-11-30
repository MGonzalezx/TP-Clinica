import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  seLogueoAdmin:boolean = false;

  constructor(private authService: FirebaseService){

  }
  ngOnInit(): void {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
    if (user) {
   
      const uid = user.uid;
      console.log(uid);
      const admin =  this.authService.getUserByUidAndType(uid,'admins');
      if(admin != null){
        this.seLogueoAdmin = true;
      }
   
    } else {
    
      }
    });
    
  }
  
  mostrarRegistroPacientes: boolean = false;
  mostrarRegistroEspecialistas: boolean = false;
  mostrarRegistroAdministradores: boolean = false;

  
  mostrarRegistroPaciente() {
    this.mostrarRegistroPacientes = true;
    this.mostrarRegistroEspecialistas = false;
  }
  mostrarRegistroEspecialista() {
    this.mostrarRegistroEspecialistas = true;
    this.mostrarRegistroPacientes = false;
  }

  async mostrarRegistroAdministrador() {
    
    if(this.seLogueoAdmin){
      this.mostrarRegistroEspecialistas = false;
      this.mostrarRegistroPacientes = false;
      this.mostrarRegistroAdministradores = true;
    }
  }
}
