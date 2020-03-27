import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {map} from "rxjs/operators";

import {AuthenticationService} from "../../core/authentication.service";
import {UserModel} from "../../models/user-model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public user: UserModel | any;

  constructor(private auth: AuthenticationService,
              private afs: AngularFirestore) {
  }

  ngOnInit(): void {
    this.auth.profile().subscribe(user => this.user = user);
    this.afs.collection<any>('diagnoses').snapshotChanges()
        .pipe(
            map(item => item.map(r => ({id: r.payload.doc.id, ...r.payload.doc.data()})))
        )
        .subscribe(res => console.log(res));
  }
}

