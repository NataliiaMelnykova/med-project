import {Injectable, NgZone} from '@angular/core';
import {Observable} from "rxjs";
import {AngularFireAuth} from "@angular/fire/auth";
import * as firebase from "firebase";
import {from} from "rxjs/internal/observable/from";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user: Observable<firebase.User>;

  constructor(private angularFireAuth: AngularFireAuth,
              private ngZone: NgZone,
              private router: Router) {
    this.user = angularFireAuth.authState;
    this.angularFireAuth.authState.subscribe(user => {
      AuthenticationService.updateStorage(user);
    })
  }

  static get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null);
  }

  static updateStorage(user) {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
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
            .sendSignInLinkToEmail(email, actionCodeSettings))
        .pipe(map(e => {
          AuthenticationService.updateStorage(null);
          return e;
        }));
  }

  SignIn(): Observable<firebase.auth.UserCredential> {
    return from(
        this.angularFireAuth
            .auth
            .signInWithEmailLink(localStorage.getItem('email'))
    )
        .pipe(map(e => {
          AuthenticationService.updateStorage(e.user);
          this.navigateHome();
          return e;
        }));
  }

  /* Sign out */
  SignOut(): Observable<void> {
    return from(
        this.angularFireAuth
            .auth
            .signOut()
    )
        .pipe(map(e => {
          AuthenticationService.updateStorage(null);
          this.navigateHome();
          return e;
        }));
  }

  navigateHome() {
    this.ngZone.run(() => {
      this.router
          .navigate([AuthenticationService.isLoggedIn ? '/home' : '/login'])
          .then();
    });
  }
}
