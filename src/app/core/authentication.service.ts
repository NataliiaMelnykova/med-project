import {Injectable, NgZone} from '@angular/core';
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore} from "@angular/fire/firestore";
import {BehaviorSubject, Observable} from "rxjs";
import {filter, map, switchMap, take, tap} from "rxjs/operators";
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
    })
  }

  public get firebaseUserStatus(): Observable<boolean> {
    return this.angularFireAuth.authState.pipe(
        map(user => !!user)
    );
  }

  profile(): Observable<UserModel> {
    let regions = [];
    return this.regions.list()
        .pipe(
            switchMap(rs => {
              regions = rs;
              return this.angularFireAuth.user
            }),
            filter(user => !!user),
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
    this.user
        .pipe(
            filter(user => !!user),
            take(1)
        )
        .subscribe(() => {
          this.navigateHome();
        });

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
    )
        .pipe(
            tap((user) => {
              this.user.next(user.user);
              this.navigateHome();
            })
        );
  }

  /* Sign out */
  SignOut(): Observable<void> {
    return from(
        this.angularFireAuth
            .auth
            .signOut()
    )
        .pipe(
            tap(() => {
              this.user.next(null);
              this.navigateHome();
            })
        );
  }

  navigateHome() {
    this.ngZone.run(() => {
      this.router
          .navigate([this.user.getValue() ? '/home' : '/login'])
          .then();
    });
  }
}
