import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { Customer } from 'src/app/_models/customer.model';
import 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class CustomerListDocumentService {

  constructor(
    private datePipe: DatePipe,
  ) { }

  getList(customers: Customer[]) {
    
    var doc = new jsPDF('p', 'mm', 'a4');

    doc.setDrawColor(0);
    doc.setFillColor(230, 230, 230);
    doc.rect(14, 10, 182, 10, "FD")
    
    doc.setFont("arial", "bold");
    doc.setFontSize(9)
    doc.text("Imprimé le   : " + this.datePipe.transform(new Date(), 'dd/MM/yyyy'), 150, 15)
    doc.setFontSize(16)
    doc.text("LISTE DES CLIENTS", 74, 18);

    let tBody = [];
    
    let total = 0;
    for (let index = 0; index < customers.length; index++) {

      const customer = customers[index];

      let row = [
        { content: customer.tradeName},
        { content: new Intl.NumberFormat('de-DE').format(customer.customerAccount.balance), styles: { valign: 'middle', halign: 'center' } },
         { content: new Intl.NumberFormat('de-DE').format(customer.customerAccount.ceilingBalance), styles: { valign: 'middle', halign: 'center' } },
      ];

      tBody.push(row);
      total += customer.customerAccount.balance;
    }

    doc['autoTable']({
      head: [[
        { content: 'NOM' },
        { content: 'SOLDE' },
        { content: 'PLAFOND'},
        { content: 'REMARQUE'},
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

    let finalY = (doc as any).lastAutoTable.finalY;
    doc.setFontSize(10)
    doc.text("Nombre de clients :", 14, finalY + 5);
    doc.setDrawColor(0);
    doc.setFillColor(230, 230, 230);
    doc.rect(45, finalY + 1, 20, 6, "FD")
    doc.text(customers.length.toString(), 47, finalY + 5);
    doc.text("Total des soldes :", 80, finalY + 5);
    
    doc.setDrawColor(0);
    doc.setFillColor(230, 230, 230);
    doc.rect(110, finalY + 1, 60, 6, "FD")
    doc.text(new Intl.NumberFormat('de-DE').format(total)+ "FCFA", 112, finalY + 5);
    return doc;
  }

  getListByFamily(data: any) {
    var doc = new jsPDF('p', 'mm', 'a4');    
    doc.setDrawColor(0);
    doc.setFillColor(230, 230, 230);
    doc.rect(14, 10, 182, 10, "FD")
    
    doc.setFont("arial", "bold");
    doc.setFontSize(9)
    doc.text("Imprimé le   : 10/10/2121", 155, 15)
    doc.setFontSize(16)
    doc.text("LISTE DES CLIENTS PAR FAMILLE", 54, 18);
    doc['autoTable']({
      head: [[]],
      body: [],
      theme: 'grid',
      startY: 25,
    })

    let total = 0;
    let numberOfCustomer = 0;
    for (let family in data) {
      let totalByFamily = 0;
      let finalY = (doc as any).lastAutoTable.finalY;
      let tBody = [];

      let value = data[family];

      doc.setFontSize(10)
      doc.setTextColor(255, 0, 0);
      doc.text(family.toUpperCase(), 14, finalY+7);
      doc.setTextColor(255, 255, 255);
;
for (let index = 0; index < value.length; index++) {

      const customer = value[index];
      let row = [
        { content: customer.tradeName},
        { content: new Intl.NumberFormat('de-DE').format(customer.customerAccount.balance), styles: { valign: 'middle', halign: 'center' } },
        { content: new Intl.NumberFormat('de-DE').format(customer.customerAccount.ceilingBalance), styles: { valign: 'middle', halign: 'center' } },
      ];

      tBody.push(row);
      totalByFamily += customer.customerAccount.balance;
      total += customer.customerAccount.balance;
      numberOfCustomer ++;
}

tBody.push( [
  { content:"SOUS TOTAL ", styles: { fillColor : [230, 230, 230]}},
  { content: new Intl.NumberFormat('de-DE').format(totalByFamily) + " FCFA", styles: { valign: 'middle', halign: 'right', fillColor : [230, 230, 230]} },
  { content: "", colSpan : 2, styles: {lineWidth: 0}}])

    doc['autoTable']({
      head: [[
        { content: 'NOM' },
        { content: 'SOLDE' },
        { content: 'PLAFOND'},
        { content: 'REMARQUE'},
      ]],
      body: tBody,
      theme: 'grid',
      headStyles: {fontSize:8, fillColor : [230, 230, 230], lineColor: [0, 0, 0], halign:'center' , textColor: [0, 0, 0], lineWidth: 0.25 },
      bodyStyles: {textColor: [0, 0, 0], lineColor: [0, 0, 0], lineWidth: 0.25, fontStyle: "bold", fontSize:9},
      startY: finalY + 10,
      styles: {font: "arial", fontSize: 9},
      didDrawPage: function (data) {

        doc.setFontSize(8)
        var pageSize = doc.internal.pageSize
        var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()

        //doc  footer
        doc.text("- Page " + data.pageNumber + " -", data.settings.margin.left + 80, pageHeight - 3)
      }
    })
  }
    let finalY = (doc as any).lastAutoTable.finalY;
    doc.setTextColor(0);
    doc.setFontSize(10)
    doc.text("Nombre de clients :", 14, finalY + 10);
    doc.setDrawColor(0);
    doc.setFillColor(230, 230, 230);
    doc.rect(45, finalY + 6, 20, 6, "FD")
    doc.text(numberOfCustomer.toString(), 47, finalY + 10);
    doc.text("Total des soldes :", 80, finalY + 10);
    
    doc.setDrawColor(0);
    doc.setFillColor(230, 230, 230);
    doc.rect(110, finalY + 6, 60, 6, "FD")
    doc.text(new Intl.NumberFormat('de-DE').format(total)+ " FCFA", 112, finalY + 10);
    return doc;
  }
}
