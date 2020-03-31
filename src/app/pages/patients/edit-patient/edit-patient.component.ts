import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {Observable} from "rxjs";

import {RegionsService} from "../../../core/regions.service";
import {RegionModel} from "../../../models/region-model";
import {DataConstantsService} from "../../../core/data-constants.service";
import {COMMA, ENTER} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss']
})
export class EditPatientComponent implements OnInit {

  public tab: number = 2;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  public $regions: Observable<RegionModel[]>;
  public $relativeTypes: Observable<string[]>;
  public $laboratorySymptoms: Observable<string[]>;
  public $associatedSymptoms: Observable<string[]>;
  public $brokenGenes: Observable<string[]>;
  public $genesSequencingMethod: Observable<string[]>;
  public $genesAnalyseReason: Observable<string[]>;

  public formGroup = this.formBuilder.group({
    // General data
    firstname: [null, [Validators.required]],
    lastname: [null, [Validators.required]],
    surname: [null, [Validators.required]],
    sex: [null, [Validators.required]],
    data_analyse: [null, [Validators.required]],
    birthday_date: [null, [Validators.required]],
    birthday_city: [null, []],
    birthday_region: [null, [Validators.required]],
    living_region: [null, [Validators.required]],
    living_city: [null, []],
    family_relates: this.formBuilder.array([]),
    died: [null, []],
    // Symptoms
    diagnose_first_date: [null, []],
    diagnose_laboratory_symptom: [null, []],
    diagnose_first_associated_symptoms_known: [null, []],
    diagnose_first_associated_symptoms: this.formBuilder.array([]),
    diagnose_analyses: this.formBuilder.group({
      igg: [null, [Validators.required]],
      iga: [null, [Validators.required]],
      igm: [null, [Validators.required]],
      ige: [null, [Validators.required]],
    }),
    // Genes
    genes_broken: [null, [Validators.required]],
    genes_broken_comments: [null, []],
    genes_analyse_date: [null, [Validators.required]],
    genes_analyse_reason: [null, [Validators.required]],
    genes_analyse_laboratory: [null, [Validators.required]],
    genes_sequencing_method: [null, [Validators.required]],

  });

  constructor(private regionsService: RegionsService,
              private dataConstantsService: DataConstantsService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.$regions = this.regionsService.list();
    this.$relativeTypes = this.dataConstantsService.familyRelationTypes();
    this.$laboratorySymptoms = this.dataConstantsService.laboratorySymptoms();
    this.$associatedSymptoms = this.dataConstantsService.associatedSymptoms();
    this.$brokenGenes = this.dataConstantsService.brokenGenes();
    this.$genesSequencingMethod = this.dataConstantsService.genesSequencingMethod();
    this.$genesAnalyseReason = this.dataConstantsService.analyseReason();

    this.initForm();
  }

  private initForm() {
    this.addFamilyRelation();
    this.familyRelation.valueChanges.subscribe((values: { type: string, id: string }[]) => {
      if (values.filter(item => !item.id && !item.type).length === 0) {
        this.addFamilyRelation();
      }
    });

    this.addDiagnoseFirstAssociatedSymptoms();
    this.diagnoseFirstAssociatedSymptoms.valueChanges.subscribe((values: { name: string, date: string }[]) => {
      if (values.filter(item => !item.name && !item.date).length === 0) {
        this.addDiagnoseFirstAssociatedSymptoms();
      }
    });
  }

  /* FAMILY RELATIONS */
  get familyRelation() {
    return this.formGroup.get('family_relates') as FormArray;
  }

  addFamilyRelation() {
    this.familyRelation.push(this.formBuilder.group({
      type: [null, [Validators.required]],
      id: [null, []]
    }));
  }

  removeFamilyRelation(index) {
    if (this.familyRelation.length === 1) {
      this.addFamilyRelation();
    }
    this.familyRelation.removeAt(index)
  }

  /* DIAGNOSE FIRST ASSOCIATED SYMPTOMS */
  get diagnoseFirstAssociatedSymptoms() {
    return this.formGroup.get('diagnose_first_associated_symptoms') as FormArray;
  }

  removeDiagnoseFirstAssociatedSymptoms(index) {
    if (this.diagnoseFirstAssociatedSymptoms.length === 0) {
      this.addDiagnoseFirstAssociatedSymptoms();
    }

    this.diagnoseFirstAssociatedSymptoms.removeAt(index);
  }

  addDiagnoseFirstAssociatedSymptoms() {
    this.diagnoseFirstAssociatedSymptoms.push(this.formBuilder.group({
      name: [null, [Validators.required]],
      date: [null, [Validators.required]],
    }));
  }


  /* TABS control */
  nextTab() {
    if (this.tab < 5) {
      this.tab = this.tab + 1;
    }
  }

  previousTab() {
    if (this.tab > 0) {
      this.tab = this.tab - 1;
    }
  }

  /* Error helper */
  hasError(field, group = null) {
    let control = (group || this.formGroup).get(field);
    return control.touched && Object.keys(control.errors || {});
  }
}
