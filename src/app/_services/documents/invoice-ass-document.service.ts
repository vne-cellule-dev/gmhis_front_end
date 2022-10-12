import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { AppParam } from 'src/app/_models/app-param.model';
import { InvoiceSaa } from 'src/app/_models/invoiceSaa.model';
import { capitalize } from 'src/app/_utilities/string/capitalize';
import { environment } from 'src/environments/environment';
import { PageHeaderService } from './page-header.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceAssDocumentService {

   
  customer: any;
  totalHt : number;
  constructor(
    private pageHeaderService: PageHeaderService,
    private datePipe: DatePipe,
    ) { }
    
  getEstimateDoc(appParam: AppParam, invoiceAss: InvoiceSaa) {

    var doc = new jsPDF('p', 'mm', 'a4');

    //doc header
    doc = this.pageHeaderService.get(doc, "Facture S.A.V", appParam);

    //info cient
    this.customer = invoiceAss.customerName;
    doc.setFontSize(11)
    doc.setFont("arial");
    doc.text(`CLIENT : ${this.customer}`, 15, 60);
    doc.text(`N° FACTURE : ${invoiceAss["invoiceNumber"]}`, 15, 66);
  
  doc.text("Date : " + this.datePipe.transform(new Date(), 'dd/MM/yyyy'), 15, 72);
    var tBody = [];
  let article = [];
  let totalAmount : number = 0 ;
    JSON.parse(invoiceAss["services"]).forEach((x, index) => {
      console.log(x);
      
      totalAmount = totalAmount + (x["unitQty"] * x["unitPrice"]);
      let cellBgColor = environment.docWhiteCellBgColor;
      if(index%2 != 0)  cellBgColor = environment.docStripedCellBgColor;

       article = [
        { content: x['designation'], styles: {fillColor: cellBgColor } }, 
        { content: new Intl.NumberFormat('de-DE').format(x["unitPrice"].toFixed()) , styles: { valign: 'middle', halign: 'right', fillColor: cellBgColor } },
        { content: x["unitQty"], styles: { valign: 'middle', halign: 'center', fillColor: cellBgColor } },
        { content: new Intl.NumberFormat('de-DE').format(x["total"]) , styles: { valign: 'middle', halign: 'right', fillColor: cellBgColor } }
      ];
      tBody.push(article);
    })
   tBody.push([{ content: "Total", colSpan: 3, styles: { halign: 'right', lineWidth: 0 } }, { content: new Intl.NumberFormat('de-DE').format(Number(totalAmount.toFixed())) + " " + capitalize(appParam.currency), styles: { minCellWidth: 25, halign: 'right' } }]);

    doc['autoTable']({
      head: [[
        { content: 'services'},
        { content: 'Prix unitaire '},
        { content: 'Quantité'},
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
