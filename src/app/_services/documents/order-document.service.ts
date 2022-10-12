import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { AppParam } from 'src/app/_models/app-param.model';
import { CustomerOrder } from 'src/app/_models/customerOder.model';
import 'jspdf-autotable';
import { PageHeaderService } from './page-header.service';
import { InvoiceService } from '../invoice.service';
import { InvoiceTax } from 'src/app/_models/invoiceTax.model';
import { environment } from 'src/environments/environment';
import { capitalize } from 'src/app/_utilities/string/capitalize';

@Injectable({
  providedIn: 'root'
})
export class OrderDocumentService {

  tvaPercentage: number;
  airsiPercentage: number;

  constructor(
    private pageHeaderService: PageHeaderService,
    private datePipe: DatePipe,
    private invoiceService: InvoiceService) { }


  getOrderDoc(appParam: AppParam, order: CustomerOrder, customerOrderArticles: any[]) {    
    var doc = new jsPDF('p', 'mm', 'a4');
    var doc = new jsPDF();
    var x = 10;
    var y =20;
    var date = new Date(order['orderDate']);
    var img = new Image();
    img.src =  "assets/images/vertical-code-barre.jpg";
    doc.setFontSize(10);

    doc.rect(15, 17, 80, 32)
    doc.setFont("arial", "bold");
    doc.text("BON DE COMMANDE N° : " + order["orderNumber"], x + 104, y);
    doc.text("............................................................................................", 114, y+3);
    doc.addImage(img, "JPEG", 75, 17, x + 10, 31);
    doc.text("Date : " + this.datePipe.transform(date, 'dd/MM/yyyy'), x + 104, y + 7);
    doc.rect(115, 30, 80, 19)
    doc.text("client : "+order["customer"]["tradeName"].toUpperCase(), x + 107, y + 19);
    doc.text("succursale : " + ((order["branchOffice"] != null) ? order["branchOffice"]["name"].toUpperCase() : ""), x + 107, y + 26);
    doc.text("CLIENT", x + 133, y + 14);
    doc.setFontSize(8);
    var tBody =  [];
 
    for (let index = 0; index < customerOrderArticles.length; index++) {
          
          const element = customerOrderArticles[index];
          let cellBgColor = environment.docWhiteCellBgColor;
      
          if(index%2 != 0)  cellBgColor = environment.docStripedCellBgColor;

          let article = [
            { content: element['article']['reference'], styles: { valign: 'middle', halign: 'center', fillColor: cellBgColor } },
            { content: element['article']['name'] },
            { content:  new Intl.NumberFormat('de-DE').format(element["qty"]), styles: { valign: 'middle', halign: 'center', fillColor: cellBgColor } },
            { content: new Intl.NumberFormat('de-DE').format(element["unitPriceHt"])  + " " + capitalize(appParam.currency), styles: { valign: 'middle', halign: 'right', fillColor: cellBgColor} },
            { content: new Intl.NumberFormat('de-DE').format(element["totalHt"]) + " " + capitalize(appParam.currency) , styles: { valign: 'middle', halign: 'right', fillColor: cellBgColor } }
            
          ];
          tBody.push(article);
        }

        tBody.push([{ content: "Total HT :", colSpan: 4, styles: { halign: 'right', lineWidth: 0 ,fillColor : [255,255,255]} }, { content: new Intl.NumberFormat('de-DE').format(order.totalHt)+ " " + capitalize(appParam.currency) , styles: { minCellWidth: 25, halign: 'right', fillColor : [255,255,255] } }]);
        tBody.push([{ content: "TVA" + environment.tvaRate + "% :", colSpan: 4, styles: { halign: 'right', lineWidth: 0 , fillColor : [255,255,255]} }, { content: new Intl.NumberFormat('de-DE').format(order.tvaValue)+ " " + capitalize(appParam.currency), styles: { minCellWidth: 25, halign: 'right', fillColor : [255,255,255] } }]);
        if (order.includeAirsi || order.excludeAirsi) tBody.push([{ content: "AIRSI " + environment.airsiRate + "% :", colSpan: 4, styles: { halign: 'right', lineWidth: 0, fillColor : [255,255,255] } }, { content: new Intl.NumberFormat('de-DE').format(order.airsiValue) + " " + capitalize(appParam.currency), styles: { minCellWidth: 25, halign: 'right', fillColor : [255,255,255] } }]);
        tBody.push([{ content: "Total TTC :", colSpan: 4, styles: { halign: 'right', lineWidth: 0, fillColor : [255,255,255] } }, { content: new Intl.NumberFormat('de-DE').format(order.totalTtc)+ " " + capitalize(appParam.currency) , styles: { minCellWidth: 25, halign: 'right', fillColor : [255,255,255] } }]);
        
    doc['autoTable']({
      head: [[
        {content:'REFERENCE'},
        {content:'DESIGNATION'},
        {content:'QTE'},
        {content: 'Prix unitaire HT'},
        {content: 'Total HT'}
      ]],
      body: tBody,
      theme: 'grid',
      headStyles: {fontSize:8, fillColor : [230, 230, 230], lineColor: [0, 0, 0], halign:'center' , textColor: [0, 0, 0], lineWidth: 0.25  },
      bodyStyles: {textColor: [0, 0, 0], lineColor: [0, 0, 0], lineWidth: 0.25, fontStyle: "bold", fontSize:9},
      startY: 53,
      styles: {font: "arial", fontSize: 9},
      didDrawPage: function (data) {

        doc.setFontSize(8)
        var pageSize = doc.internal.pageSize
        var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
        doc.text("- Page " + data.pageNumber + " -", data.settings.margin.left + 80, pageHeight - 3)
      }
    })
    
    let finalY = (doc as any).lastAutoTable.finalY;
    
    //signature
    doc.text("signature ", 15, finalY);


    return doc;
  }

