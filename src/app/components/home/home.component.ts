import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { FirebaseService } from 'src/app/services/firebase.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  seLogueoAdmin:boolean = false;
  constructor(private authService: FirebaseService) {}

  ngOnInit(): void {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        const uid = user.uid;
        console.log(uid);
        const admin =  this.authService.getUserByUidAndType(uid,'admins');
        if(admin != null){
          this.seLogueoAdmin = true;
          console.log(admin);
          
        }
        console.log(user);
      } else {
      
      }
   });
  }
}
