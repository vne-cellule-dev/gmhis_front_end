import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { AppParam } from 'src/app/_models/app-param.model';

@Injectable({
  providedIn: 'root'
})
export class PageFooterService {

  constructor(private datePipe: DatePipe) { }

  get(doc: jsPDF, appParam: AppParam, finalY: number, numberOfPackages: Number, driver: string, vehicle: string, comment: string) {

    doc.setDrawColor(0);
    var pageSize = doc.internal.pageSize
    var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
    if (finalY >= 225) {
      doc.addPage();
      finalY = 10;
      doc.text("- Page " + (doc.internal.pages.length - 1) + " -", 10 + 80, pageHeight - 5)
    }
    var x = 10;
    doc.setFont("arial", "bold");
    doc.setFontSize(9);
    doc.text("TOTAL COLIS : " , x + 125, finalY + 5);
    doc.text(new Intl.NumberFormat('de-DE').format(Number(numberOfPackages)), x + 177, finalY + 5);
    doc.rect(15, finalY + 8, 55, 25);
    doc.text("RESPONSABLE DEPOT", x + 13, finalY + 13);
    doc.rect(15, finalY + 8, 55, 7);
    doc.line(x + 125, finalY + 6, x + 148, finalY + 6);
    doc.rect(72, finalY + 8, 55, 25);
  
    
    doc.text("CHAUFFEUR", x + 80, finalY + 13);
    doc.rect(72, finalY + 8, 55, 7);
    doc.setFontSize(8);
    if(driver) doc.text(driver, x + 65, finalY + 20);
    doc.setFontSize(9);
    doc.rect(130, finalY + 8, 65, 25);
    doc.text("CACHET/SIGNATURE & OBS. DU CLIENT", x + 121, finalY + 13);
    doc.rect(130, finalY + 8, 65, 7);
    doc.rect(130, finalY + 35, 65, 25);
    doc.text("OBSERVATION DU RESPO. DEPOT", x + 126, finalY + 40);
    doc.rect(130, finalY + 35, 65, 7);
    doc.text(comment, x + 120, finalY + 50);

    var delivInfoY = pageHeight - 30;
    doc.setFont("arial", "bold");

    doc.text("Matricule Vehicule de livraison  ", x, delivInfoY);
    doc.text(" :  " + vehicle, x + 50, delivInfoY );
    doc.text("Heure de Départ Dépôt ", x, delivInfoY + 7);
    doc.text(" : ..............................................................  ", x + 50, delivInfoY + 7);
    doc.text("Heure d'Arrivée Client ", x, delivInfoY + 14);
    doc.text(" : ..............................................................  ", x + 50, delivInfoY + 14);
    doc.text("Heure de Départ Client ", x, delivInfoY + 21);
    doc.text(" : ..............................................................  ", x + 50, delivInfoY + 21);
    doc.text(this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss'), x + 130, delivInfoY + 25);
    return doc;
  }
}
