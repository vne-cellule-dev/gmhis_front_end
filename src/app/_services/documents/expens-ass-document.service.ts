import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { AppParam } from 'src/app/_models/app-param.model';
import { SavExpense } from 'src/app/_models/savExpense.model';
import { capitalize } from 'src/app/_utilities/string/capitalize';

@Injectable({
  providedIn: 'root'
})
export class ExpensAssDocumentService {

  constructor(
    private datePipe: DatePipe,
    ) { }
  public getExpenseAssDoc(invoiceSaa : SavExpense[], appParam: AppParam
    ){    
    var doc = new jsPDF('p', 'mm', 'a4');
    doc.setDrawColor(0);
    doc.setFillColor(230, 230, 230);
    doc.rect(14, 10, 182, 10, "FD")
    
    doc.setFont("arial", "bold");
    doc.setFontSize(9)
    doc.text("Imprimé le   : " + this.datePipe.transform(new Date(), 'dd/MM/yyyy'), 160, 7)
    doc.setFontSize(16)
    doc.text("LISTE DES DÉPENSES S.A.V", 57, 17);

    let tBody = [];
    let totalInvoice : number = 0;
    for (let index = 0; index < invoiceSaa.length; index++) {
      const item = invoiceSaa[index];
      totalInvoice = totalInvoice + item["totalInvoice"];
      console.log(item);
      let article = [
        { content: this.datePipe.transform(new Date(item.date), 'dd/MM/yyyy'), styles: { valign: 'middle', halign: 'center' } },
        { content: item.libelle, styles: { valign: 'middle' } },
        { content: new Intl.NumberFormat('de-DE').format(item["amount"]), styles: { valign: 'middle', halign: 'center' } },
        { content: item.paymentType, styles: { valign: 'middle' } },
      ];
      tBody.push(article);
    }
    // tBody.push([{ content: "Total", colSpan: 3, styles: { halign: 'right', lineWidth: 0 } }, { content: new Intl.NumberFormat('de-DE').format(Number(totalInvoice.toFixed())) + " " + capitalize(appParam.currency), styles: { minCellWidth: 25,valign: 'middle', halign: 'right' } }]);

    doc['autoTable']({
      head: [[
        { content: 'DATE' },
        { content: 'LIBELLE' },
        { content: 'MONTANT' },
        { content: '	TYPE DE PAIEMENT' },
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
