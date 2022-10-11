import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DatePipe } from '@angular/common';
import { CashRegister } from 'src/app/_models/cashRegister.model';

@Injectable({
  providedIn: 'root'
})
export class CashRegisterDocumentService {

  constructor(
    private datePipe: DatePipe

  ) { }

  public getCashRegister(casRegisters : CashRegister[]){
    let totalBalance : number = 0;
    casRegisters.forEach(el =>{
     totalBalance += el.balance;
    })
    var doc = new jsPDF('p', 'mm', 'a4');
    doc.setDrawColor(0);
    doc.setFillColor(230, 230, 230);
    doc.rect(14, 10, 182, 10, "FD")
    
    doc.setFont("arial", "bold");
    doc.setFontSize(9)
    doc.text("Total caisse   : " +  new Intl.NumberFormat('de-DE').format(totalBalance) + " FCFA", 15, 7)
    doc.text("Imprimé le   : " + this.datePipe.transform(new Date(), 'dd/MM/yyyy'), 160, 7)
    doc.setFontSize(16)
    doc.text("LISTE DES CAISSES", 75, 17);

    let tBody = [];

    for (let index = 0; index < casRegisters.length; index++) {
      const item = casRegisters[index];
      let article = [
        { content: item.depot.name, styles: { valign: 'middle', halign: 'left' } },
        { content: new Intl.NumberFormat('de-DE').format(item.balance), styles: { valign: 'middle', halign: 'center' } },
        { content: this.datePipe.transform(new Date(item.lastCollectionDate), 'dd/MM/yyyy'), styles: { valign: 'middle', halign: 'center' } },
      ];
      tBody.push(article);
    }

    doc['autoTable']({
      head: [[
        { content: 'DEPOT' },
        { content: 'MONTANT' },
        { content: 'DERNIERE DATE DE COLLECTE'},
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
