import { CurrencyPipe, DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class StockStateService {

  constructor(
    private datePipe: DatePipe,
  ) { }

  getDoc(data: any) {
    var doc = new jsPDF('p', 'mm', 'a4');
    doc.rect(14, 20, 181, 12);
    doc.setFontSize(10);
    doc.text(this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss'), 150, 25);
    doc.setDrawColor(0, 0, 0);
    doc.setFillColor(230, 230, 230);
    doc.rect(60, 22, 80, 8, "FD");
    doc.setFontSize(15);
    doc.setFont("arial", "bold");
    doc.text("ETAT DU STOCK", 85, 28);

    let tBody = [];
    let totalQty = 0;
    for (let index = 0; index < data["articles"].length; index++) {

      const element = data["articles"][index];

      let article = [
        { content: element[1], styles: { valign: 'middle'} },//reference
        { content: element[2], styles: { valign: 'middle' } },//designation
        { content: new Intl.NumberFormat('de-DE').format(element[4]), styles: { valign: 'middle', halign: 'center' } }, //qte
      ];
       tBody.push(article);
   totalQty += element[4];
    }
    tBody.push([{ content: "Nombre d'articles en stock:", colSpan: 2, styles: { fontStyle:'bold'} }, { content: totalQty, styles: { fontStyle:'bold', halign: 'center' }}] );
    // tBody.push([{ content: "Nombre d'articles :", colSpan: 2, styles: { fontStyle:'bold'} }, { content:data["numberOfArticle"], styles: { fontStyle:'bold', halign: 'center' }}] );
    // tBody.push([{ content: "Valeur du stock achat :", colSpan: 3, styles: { fontStyle:'bold' } }, { content: data["stockSaleValue"].toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')+ " FCFA", styles: { fontStyle:'bold' }}]);
    // tBody.push([{ content: "Nombre du stock vente :", colSpan: 3, styles: { fontStyle:'bold' } }, { content:data["stockPurchaseValue"].toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')+ " FCFA", styles: { fontStyle:'bold' }}]);


    doc['autoTable']({
      head: [[
        { content: 'Reference'},
        { content: 'Designation'},
        { content: 'qté en stock'},
      ]],
      body: tBody,
      theme: 'grid',
      headStyles: { fontSize: 8, fillColor: [230, 230, 230], lineColor: [0, 0, 0], halign: 'center', textColor: [0, 0, 0], lineWidth: 0.25 },
      bodyStyles: {textColor: [0, 0, 0],  lineColor: [0, 0, 0], lineWidth: 0.25, fontStyle: "bold", fontSize: 9 },
      startY: 35,
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
