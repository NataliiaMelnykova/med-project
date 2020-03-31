import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {map} from "rxjs/operators";
import {BehaviorSubject, Observable} from "rxjs";
import {RegionModel} from "../models/region-model";

@Injectable({
  providedIn: 'root'
})
export class RegionsService {

  $subject: BehaviorSubject<RegionModel[]> = new BehaviorSubject([]);

  constructor(private firestore: AngularFirestore) {
    this.firestore
        .collection<{ name: string }>('regions')
        .snapshotChanges()
        .pipe(map(item => item.map(r => ({id: r.payload.doc.id, ...r.payload.doc.data()}))))
        .subscribe(regions => this.$subject.next(regions));
  }

  list(): Observable<RegionModel[]> {
    return this.$subject;
  }
}
