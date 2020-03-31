import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataConstantsService {
  private relative_types = [
    'father',
    'mother',
    'sister',
    'brother',
    'male_relative',
    'female_relative',
  ];

  private laboratory_symptoms = [
    'Ні',
    'Невідомо',
    'Лімфопенія',
    'Нейтропенія',
    'Тромбоцитопенія',
    'Анемія',
    'Монцитопенія',
    'Підвищений рівень IgE',
    'Гіпогамаглобулінемія'
  ];

  private associated_symptoms = [
    'Інфекції',
    'Дисрегуляція імунної відповіді',
    'Малінгізація (онконастороженність)',
    'Синдромальні маніфестації'
  ];

  private broken_genes = [
    'Історія генетичних досліджень невідома',
    'Генетичне дослідження не проводилось',
    'Генетичне дослідження проводилось,мутації не виявлено',
    'Генетичне дослідження проводилось,мутації виявлено'
  ];

  private genes_sequencing_method = [
    'Секвенування гена',
    'Екзом/геном секвенування',
    'Невідомо'
  ];

  private analyse_reason = [
      'Специфічні клінічні симптоми',
      'Сімейний скринінг',
      'Пренатальна діагностика',
      'Невідомо'
  ];

  constructor() {
  }

  public familyRelationTypes(): Observable<string[]> {
    return of(this.relative_types);
  }

  public laboratorySymptoms(): Observable<string[]> {
    return of(this.laboratory_symptoms);
  }

  public associatedSymptoms(): Observable<string[]> {
    return of(this.associated_symptoms);
  }

  public brokenGenes() {
    return of(this.broken_genes);
  }

  public genesSequencingMethod() {
    return of(this.genes_sequencing_method);
  }

  public analyseReason() {
    return of(this.analyse_reason);
  }
}