  getOrderDocOld(appParam: AppParam, order: CustomerOrder, customerOrderArticles: any[]) {

    var doc = new jsPDF('p', 'mm', 'a4');
    
    //doc.header
    doc = this.pageHeaderService.get(doc,"Bon de Commande", appParam);
   
    //info client
    doc.setFontSize(15)
    doc.setFont("arial", "bold");
    doc.text(order.customer['corporateName'], 80, 60);
    doc.setFontSize(12)
    doc.setFont("arial", "normal");
    doc.text("Adresse : " + order.customer['address'], 80, 65);

    doc.text("Contact : " + order.customer['phone'], 80, 70);

    //info livraison
    doc.text("Date : " + this.datePipe.transform(new Date(), 'dd/MM/yyyy'), 15, 60);
    doc.text("Reference : " + order["orderNumber"], 15, 66);
    doc.text("N° client : " + order.customer["customerNumber"], 15, 72);

    //table
    var tBody = [];
    for (let index = 0; index < customerOrderArticles.length; index++) {
      
      const element = customerOrderArticles[index];
      let cellBgColor = environment.docWhiteCellBgColor;
      
      if(index%2 != 0)  cellBgColor = environment.docStripedCellBgColor;

      let article = [
        { content: element['article']['reference'], styles: { valign: 'middle' } },
        { content: element['article']['name'] }, { content: element["qty"], styles: { valign: 'middle', halign: 'center' } },
        { content: element["unitPriceHt"] + " " + capitalize(appParam.currency), styles: { valign: 'middle', halign: 'right'} },
        { content: element["totalHt"]+ " " + capitalize(appParam.currency) , styles: { valign: 'middle', halign: 'right' } }
      ];
      tBody.push(article);
    }

    tBody.push([{ content: "Total HT :", colSpan: 4, styles: { halign: 'right', lineWidth: 0 } }, { content: order.totalHt+ " " + capitalize(appParam.currency) , styles: { minCellWidth: 25, halign: 'right' } }]);
    tBody.push([{ content: "TVA " + environment.tvaRate + "% :", colSpan: 4, styles: { halign: 'right', lineWidth: 0 } }, { content: order.tvaValue+ " " + capitalize(appParam.currency), styles: { minCellWidth: 25, halign: 'right' } }]);
    if (order.includeAirsi || order.excludeAirsi) tBody.push([{ content: "AIRSI " + environment.airsiRate + "% :", colSpan: 4, styles: { halign: 'right', lineWidth: 0 } }, { content: order.airsiValue + " " + capitalize(appParam.currency), styles: { minCellWidth: 25, halign: 'right' } }]);
    tBody.push([{ content: "Total TTC :", colSpan: 4, styles: { halign: 'right', lineWidth: 0 } }, { content: order.totalTtc+ " " + capitalize(appParam.currency) , styles: { minCellWidth: 25, halign: 'right' } }]);

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
      startY: 77,
      styles: {font: "arial", fontSize: 9},
      didDrawPage: function (data) {

        var pageSize = doc.internal.pageSize
        var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()

        //page  footer
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
