import {Component, OnInit} from '@angular/core';
import {PatientsService} from "../../../core/patients.service";
import {Observable} from "rxjs";
import {PatientModel} from "../../../models/patient-model";

@Component({
  selector: 'app-accepted',
  templateUrl: './accepted.component.html',
  styleUrls: ['./accepted.component.scss']
})
export class AcceptedComponent implements OnInit {

  public $list: Observable<PatientModel[]>;

  public displayedColumns: string[] = [
    'id',
    'age',
    'diagnose',
    'diagnose_first_date',
    'last_replacement_therapy_end_date',
    'last_replacement_therapy_injection_type',
    'last_replacement_therapy_dose',
    'last_replacement_therapy_producer',
    'actions'
  ];

  constructor(private patientService: PatientsService) {
  }

  ngOnInit(): void {
    this.$list = this.patientService.accepted();
  }

}
