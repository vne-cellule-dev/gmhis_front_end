import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { NumberToLetter } from 'convertir-nombre-lettre';
import { Location } from 'src/app/_models/location';


@Injectable({
  providedIn: 'root'
})
export class CautionService {

  constructor(private datePipe : DatePipe) { }

  printCaution (location : Location) {
    console.log(location);
    
    var doc = new jsPDF('p', 'mm', 'a4');

   

    doc.setFontSize(16)
    doc.line(128,20,75,20)
    doc.text("REÇU DE CAUTION", 75, 17);

    doc.setFont("arial", "normal");

    doc.setFontSize(13)
    doc.text('Je soussigné Mr M. ABDUL-REDA ABDALLAH ,', 55, 45)
    var splitTitle = doc.splitTextToSize(`reconnais avoir reçu de Mr ${location.locataire.nomLocataire} la somme de ${location.montantCaution} F CFA  (${NumberToLetter(location.montantCaution)} F CFA ) représentant la caution concernant le local de 2 portes sis à ${location.site.nomSite} . En foi de quoi, je lui délivre ce reçu pour servir et valoir ce que de droit.`, 170);
    doc.text(splitTitle, 20, 50)


    const date = new Date();
    doc.text(`Fait à Abidjan le , ${this.datePipe.transform(new Date(), 'dd/MM/yyyy')}, `,120, 85)


  
    return doc;
    
  }
}
