import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public afAuth: AngularFireAuth) { }

  signIn() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(() => {
        console.log('Signed in');
      });
  }

  signOut() {
    this.afAuth.auth.signOut()
      .then(() => {
        console.log('Signed out');
      });
  }

  authed() {
    return this.afAuth.authState.pipe(
      map(res => res ? true : false)
    );
  }

  get currentUser() {
    return this.afAuth.auth.currentUser;
  }

}
