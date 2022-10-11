import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { Loyer } from 'src/app/_models/loyer';
import { NumberToLetter } from 'convertir-nombre-lettre';

@Injectable({
  providedIn: 'root'
})
export class ReleaseDocService {

  constructor(private datePipe : DatePipe) { }

  releaseDoc(loyer : Loyer){
    console.log(loyer);
    
    var doc = new jsPDF('p', 'mm', 'a4');
  
    doc.setFont("arial", "bold");
    doc.setFontSize(11)
    doc.text(`N°   :  ${loyer.numQuittance}` , 160, 16)

    doc.rect(12, 25, 53, 14)


    doc.rect(66, 25, 53, 14)

    doc.rect(120,25, 80, 14)

  doc.setDrawColor(0)
   doc.setFillColor(255, 255, 255)
   doc.rect(30, 20, 15, 10, 'F')
   doc.text("LOT" , 34, 26)
   doc.text( loyer.location.site.nomSite , 20, 34)



   doc.setDrawColor(0)
   doc.setFillColor(255, 255, 255)
   doc.rect(75, 20, 34, 10, 'F')
   doc.text("REF. LOCAL" , 80, 26)
   doc.text( loyer.location.refLocaux , 77, 34)


   doc.setDrawColor(0)
   doc.setFillColor(255, 255, 255)
   doc.rect(143, 20, 34, 10, 'F')
   doc.text("LOCATAIRE" , 147, 26)
   doc.text( loyer.location.locataire.nomLocataire , 140, 34)


   doc.setFontSize(12)
    doc.text("Loyer Mensuelle", 13, 46);
    doc.setFontSize(12)
    doc.text(new Intl.NumberFormat('de-DE').format(loyer.montant) + " F CFA", 68, 46);

    doc.setFontSize(12)
    doc.text("Montant verseé en Chiffre", 13, 53);
    doc.text(new Intl.NumberFormat('de-DE').format(loyer.montantVerse) + " F CFA", 68, 53);

    doc.text("Montant versé en Lettre", 13, 60);


    doc.setFont('italic')
    doc.text(`${NumberToLetter(loyer.montantVerse)} franc CFA`, 68, 60);

    doc.text("ledit loyer  commençant le ", 13, 66);
    doc.text(`le  ${this.datePipe.transform(loyer.debut, 'dd MMMM yyyy')} et finissant le ${this.datePipe.transform(loyer.fin, 'dd MMMM yyyy')}`, 68, 66);

    doc.text("sous toute réserve de droit DONT QUITTANCE.", 13, 75);
    doc.text("Abidjan le,  25/12/2021", 130, 75);

    doc.setFontSize(8)
    doc.setFont("arial", "normal");
    doc.text("NOTA : Un locataire ne peut déménager :", 13,80);
    doc.text("1°. Qu'il n'ait justifie au propriétaire par une quittance du Receveur", 13,83);
    doc.text("Qu'il a acquité toutes ses contributions personnelles et immobilières de", 13,86);
    doc.text("l'année courante.", 13,89);
    doc.text("2°. Qu'il n'ait donné ou reÁu congé par écrit dans les délais prescrits.", 13,92);
    doc.text("3°. Qu'il n'ait fait faire toutes les réparations locatives à sa charge", 13,95);
    doc.text("suivant l'usage ou d'après l'état des lieux s'il en existe un.", 13,98);

    doc.setFontSize(16)
    doc.text("QUTTANCE LOYER", 80, 17);

    doc.autoPrint();
    doc.output('dataurlnewwindow'); 
    
    return doc;
  }
}
