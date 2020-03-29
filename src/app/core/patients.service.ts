import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import * as moment from "moment";

import {PatientModel} from "../models/patient-model";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(private firestore: AngularFirestore,
              private auth: AuthenticationService) {
  }

  accepted(): Observable<PatientModel[]> {
    return this.firestore
        .collection<PatientModel>('patients', ref => {
          return ref
              .where("confirmed", "==", true)
              .where("doctor", "in", ["", this.auth.user.getValue().uid]);
        })
        .snapshotChanges()
        .pipe(
            map(item => item.map(r => ({id: r.payload.doc.id, ...r.payload.doc.data()}))),
            map(this.mapPatients())
        );
  }

  unaccepted(): Observable<PatientModel[]> {
    return this.firestore
        .collection<PatientModel>('patients', ref => {
          return ref
              .where("confirmed", "==", false)
              .where("doctor", "in", ["", this.auth.user.getValue().uid]);
        })
        .snapshotChanges()
        .pipe(
            map(item => item.map(r => ({id: r.payload.doc.id, ...r.payload.doc.data()}))),
            map(this.mapPatients())
        );
  }

  mapPatients() {
    return function (list: PatientModel[]): PatientModel[] {
      return list.map(patient => ({
        ...patient,
        age: PatientsService.getAge(patient),
        last_replacement_therapy: (patient.replacement_therapy || [])
            .sort((a, b) => b.created_at - a.created_at)[0] || null
      }))
    };
  }

  static getAge(patient: PatientModel) {
    if (!patient.birthday_date) {
      return null;
    }

    if (!patient.died) {
      return Math.abs(moment(patient.birthday_date).diff(moment(), 'years'));
    }

    return Math.abs(moment(patient.died).diff(moment(patient.birthday_date), 'years'));
  }
}
