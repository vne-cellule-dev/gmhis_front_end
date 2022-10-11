import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { ArticleSav } from 'src/app/_models/articleSav.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleSavDocumemtService {

  constructor(
    private datePipe: DatePipe
  ) { }

  public getArticleStockDoc(articles : ArticleSav[]){    
    var doc = new jsPDF('p', 'mm', 'a4');
    doc.setDrawColor(0);
    doc.setFillColor(230, 230, 230);
    doc.rect(14, 10, 182, 10, "FD")
    
    doc.setFont("arial", "bold");
    doc.setFontSize(9)
    doc.text("Imprimé le   : " + this.datePipe.transform(new Date(), 'dd/MM/yyyy'), 160, 7)
    doc.setFontSize(16)
    doc.text("LISTE DES ARTICLES S.A.V", 57, 17);

    let tBody = [];

    for (let index = 0; index < articles.length; index++) {
      const item = articles[index];
      let article = [
        { content: item[1], styles: { valign: 'middle' } },
        { content: item[2], styles: { valign: 'middle' } },
        { content: new Intl.NumberFormat('de-DE').format(item[4]), styles: { valign: 'middle', halign: 'center' } },
      ];
      tBody.push(article);
    }

    doc['autoTable']({
      head: [[
        { content: 'REFERENCE' },
        { content: 'DESIGNATION' },
        { content: 'QUANTITE EN STOCK'}
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
