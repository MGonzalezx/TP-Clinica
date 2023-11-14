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
  }
}
