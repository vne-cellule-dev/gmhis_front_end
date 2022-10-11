import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { NumberToLetter } from 'convertir-nombre-lettre';
import { DatePipe } from '@angular/common';
import { Location } from 'src/app/_models/location';


@Injectable({
  providedIn: 'root'
})
export class PasDePorteService {

  constructor(private datePipe : DatePipe) { }

  printPasDePorte(location : Location){
    console.log(location);
    
    var doc = new jsPDF('p', 'mm', 'a4');

    doc.setFontSize(16)
    doc.line(145,20,73,20)
    doc.text("REÇU DE PAS DE PORTE", 75, 17);

    doc.setFontSize(12)
    var splitTitle = doc.splitTextToSize(`Je soussigné Mr M. ABDUL-REDA ABDALLAH , reconnais avoir reçu de Mr ${location.locataire.nomLocataire} la somme de ${location.montantpdpLocataire} F CFA ( ${NumberToLetter(location.montantpdpLocataire)} Francs CFA ) représentant un pas de porte concernant le local de 2 portes sis à ${location.site.nomSite}  .En effet, Mr ${location.locataire.nomLocataire} m'ayant contacté pour la location dudit local, a été averti d'un pas-de-porte pour entrer en sa possession, ledit pas-de-porte ne représentant aucunement ni une caution, ni une avance et qu'il n'est pas aucunement remboursable (lors d'une éventuelle expulsion du local ou même lorsque le preneur désire quitter le local). Mais il est à préciser que le Preneur peut céder son pas-de-porte à une tierce personne au prix qu'il le souhaite, quitte au nouvel arrivant de respecter les engagements qu'il a envers le Bailleur.`, 160);

    doc.text(splitTitle, 20, 50)


    doc.text('En foi de quoi, je lui délivre ce reçu pour servir et valoir ce que de droit.',40, 120)

    const date = new Date();
    doc.text(`Fait à Abidjan le , ${this.datePipe.transform(new Date(), 'dd/MM/yyyy')}, `,108, 130)


  
  
    return doc;
    
  }
}
