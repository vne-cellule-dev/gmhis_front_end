import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DatePipe } from '@angular/common';
import { Journal } from 'src/app/_models/journal.model';

@Injectable({
  providedIn: 'root'
})
export class JournalDocumentService {

  constructor(
    private datePipe: DatePipe
  ) { }

  public getJournal(response : Journal[]){

    var doc = new jsPDF('p', 'mm', 'a4');
    doc.setDrawColor(0);
    doc.setFillColor(230, 230, 230);
    doc.rect(14, 10, 182, 10, "FD")
    
    doc.setFont("arial", "bold");
    doc.setFontSize(9)
    doc.text("Imprimé le   : " + this.datePipe.transform(new Date(), 'dd/MM/yyyy'), 160, 7)
    doc.setFontSize(16)
    doc.text("HISTORIQUE JOURNAL DE CAISSE", 50, 17);

    let tBody = [];

     for (let index = 0; index < response.length; index++) {
      const item = response[index];
      let article = [
        { content: this.datePipe.transform(new Date(item.date), 'dd/MM/yyyy'), styles: { valign: 'middle', halign: 'center' } },
        { content: item.libelle, styles: { valign: 'middle', halign: 'left' } },
        { content: item.amount, styles: { valign: 'middle', halign: 'left' } },
        { content: new Intl.NumberFormat('de-DE').format(item.previousBalance), styles: { valign: 'middle', halign: 'center' } },
        { content: new Intl.NumberFormat('de-DE').format(item.nextBalance), styles: { valign: 'middle', halign: 'center' } },
      ];
      tBody.push(article);
    } 

    doc['autoTable']({
      head: [[
        { content: 'DATE' },
        { content: 'LIBELLE' },
        { content: 'MONTANT'},
        { content: 'SOLDE PRECEDENT'},
        { content: 'SOLDE SUIVANT'}
      ]],
      body: tBody,
      theme: 'grid',
      headStyles: {fontSize:8, fillColor : [230, 230, 230], lineColor: [0, 0, 0], halign:'center' , textColor: [0, 0, 0], lineWidth: 0.25,  },
      bodyStyles: {textColor: [0, 0, 0], lineColor: [0, 0, 0], lineWidth: 0.25, fontStyle: "bold", fontSize:9},
      startY: 22,
      styles: {font: "arial", fontSize: 9},
      didDrawPage: function (data) {

        doc.setFontSize(8)
        var pageSize = doc.internal.pageSize
        var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()

        //doc  footer
        doc.text("- Page " + data.pageNumber + " -", data.settings.margin.left + 80, pageHeight - 3)
      }
    })
    return doc;
  }
}
