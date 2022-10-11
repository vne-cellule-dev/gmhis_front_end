import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DatePipe } from '@angular/common';
import { Invoice } from 'src/app/_models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceListDocumentService {

  constructor(
    private datePipe: DatePipe
  ) { }

  public getInvoiceList(invoices : Invoice[]){
    var doc = new jsPDF('l', 'mm', 'a4');
    doc.setDrawColor(0);
    doc.setFillColor(230, 230, 230);
    doc.rect(14, 10, 270, 10, "FD")
    
    doc.setFont("arial", "bold");
    doc.setFontSize(9)
    doc.text("Imprimé le   : " + this.datePipe.transform(new Date(), 'dd/MM/yyyy'), 250, 7)
    doc.setFontSize(16)
    doc.text("HISTORIQUE DES FACTURES ", 100, 17);

    let tBody = [];

    for (let index = 0; index < invoices.length; index++) {
      const item = invoices[index];
      let article = [
        { content: this.datePipe.transform(new Date(item.date), 'dd/MM/yyyy'), styles: { valign: 'middle', halign: 'center' } },
        { content: item.invoiceNumber, styles: { valign: 'middle', halign: 'center' } },
        { content: item.customer.tradeName, styles: { valign: 'middle' } },
        { content: this.datePipe.transform(new Date(item["deadline"]), 'dd/MM/yyyy') , styles: { valign: 'middle', halign: 'center' } },
        { content:  new Intl.NumberFormat('de-DE').format(item.tvaValue), styles: { valign: 'middle', halign: 'center' } },
        { content:  new Intl.NumberFormat('de-DE').format(item.airsiValue), styles: { valign: 'middle', halign: 'center' } },
        { content: `${item.discount}%`, styles: { valign: 'middle', halign: 'center' } },
        { content:  new Intl.NumberFormat('de-DE').format(item.specialDiscount), styles: { valign: 'middle', halign: 'center' } },
        { content:  new Intl.NumberFormat('de-DE').format(item.totalHt), styles: { valign: 'middle', halign: 'center' } },
        { content:  new Intl.NumberFormat('de-DE').format(item.totalTtc), styles: { valign: 'middle', halign: 'center' } },
      ];
      tBody.push(article);
    }

    doc['autoTable']({
      head: [[
        { content: 'DATE' },
        { content: 'N° FACTURE' },
        { content: 'CLIENT'},
        { content: 'ECHEANCE'},
        { content: 'VAL TVA'},
        { content: 'VAL AIRSI'},
        { content: 'REMISE'},
        { content: 'REMISE SPECIALE'},
        { content: 'TOTAL HT'},
        { content: 'TOTAL TTC'},
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
