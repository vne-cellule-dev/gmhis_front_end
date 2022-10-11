import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DatePipe } from '@angular/common';
import { StockMovment } from 'src/app/_models/stockMovement.model';


@Injectable({
  providedIn: 'root'
})
export class StockMovementDocumentService {

  constructor(
    private datePipe: DatePipe
  ) { }

  public getStockMovement(sockMovments : StockMovment[]){
    var doc = new jsPDF('l', 'mm', 'a4');
    doc.setDrawColor(0);
    doc.setFillColor(230, 230, 230);
    doc.rect(14, 10, 269, 10, "FD")
    
    doc.setFont("arial", "bold");
    doc.setFontSize(9)
    doc.text("Imprimé le   : " + this.datePipe.transform(new Date(), 'dd/MM/yyyy'), 160, 7)
    doc.setFontSize(16)
    doc.text("HISTORIQUE DES MOUVEMENTS DE STOCK", 90, 17);

    let tBody = [];

    for (let index = 0; index < sockMovments.length; index++) {
      const item = sockMovments[index];
      let article = [
        { content: item.libelle, styles: { valign: 'middle', halign: 'left' } },
        { content: this.datePipe.transform(new Date(item.dateMovement), 'dd/MM/yyyy'), styles: { valign: 'middle', halign: 'center' } },
        { content: item.article.reference, styles: { valign: 'middle', halign: 'center' } },
        { content: item.article.name, styles: { valign: 'middle', halign: 'center' } },
        { content: new Intl.NumberFormat('de-DE').format(item.previousStock), styles: { valign: 'middle', halign: 'center' } },
        { content: new Intl.NumberFormat('de-DE').format(Number(item.qtyMovement)), styles: { valign: 'middle', halign: 'center' } },
        { content: new Intl.NumberFormat('de-DE').format(item.nextStock), styles: { valign: 'middle', halign: 'center' } },
        { content: item.depot.name, styles: { valign: 'middle', halign: 'center' } },
        { content: `${item.user.firstName} ${item.user.lastName}`, styles: { valign: 'middle', halign: 'center' } },
      ];
      tBody.push(article);
    }

    doc['autoTable']({
      head: [[
        { content: 'MOUVEMENT' },
        { content: 'DATE' },
        { content: 'REFERENCE'},
        { content: 'DESIGNATION'},
        { content: 'STOCK PREC'},
        { content: 'QTE MVT'},
        { content: 'STOCK SVT'},
        { content: 'DEPOT'},
        { content: 'UTILISATEUR'},
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
