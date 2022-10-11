import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class ArticleCalotoqueBySubFamilyService {

  constructor(
    private datePipe: DatePipe,
  ) { }


  getCatalogueDoc(data: any) {

    var doc = new jsPDF('p', 'mm', 'a4');
    doc.rect(14, 20, 181, 12);
    doc.setFontSize(10);
    doc.text(this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss'), 160, 24);
    doc.setDrawColor(0, 0, 0);
    doc.setFillColor(230, 230, 230);
    doc.rect(35, 22, 120, 8, "FD");
    doc.setFontSize(15);
    doc.setFont("arial", "bold");
    doc.text("CATALOGUE DES CLIENTS PAR FAMILLE", 40, 28);
    doc['autoTable']({
      head: [[]],
      body: [],
      theme: 'grid',
      startY: 45,
    })


    for (let articleSubFamily in data) {

      let finalY = (doc as any).lastAutoTable.finalY;
      let tBody = [];

      let value = data[articleSubFamily];

      doc.setFontSize(10)
      doc.setTextColor(255, 0, 0);
      doc.text(articleSubFamily.toUpperCase(), 14, finalY + 7);
      doc.setTextColor(255, 255, 255);

      for (let index = 0; index < value.length; index++) {
        const element = value[index];
        tBody.push([
          { content: element[1], styles: { valign: 'middle' } },//reference
          { content: element[2], styles: { valign: 'middle', minCellWidth: 50 } },//designation
          { content: new Intl.NumberFormat('de-DE').format(element[4]), styles: { valign: 'middle' , halign : "center"} },//prix client
          { content: element[5], styles: { valign: 'middle' } } //sous famille article
        ]);

      }

      tBody.push([{ content: "Nombre d'articles :", colSpan: 3, styles: { fontStyle: 'bold' } }, { content: value.length, styles: { fontStyle: 'bold' } }]);

      doc['autoTable']({
        head: [[
          { content: 'Reference' },
          { content: 'Designation' },
          { content: 'Prix unitaire (FCFA)'},
          { content: 'Famille'},
        ]],
        body: tBody,
        theme: 'grid',
        headStyles: { fontSize: 8, fillColor: [230, 230, 230], lineColor: [0, 0, 0], halign: 'center', textColor: [0, 0, 0], lineWidth: 0.25 },
        bodyStyles: {textColor: [0, 0, 0],  lineColor: [0, 0, 0], lineWidth: 0.25, fontStyle: "bold", fontSize: 9 },
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

    return doc;
  }
}
