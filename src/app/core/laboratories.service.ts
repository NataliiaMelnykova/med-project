import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LaboratoriesService {

  $subject: BehaviorSubject<{id: string, name: string}[]> = new BehaviorSubject([]);

  constructor(private firestore: AngularFirestore) {
    this.firestore
        .collection<{ name: string }>('laboratories')
        .snapshotChanges()
        .pipe(map(item => item.map(r => ({id: r.payload.doc.id, ...r.payload.doc.data()}))))
        .subscribe(regions => this.$subject.next(regions));
  }

  list(): Observable<{id: string, name: string}[]> {
    return this.$subject;
  }
}
