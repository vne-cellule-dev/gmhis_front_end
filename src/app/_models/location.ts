import { Local } from "./local.model";
import { Locataire } from "./locataire.model";
import { Loyer } from "./loyer";
import { Site } from "./site.model";

export type LoyerMonths = {
    monthName: string;
    monthNumber: number;
  };

  type loyer = {
      annee : number,
      etatPaiement : boolean,
      loyer : Loyer,
      mois : number;
  }

export interface Location {
    id : number,
    debutContratLocataire: Date,
    finContratLocataire: Date,
    locataire: Locataire,
    locaux: Local,
    site : Site,
    montantCaution: number,
    montantLoyer: number,
    montantpdpLocataire: number,
    periodePaiementLoyer: number,
    montantAvance : number,
    avanceLoyer : boolean,
    loyerMonths : LoyerMonths[];
    loyers : loyer[],
    refLocaux : string,

}
