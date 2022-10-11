import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DatePipe } from '@angular/common';
import { StockEntry } from 'src/app/_models/stock-entry.model';
@Injectable({
  providedIn: 'root'
})
export class StockEntryDocumentService {

  constructor(
    private datePipe: DatePipe
  ) { }

  public getStockEntry(entries : StockEntry[]){
    var doc = new jsPDF('l', 'mm', 'a4');
    doc.setDrawColor(0);
    doc.setFillColor(230, 230, 230);
    doc.rect(14, 10, 270, 10, "FD")
    
    doc.setFont("arial", "bold");
    doc.setFontSize(9)
    doc.text("Imprimé le   : " + this.datePipe.transform(new Date(), 'dd/MM/yyyy'), 200, 7)
    doc.setFontSize(16)
    doc.text("HISTORIQUE DES ENTREES EN STOCK", 100, 17);

    let tBody = [];
    
    for (let index = 0; index < entries.length; index++) {
      const item = entries[index];
      let article = [
        { content: this.datePipe.transform(new Date(item.secondValidationDate), 'dd/MM/yyyy'), styles: { valign: 'middle', halign: 'center' } },
        { content: item["billOfLadingNumber"], styles: { valign: 'middle', halign: 'left' } },
        { content: item["article"]["reference"], styles: { valign: 'middle', halign: 'left' } },
        { content: new Intl.NumberFormat('de-DE').format(item.qty), styles: { valign: 'middle', halign: 'center' } },
        { content: item["depot"]["name"], styles: { valign: 'middle', halign: 'left' } },
        { content: item["secondValidationBy"]?  item["secondValidationBy"]["firstName"] +" "+  item["secondValidationBy"]["lastName"] : "", styles: { valign: 'middle', halign: 'left' } },
      ];
      tBody.push(article);
    }

    doc['autoTable']({
      head: [[
        { content: 'DATE' },
        { content: 'BL' },
        { content: 'ARTICLE'},
        { content: 'QTE'},
        { content: 'DEPOT'},
        { content: 'EFFECTUER PAR'},
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
