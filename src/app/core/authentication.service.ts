import {Injectable, NgZone} from '@angular/core';
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore} from "@angular/fire/firestore";
import {BehaviorSubject, Observable} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {from} from "rxjs/internal/observable/from";
import * as firebase from "firebase";

import {UserModel} from "../models/user-model";
import {RegionsService} from "./regions.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user: BehaviorSubject<firebase.User> = new BehaviorSubject<firebase.User>(null);

  constructor(private angularFireAuth: AngularFireAuth,
              private firestore: AngularFirestore,
              private regions: RegionsService,
              private ngZone: NgZone,
              private router: Router) {
    this.angularFireAuth.authState.subscribe(user => {
      this.user.next(user);
      AuthenticationService.updateStorage(user);
      if (user) {
        this.navigateHome();
      }
    })
  }

  public get firebaseUserStatus(): Observable<boolean> {
    return this.angularFireAuth.authState.pipe(
        map(user => !!user)
    );
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

  profile(): Observable<UserModel> {
    let regions = [];
    return this.regions
        .list()
        .pipe(
            switchMap(rs => {
              regions = rs;
              return this.angularFireAuth.user
            }),
            switchMap(user => this.firestore
                .doc<any>(`users/${user.uid}`)
                .snapshotChanges()
            ),
            map(actions => {
              let user = actions.payload.data();
              return {
                ...user,
                expert: user.expert.map(r => regions.find(i => +i.id == r))
              };
            })
        );
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
