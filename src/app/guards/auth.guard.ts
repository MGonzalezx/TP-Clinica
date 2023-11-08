import { inject } from '@angular/core';
import { Auth,getAuth } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';
import { onAuthStateChanged } from '@firebase/auth';



export const authGuard: CanActivateFn = (route, state) => {
  //const token = localStorage.getItem('token');
  const router = inject(Router);
  let fbauth = inject(Auth);
  fbauth = getAuth();
  onAuthStateChanged(fbauth, (user) => {
    if (user) {
 
      const uid = user.uid;
      console.log(uid);
      return true;

   
 
    } else {
      router.navigate(['/bienvenida']);
      return false;
    }
    });

    return true;


};
