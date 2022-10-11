import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DatePipe } from '@angular/common';
import { ShowroomSale } from 'src/app/_models/showroomSale.model';

@Injectable({
  providedIn: 'root'
})
export class ShowroomSaleDocumentService {

  constructor(
    private datePipe: DatePipe
  ) { }

  public getShowroomSale(showroomSales : ShowroomSale[]){
    var doc = new jsPDF('p', 'mm', 'a4');
    doc.setDrawColor(0);
    doc.setFillColor(230, 230, 230);
    doc.rect(14, 10, 182, 10, "FD")
    
    doc.setFont("arial", "bold");
    doc.setFontSize(9)
    doc.text("Imprimé le   : " + this.datePipe.transform(new Date(), 'dd/MM/yyyy'), 160, 7)
    doc.setFontSize(16)
    doc.text("HISTORIQUE DES FACTURES SHOWROOM", 50, 17);

    let tBody = [];
    
    for (let index = 0; index < showroomSales.length; index++) {
      const item = showroomSales[index];
      let article = [
        { content: this.datePipe.transform(new Date(item.date), 'dd/MM/yyyy'), styles: { valign: 'middle', halign: 'center' } },
        { content: item.deliveryNoteNumber, styles: { valign: 'middle', halign: 'left' } },
        { content: item.depot["name"], styles: { valign: 'middle', halign: 'left' } },
        { content:  new Intl.NumberFormat('de-DE').format(item.numberOfPackages), styles: { valign: 'middle', halign: 'center' } },
        { content:  new Intl.NumberFormat('de-DE').format(item.totalCostHt), styles: { valign: 'middle', halign: 'center' } },
        { content: `${item["user"].firstName} ${item["user"].lastName}`, styles: { valign: 'middle', halign: 'left' } },
      ];
      tBody.push(article);
    }

    doc['autoTable']({
      head: [[
        { content: 'DATE' },
        { content: 'N° VENTE' },
        { content: 'DEPOT'},
        { content: 'NBRE COLIS'},
        { content: 'TOTAL HT'},
        { content: 'ETABLIR PAR'},
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
