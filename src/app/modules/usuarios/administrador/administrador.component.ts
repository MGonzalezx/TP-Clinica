import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { FirebaseService } from 'src/app/services/firebase.service';
import { rotateInAnimation } from 'src/app/animations/animation';
@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss'],
  animations:[rotateInAnimation]
})
export class AdministradorComponent implements OnInit {
  
  state: string = 'default';

  rotate() {
      this.state = (this.state === 'default' ? 'rotated' : 'default');
  }

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
          console.log(admin);
          
        }
    
      } else {
      
      }
   });
  }
 
}
