import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { id } from 'date-fns/locale';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { AppParam } from 'src/app/_models/app-param.model';
import { Estimate } from 'src/app/_models/estimate.model';
import { capitalize } from 'src/app/_utilities/string/capitalize';
import { environment } from 'src/environments/environment';
import { InvoiceService } from '../invoice.service';
import { PageHeaderService } from './page-header.service';


@Injectable({
  providedIn: 'root'
})
export class EstimateDocumentService {

  tvaPercentage: number;
  airsiPercentage: number;

  customer: any;

  constructor(
    private pageHeaderService: PageHeaderService,
    private datePipe: DatePipe,
    private invoiceService: InvoiceService) { }

  getEstimateDoc(appParam: AppParam, estimate: Estimate) {

    var doc = new jsPDF('p', 'mm', 'a4');

    //doc header
    doc = this.pageHeaderService.get(doc, "Devis", appParam);

    //info cient
    this.customer = estimate.customer;
    doc.setFontSize(11)
    doc.setFont("arial", "bold");
    doc.text(this.customer.corporateName, 80, 60);
    doc.setFontSize(12)
    doc.setFont("arial", "normal");
    doc.text("Adresse : " + this.customer.address, 80, 65);

    doc.text("Contact : " + this.customer.phone, 80, 70);

    //info devis
    doc.text("Date : " + this.datePipe.transform(new Date(), 'dd/MM/yyyy'), 15, 60);
    doc.text("Reference : " + estimate.estimateNumber.toUpperCase(), 15, 66);
    doc.text("N° client : " + this.customer.customerNumber, 15, 72)

    //table
    var tBody = [];
    JSON.parse(estimate.articles).forEach((x, index) => {
      
      let cellBgColor = environment.docWhiteCellBgColor;
      
      if(index%2 != 0)  cellBgColor = environment.docStripedCellBgColor;

      let article = [
        { content: x['reference'], styles: { valign: 'middle', fillColor: cellBgColor } },
        { content: x['designation'], styles: {fillColor: cellBgColor } }, 
        { content: x["qty"], styles: { valign: 'middle', halign: 'center', fillColor: cellBgColor } },
        { content: new Intl.NumberFormat('de-DE').format(x["unitPriceHt"].toFixed()) , styles: { valign: 'middle', halign: 'right', fillColor: cellBgColor } },
        { content: new Intl.NumberFormat('de-DE').format(x["totalHt"].toFixed()) , styles: { valign: 'middle', halign: 'right', fillColor: cellBgColor } }
      ];
      tBody.push(article);
    })

    tBody.push([{ content: "Total HT", colSpan: 4, styles: { halign: 'right', lineWidth: 0, fillColor : [255, 255, 255] } }, { content: new Intl.NumberFormat('de-DE').format(Number(estimate.totalHt.toFixed())) , styles: { minCellWidth: 25, halign: 'right', fillColor : [255, 255, 255] } }]);
    tBody.push([{ content: "TVA " + environment.tvaRate + "% :", colSpan: 4, styles: { halign: 'right', lineWidth: 0 , fillColor : [255, 255, 255]} }, { content: new Intl.NumberFormat('de-DE').format(Number(estimate.tvaValue.toFixed())) , styles: { minCellWidth: 25, halign: 'right', fillColor : [255, 255, 255] } }]);
    if (estimate.includeAirsi || estimate.excludeAirsi) tBody.push([{ content: "AIRSI " + environment.airsiRate + "% :", colSpan: 4, styles: { halign: 'right', lineWidth: 0, fillColor : [255, 255, 255] } }, { content: new Intl.NumberFormat('de-DE').format(Number(estimate.airsiValue.toFixed())) , styles: { minCellWidth: 25, halign: 'right', fillColor : [255, 255, 255] } }]);

    tBody.push([{ content: "Total TTC", colSpan: 4, styles: { halign: 'right', lineWidth: 0 } }, { content: new Intl.NumberFormat('de-DE').format(Number(estimate.totalTtc.toFixed())) + " " + capitalize(appParam.currency), styles: { minCellWidth: 25, halign: 'right' } }]);

    doc['autoTable']({
      head: [[
        { content: 'Reference'},
        { content: 'Designation'},
        { content: 'Quantité'},
        { content: 'Prix unitaire HT'},
        { content: 'Total HT'}
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

    let finalY = (doc as any).lastAutoTable.finalY;
    //signature
    doc.text("signature ", 15, finalY);
    return doc;
  }
}
