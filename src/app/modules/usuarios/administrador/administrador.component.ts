import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})
export class AdministradorComponent implements OnInit {


  seLogueoAdmin:boolean = false;
  constructor(private authService: FirebaseService){

  }

  ngOnInit(): void {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
    
        const uid = user.uid;
        console.log(uid);
        const admin =  this.authService.getAdminByUid(uid);
        if(admin != null){
          this.seLogueoAdmin = true;
          console.log(admin);
          
        }
    
      } else {
      
      }
   });
  }
 
}
