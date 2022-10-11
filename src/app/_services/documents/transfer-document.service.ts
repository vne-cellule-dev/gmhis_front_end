import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class TransferDocumentService {

  constructor(
    private datePipe: DatePipe
  ) { }

  public getTransfer(transfers : any[]){
    
    var doc = new jsPDF('p', 'mm', 'a4');
    doc.setDrawColor(0);
    doc.setFillColor(230, 230, 230);
    doc.rect(14, 10, 182, 10, "FD")
    
    doc.setFont("arial", "bold");
    doc.setFontSize(9)
    doc.text("Imprimé le   : " + this.datePipe.transform(new Date(), 'dd/MM/yyyy'), 160, 7)
    doc.setFontSize(16)
    doc.text("HISTORIQUE DES TRANSFERTS", 65, 17);

    let tBody = [];

    for (let index = 0; index < transfers.length; index++) {
      const item = transfers[index];
      let article = [
        { content: this.datePipe.transform(new Date(item[1]), 'dd/MM/yyyy'), styles: { valign: 'middle', halign: 'center' } },
        { content: item[2], styles: { valign: 'middle', halign: 'left' } },
        { content: item[3], styles: { valign: 'middle', halign: 'left' } },
        { content: item[4], styles: { valign: 'middle', halign: 'left' } },
        { content: new Intl.NumberFormat('de-DE').format(item[5]), styles: { valign: 'middle', halign: 'center' } },
        { content: item[6] == true ? "valider"  : "En attente", styles: { valign: 'middle', halign: 'center' } },

      ];
      tBody.push(article);
    } 

    doc['autoTable']({
      head: [[
        { content: 'DATE' },
        { content: 'N° TRANSFERT' },
        { content: 'DEPOT INITIAL'},
        { content: 'DEPOT FINAL'},
        { content: 'QUANTITE '},
        { content: 'Etat'},
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
