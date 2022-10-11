import { Commune } from "./commune.model";
import { Local } from "./local.model";
import { Site } from "./site.model";

export interface Locataire {
        id: 0,
        activiteLocataire: string, 
        civiliteLocataire: string, 
        contact1: string, 
        contact2: string, 
        emailLocataire: string,  
        infoLocataire: string,  
        montantCaution: number,  
        montantLoyer: number,  
        montantpdpLocataire: number,  
        nomLocataire : string,
        prenomLocataire : string,
        nomPrenomLocataire : string,
        numeroPieceLocataire: string, 
        periodePaiementLoyer: number,  
        pieceIdentiteUrl: string,  
        refLocaux: string,  
        caution : boolean  
}