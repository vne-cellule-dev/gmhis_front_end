import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { SparePart } from 'src/app/_models/sparePart.model';

@Injectable({
  providedIn: 'root'
})
export class SavSparePartDocumemtService {

  constructor(
    private datePipe: DatePipe
  ) { }
  public getArticleStockDoc(sparePart : SparePart[]){ 
    console.log(sparePart);
       
    var doc = new jsPDF('p', 'mm', 'a4');
    doc.setDrawColor(0);
    doc.setFillColor(230, 230, 230);
    doc.rect(14, 10, 182, 10, "FD")
    
    doc.setFont("arial", "bold");
    doc.setFontSize(9)
    doc.text("Imprimé le   : " + this.datePipe.transform(new Date(), 'dd/MM/yyyy'), 160, 7)
    doc.setFontSize(16)
    doc.text("LISTE DES PIÈCES DE RECHANGE", 57, 17);

    let tBody = [];

    for (let index = 0; index < sparePart.length; index++) {
      const item = sparePart[index];
      let article = [
        { content: item.name, styles: { valign: 'middle' } },
        { content: item.articleSubFamily.name, styles: { valign: 'middle' } },
        { content: new Intl.NumberFormat('de-DE').format(item.costPrice), styles: { valign: 'middle', halign: 'center' } },
        { content: new Intl.NumberFormat('de-DE').format(item.qty), styles: { valign: 'middle', halign: 'center' } },
        { content: new Intl.NumberFormat('de-DE').format(item.salesPrice), styles: { valign: 'middle', halign: 'center' } },

      ];
      tBody.push(article);
    }

    doc['autoTable']({
      head: [[
        { content: 'INTITULÉ' },
        { content: 'SOUS FAMILLE	' },
        { content: 'PRIX DE REVIENT' },
        { content: 'QUANTITE'},
        { content: 'PRIX DE VENTE'}

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
