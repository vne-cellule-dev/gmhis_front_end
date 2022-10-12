import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { Location } from 'src/app/_models/location';
import { NumberToLetter } from 'convertir-nombre-lettre';


@Injectable({
  providedIn: 'root'
})
export class BailService {

  
  constructor(private datePipe : DatePipe) { }

  printBail(location : Location){
    console.log(location);
    
    var doc = new jsPDF('p', 'mm', 'a4');

   

    doc.setFontSize(16)
    doc.line(128,20,75,20)
    doc.text("CONTRAT DE BAIL", 75, 17);



    doc.setFontSize(11)
    doc.text('M. ABDUL-REDA ABDALLAH ', 110, 40)
    doc.text('CEL : 07.61.00.00 ', 110, 46)
    doc.text(`MR. ${location.locataire.nomLocataire}`, 110, 52)

    var splitTitle = doc.splitTextToSize(`L'EMLACEMENT LOUE CONSISTE EN UN LOCAL DE 1 PORTE SIS À ${location.site.nomSite} `, 170);
    doc.text(splitTitle, 20, 70)

    var splitTitle = doc.splitTextToSize(`Le loyer est calculé sur la parité qu' 1 euro = 655.957 francs CFA. Toute modification de cette parité entraine de facto une modification du loyer.`, 170);
    doc.text(splitTitle, 20, 200)


    doc.text('M. ABDUL-REDA ABDALLAH ', 20, 230)

    doc.text(`MR. ${location.locataire.nomLocataire}`, 130, 230)

    doc.text(``, 20, 80)
  


    // const date = new Date();
    // doc.text(`Fait à Abidjan le , ${this.datePipe.transform(new Date(), 'dd/MM/yyyy')}, `,120, 85)



   
  
    return doc;
  }
}


