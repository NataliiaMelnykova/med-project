export interface PatientModel {
  id?: string;
  firstname: string;
  lastname: string;
  surname: string;
  sex: "male" | "female";
  data_analyse: "science" | "full";
  birthday_date: string;
  birthday_city: string;
  birthday_region: string;
  living_region: string;
  living_city: string;
  family_relates: { [key: string]: string };

  age?: number;
  died: string;
  confirmed: boolean;

  diagnose_first_date: string;
  diagnose_laboratory_symptom: string;
  diagnose_first_associated_symptoms_known: boolean;
  diagnose_first_associated_symptoms: Array<{
    name: string,
    date: string
  }>;

  diagnose_analyses: {
    igg: number;
    iga: number;
    igm: number;
    ige: number;
  };

  diagnose: string;
  genes_broken: string;
  genes_analyse_date: string | null;
  genes_broken_comments: string;
  genes_sequencing_method: string;
  genes_analyse_reason: string | null;
  genes_analyse_laboratory: string;

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
