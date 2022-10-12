import { Location } from "./location";

export interface Loyer {
    id:number,
    annee: number,
    location: Location,
    montant: number,
    montantLoyer : number,
    montantVerse : number,
    numMois: number,
    debut : Date,
    fin : Date,
    numQuittance : string,
}
