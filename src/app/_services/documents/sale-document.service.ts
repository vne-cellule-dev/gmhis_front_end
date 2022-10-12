import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DatePipe } from '@angular/common';
import { ArticleSold } from 'src/app/_models/articleSold.model';


@Injectable({
  providedIn: 'root'
})
export class SaleDocumentService {

  constructor(
    private datePipe: DatePipe

  ) { }

  public getSale(sales : ArticleSold[]){
    var doc = new jsPDF('l', 'mm', 'a4');
    doc.setDrawColor(0);
    doc.setFillColor(230, 230, 230);
    doc.rect(14, 10, 270, 10, "FD")
    
    doc.setFont("arial", "bold");
    doc.setFontSize(9)
    doc.text("Imprimé le   : " + this.datePipe.transform(new Date(), 'dd/MM/yyyy'), 250, 7)
    doc.setFontSize(16)
    doc.text("HISTORIQUE DES VENTES", 110, 17);

    let tBody = [];

    for (let index = 0; index < sales.length; index++) {
      const item = sales[index];
      let article = [
        { content: this.datePipe.transform(new Date(item.saleDelivery.date), 'dd/MM/yyyy'), styles: { valign: 'middle', halign: 'center' } },
        { content: item.saleDelivery.deliveryNoteNumber, styles: { valign: 'middle', halign: 'center' } },
        { content: item.article.reference, styles: { valign: 'middle', halign: 'left' } },
        { content: item.saleDelivery["customer"]["tradeName"], styles: { valign: 'middle'} },
        { content:  new Intl.NumberFormat('de-DE').format(item.qty), styles: { valign: 'middle', halign: 'center' } },
        { content: new Intl.NumberFormat('de-DE').format(item.unitPrice), styles: { valign: 'middle', halign: 'center' } },
        { content: new Intl.NumberFormat('de-DE').format(item.totalHt), styles: { valign: 'middle', halign: 'center' } },
        { content: item.saleDelivery.depot["name"], styles: { valign: 'middle'} },

      ];
      tBody.push(article);
    }

    doc['autoTable']({
      head: [[
        { content: 'DATE' },
        { content: 'N° BL' },
        { content: 'REFERENCE'},
        { content: 'CLIENT'},
        { content: 'QTE'},
        { content: 'PRIX UNITAIRE'},
        { content: 'TOTAL'},
        { content: 'DEPOT'},
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
