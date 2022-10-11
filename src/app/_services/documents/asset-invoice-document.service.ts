import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { AppParam } from 'src/app/_models/app-param.model';
import { Asset } from 'src/app/_models/asset.model';
import { PageHeaderService } from './page-header.service';
import 'jspdf-autotable';
import { Customer } from 'src/app/_models/customer.model';
import { BranchOffice } from 'src/app/_models/branchOffice.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssetInvoiceDocumentService {

  customer: Customer;
  branchOffice: any;

  constructor(
    private pageHeaderService: PageHeaderService,
    private datePipe: DatePipe) { }

  getAssetInvoiceDoc(appParam: AppParam, asset: any, articleReturned : any[]) {

    var doc = new jsPDF('p', 'mm', 'a4');

    //info cient
   
 
    doc.line(195, 75, 15, 75)
    doc.setFontSize(10)
    doc.setFont("arial", "bold");
    doc.text("Abidan le :"+ this.datePipe.transform(new Date(asset[1]), 'dd/MM/yyyy'), 162, 80);

    doc.text("AVOIR N°: " , 150, 90);
    doc.setFillColor(230, 230, 230);
    doc.setDrawColor(0)
    doc.rect(171, 87, 25, 5, "FD")
    doc.setFontSize(8)
    doc.text(asset[2] , 173, 90);
    doc.line(150, 91, 165, 91);
    
    doc.text("CLIENT:  ", 15, 80);
    doc.text(": " + asset[4].toUpperCase(), 45, 80);
    doc.line(15, 81, 30, 81)
    doc.text("SUCCURSALE", 15, 86);
  //  doc.text(": " + (this.branchOffice ? this.branchOffice.name.toUpperCase() : ""), 45, 86);
    doc.text("TEL" , 15, 92);
    doc.text(": " , 45, 92);
    doc.text("N° CC" , 15, 98)
    doc.text(": " , 45, 98)

    //table
    var tBody = [];
    articleReturned.forEach((x,index) => {
      let cellBgColor = environment.docWhiteCellBgColor;
      
      if(index%2 != 0)  cellBgColor = environment.docStripedCellBgColor;

      let article = [
        { content: x["article"]['reference'], styles: { valign: 'middle', fillColor: cellBgColor } },
        { content: x["article"]['name'], styles: {fillColor: cellBgColor } }, 
        { content: new Intl.NumberFormat('de-DE').format(x["qty"]), styles: { valign: 'middle', halign: 'center', fillColor: cellBgColor } },
        { content: new Intl.NumberFormat('de-DE').format(x["assetUnitPrice"]) , styles: { valign: 'middle' , halign:'right', fillColor: cellBgColor} },
        { content: new Intl.NumberFormat('de-DE').format(x["totalAmount"]) , styles: { valign: 'middle' , halign:'right', fillColor: cellBgColor} }
      ];
      tBody.push(article);
    })

    tBody.push([{ content: "Total TTC", colSpan: 4, styles: { halign: 'right', lineWidth: 0 } }, { content: new Intl.NumberFormat('de-DE').format(asset[7]) + " " + appParam.currency.toUpperCase() , styles: { minCellWidth: 25, halign:'right' } }]);

    doc['autoTable']({
      head: [[
        { content: 'Reference' },
        { content: 'Designation'},
        { content: 'Quantité'},
        { content: 'Prix unitaire HT'},
        { content: 'Total HT'}
      ]],
      body: tBody,
      theme: 'grid',
      headStyles: {fontSize:8, fillColor : [230, 230, 230], lineColor: [0, 0, 0], halign:'center' , textColor: [0, 0, 0], lineWidth: 0.25  },
      bodyStyles: {textColor: [0, 0, 0], lineColor: [0, 0, 0], lineWidth: 0.25, fontStyle: "bold", fontSize:9},
      startY: 105,
      styles: {font: "arial", fontSize: 9},
      didDrawPage: function (data) {

        doc.setFontSize(8)
        var pageSize = doc.internal.pageSize
        var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()

        //doc  footer
        doc.text("- Page " + data.pageNumber + " -", data.settings.margin.left + 80, pageHeight - 2)
      }
    })

    let finalY = (doc as any).lastAutoTable.finalY;

    if (finalY >= 250) {
      doc.addPage();
      finalY = 10;
      doc.setFillColor(230, 230, 230);
      doc.setDrawColor(0)
      doc.rect(15, finalY, 55, 30)
      doc.rect(15, finalY, 55, 5, "FD")
      doc.text("La comptabilité ", 30, finalY + 5);

      //page  footer
      doc.setTextColor(150)
      doc.setFontSize(8);
      doc.setLineWidth(0.25)
      var pageSize = doc.internal.pageSize
      var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()    
      doc.text("- Page " + (doc.internal.pages.length - 1) + " -", 10 + 80, pageHeight - 2)
    } else {
      doc.setFillColor(230, 230, 230);
      doc.setDrawColor(0)
      doc.rect(15, finalY, 55, 30)
      doc.rect(15, finalY, 55, 6, "FD")
      doc.text("LA COMPTABILITE ", 30, finalY + 5);
    }

    return doc;
  }


  getAssetInvoiceDocOld(appParam: AppParam, asset: Asset) {
   
    var doc = new jsPDF('p', 'mm', 'a4');

    //doc header
    doc = this.pageHeaderService.get(doc, "AVOIRS " + asset.assetsNumber, appParam);

    //info cient
    this.customer = asset["salesDelivery"]["customerOrder"]["customer"];
    doc.setFontSize(15)
    doc.setFont("arial", "bold");
    doc.text(this.customer.corporateName, 80, 60);
    doc.setFontSize(12)
    doc.setFont("arial", "normal");
    doc.text("Adresse : " + this.customer.address, 80, 65);

    doc.text("Contact : " + this.customer.phone, 80, 70);

    //info avoir
    doc.text("Date : " + this.datePipe.transform(new Date(), 'dd/MM/yyyy'), 15, 60);
    doc.text("Reference : " + asset.assetsNumber, 15, 66);
    doc.text("N° client : " + this.customer.customerNumber, 15, 72)

    //table
    var tBody = [];
    JSON.parse(asset.articles).forEach((x,index) => {

      let cellBgColor = environment.docWhiteCellBgColor;
      
      if(index%2 != 0)  cellBgColor = environment.docStripedCellBgColor;

      let article = [
        { content: x['reference'], styles: { valign: 'middle', fillColor: cellBgColor } },
        { content: x['name'] }, { content: x["qty"], styles: { valign: 'middle', halign: 'center', fillColor: cellBgColor  } },
        { content: x["unitPrice"] + " " + appParam.currency, styles: { valign: 'middle', fillColor: cellBgColor  } },
        { content: x["totalAmount"] + " " + appParam.currency, styles: { valign: 'middle', fillColor: cellBgColor  } }
      ];
      tBody.push(article);
    })

    tBody.push([{ content: "Total TTC", colSpan: 4, styles: { halign: 'right', lineWidth: 0 } }, { content: asset.amountAssets + " " + appParam.currency, styles: { minCellWidth: 25 } }]);

    doc['autoTable']({
      head: [[
        { content: 'Reference', styles: { fillColor: [230, 238, 255], textColor: [0, 0, 0], lineWidth: 0.25 } },
        { content: 'Designation', styles: { fillColor: [230, 238, 255], textColor: [0, 0, 0], lineWidth: 0.25 } },
        { content: 'Quantité', styles: { fillColor: [230, 238, 255], textColor: [0, 0, 0], lineWidth: 0.25 } },
        { content: 'Prix unitaire HT', styles: { minCellWidth: 30, fillColor: [230, 238, 255], textColor: [0, 0, 0], lineWidth: 0.25 } },
        { content: 'Total HT', styles: { fillColor: [230, 238, 255], textColor: [0, 0, 0], lineWidth: 0.25 } }
      ]],
      body: tBody,
      theme: 'grid',
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

    if (finalY >= 250) {
      doc.addPage();
      finalY = 10;
      doc.setFillColor(230, 238, 255);
      doc.setDrawColor(0);
      doc.rect(15, finalY, 55, 30)
      doc.rect(15, finalY, 55, 5, "FD")
      doc.text("La comptabilité ", 30, finalY + 5);

      //page  footer
      doc.setTextColor(150)
      doc.setFontSize(8);
      doc.setLineWidth(0.25)
      var pageSize = doc.internal.pageSize
      var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
      var splitFooter = doc.splitTextToSize(appParam.footPage, 180);
      doc.line(195, pageHeight - 20, 10, pageHeight - 20)
      doc.text(splitFooter, 10, pageHeight - 1);
      doc.setTextColor(0, 26, 77);
      doc.text("- Page " + (doc.internal.pages.length - 1) + " -", 10 + 80, pageHeight - 5)
    } else {
      doc.setFillColor(230, 238, 255);
      doc.setDrawColor(0);
      doc.rect(15, finalY, 55, 30)
      doc.rect(15, finalY, 55, 5, "FD")
      doc.text("La comptabilité ", 30, finalY + 5);
    }

    return doc;
  }
}