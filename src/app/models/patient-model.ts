export interface PatientModel {
  id?: string;
  esid: string;
  firstname: string;
  lastname: string;
  surname: string;
  sex: "male" | "female";
  privacy: "full" | "public" | "none";
  birthday_date: string;
  birthday_city: string;
  birthday_region: string;
  complicated_family_history: "yes" | "no" | "undefined";

  age?: number;
  died: string;
  confirmed: boolean;

  diagnose_first_date: string;
  diagnose_laboratory_symptom: string;
  diagnose_first_associated_symptoms_exists: boolean;
  diagnose_first_associated_symptoms: string[];
  diagnose: string;
  diagnose_analyses: {
    igg: number;
    iga: number;
    igm: number;
    ige: number;
  };

  genes_broken: string;
  genes_analise_date: string | null;
  genes_analise_reason: string | null;
  genes_analise_laboratory: string;
  genes_sequencing_method: string;

  genes_therapy: GeneTherapy[];
  replacement_therapy: ReplacementTherapy[];
  last_replacement_therapy?: ReplacementTherapy;
}

interface GeneTherapy {
  transplantation_date: string | null;
  stem_cell_source: string;
  gene_therapy_date: string | null;
}

interface ReplacementTherapy {
  created_at: number;
  end_date: string | null;
  producer: string;
  injection_type: "intravenously" | "subcutaneously" | "intramuscular";
  location: string;
  dose: number;
  level_before_injection: number
  interval: string;
  weight: null;
  side_effects: string;
}
