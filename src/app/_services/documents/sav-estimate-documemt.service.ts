import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { AppParam } from 'src/app/_models/app-param.model';
import { RepairEstimate } from 'src/app/_models/repairEstimate.model';
import { capitalize } from 'src/app/_utilities/string/capitalize';
import { environment } from 'src/environments/environment';
import { InvoiceService } from '../invoice.service';
import { PageHeaderService } from './page-header.service';

@Injectable({
  providedIn: 'root'
})
export class SavEstimateDocumemtService {
  
  customer: any;
  totalHt : number;
  constructor(
    private pageHeaderService: PageHeaderService,
    private datePipe: DatePipe,
    private invoiceService: InvoiceService) { }
    
  getEstimateDoc(appParam: AppParam, estimate: RepairEstimate) {

    var doc = new jsPDF('p', 'mm', 'a4');

    //doc header
    doc = this.pageHeaderService.get(doc, "Devis de reparation", appParam);

    //info cient
    this.customer = estimate.customerName;
    doc.setFontSize(11)
    doc.setFont("arial", "bold");
    doc.text(`CLIENT : ${this.customer}`, 15, 60);
    doc.setFontSize(12)
    doc.setFont("arial", "normal");
    doc.text("Article : " + estimate.articleSav.reference, 15, 66);

  doc.text("Date : " + this.datePipe.transform(new Date(), 'dd/MM/yyyy'), 15, 72);
  
    var tBody = [];
  let article = [];
    JSON.parse(estimate.sparePart).forEach((x, index) => {
      this.totalHt = x["unitPrice"] * x["qty"];
      let cellBgColor = environment.docWhiteCellBgColor;
      if(index%2 != 0)  cellBgColor = environment.docStripedCellBgColor;

       article = [
        { content: x['name'], styles: {fillColor: cellBgColor } }, 
        { content: x["qty"], styles: { valign: 'middle', halign: 'center', fillColor: cellBgColor } },
        { content: new Intl.NumberFormat('de-DE').format(x["unitPrice"].toFixed()) , styles: { valign: 'middle', halign: 'right', fillColor: cellBgColor } },
          { content: new Intl.NumberFormat('de-DE').format(this.totalHt) , styles: { valign: 'middle', halign: 'right', fillColor: cellBgColor } }
      ];
      tBody.push(article);
    })
    JSON.parse(estimate.otherServices).forEach(el => {
      let cellBgColor = environment.docWhiteCellBgColor;

       article = [
        { content: el['name'], styles: {fillColor: cellBgColor } }, 
        { content: "x", styles: { valign: 'middle', halign: 'center', fillColor: cellBgColor } },
        { content: new Intl.NumberFormat('de-DE').format(el["amount"].toFixed()) , styles: { valign: 'middle', halign: 'right', fillColor: cellBgColor } },
        { content: new Intl.NumberFormat('de-DE').format(el["amount"]) , styles: { valign: 'middle', halign: 'right', fillColor: cellBgColor } }
      ];
      tBody.push(article);
    });
   tBody.push([{ content: "Total", colSpan: 3, styles: { halign: 'right', lineWidth: 0 } }, { content: new Intl.NumberFormat('de-DE').format(Number(estimate.totalAmount.toFixed())) + " " + capitalize(appParam.currency), styles: { minCellWidth: 25, halign: 'right' } }]);

    doc['autoTable']({
      head: [[
        { content: 'Pièces / Services'},
        { content: 'Quantité'},
        { content: 'Prix unitaire '},
        { content: 'Total '}
      ]],
      body: tBody,
      theme: 'grid',
      headStyles: {fontSize:8, fillColor : [230, 230, 230], lineColor: [0, 0, 0], halign:'center' , textColor: [0, 0, 0], lineWidth: 0.25  },
      bodyStyles: {textColor: [0, 0, 0], lineColor: [0, 0, 0], lineWidth: 0.25, fontStyle: "bold", fontSize:9},
      startY: 75,
      styles: {font: "arial", fontSize: 9},
      didDrawPage: function (data) {

        doc.setFontSize(8)
        var pageSize = doc.internal.pageSize
        var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()

        //doc  footer
        doc.setTextColor(150)
        doc.setFontSize(8);
        doc.setLineWidth(0.25)

        var splitFooter = doc.splitTextToSize(appParam.footPage, 180);
        doc.line(195, pageHeight - 15, data.settings.margin.left, pageHeight - 15)
        doc.text(splitFooter, data.settings.margin.left, pageHeight - 12);
        doc.setTextColor(0, 26, 77);
        doc.text("- Page " + data.pageNumber + " -", data.settings.margin.left + 80, pageHeight - 3)
      }
    })

  //   let finalY = (doc as any).lastAutoTable.finalY;
  //   //signature
  //   doc.text("signature ", 15, finalY);
    return doc;
   }
}
