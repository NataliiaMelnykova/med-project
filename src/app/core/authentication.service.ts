import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AngularFireAuth} from "@angular/fire/auth";
import * as firebase from "firebase";
import {from} from "rxjs/internal/observable/from";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user: Observable<firebase.User>;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.user = angularFireAuth.authState;

    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null);
  }

  /* Sign in */
  requestEmail(email: string): Observable<void> {
    let actionCodeSettings = {
      url: window.location.origin + window.location.pathname + "?sign-in",
      handleCodeInApp: true,
    };

    localStorage.setItem('email', email);

    return from(
        this.angularFireAuth
            .auth
            .sendSignInLinkToEmail(email, actionCodeSettings)
    );
  }

  SignIn(): Observable<firebase.auth.UserCredential> {
    return from(
        this.angularFireAuth
            .auth
            .signInWithEmailLink(localStorage.getItem('email'))
    );
  }

  /* Sign out */
  SignOut(): Observable<void> {
    return from(
        this.angularFireAuth
            .auth
            .signOut()
    );
  }
}
