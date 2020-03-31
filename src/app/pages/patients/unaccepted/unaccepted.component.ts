import {Component, OnInit} from '@angular/core';
import {PatientsService} from "../../../core/patients.service";

@Component({
  selector: 'app-unaccepted',
  templateUrl: './unaccepted.component.html',
  styleUrls: ['./unaccepted.component.scss']
})
export class UnacceptedComponent implements OnInit {

  public $list;
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
    this.$list = this.patientService.unaccepted();
  }

}
