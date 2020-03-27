import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {RegionModel} from "../models/region-model";

@Injectable({
  providedIn: 'root'
})
export class RegionsService {

  constructor(private firestore: AngularFirestore) {

  }

  list(): Observable<RegionModel[]> {
    return this.firestore
        .collection<{ name: string }>('regions')
        .snapshotChanges()
        .pipe(
            map(item => item.map(r => ({id: r.payload.doc.id, ...r.payload.doc.data()})))
        );
  }
}
