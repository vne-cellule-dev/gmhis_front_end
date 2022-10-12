import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { AppParam } from 'src/app/_models/app-param.model';
import 'jspdf-autotable';
import { Delivery } from 'src/app/_models/delivery.model';
import { PageHeaderService } from './page-header.service';
import { PageFooterService } from './page-footer.service';
import { Customer } from 'src/app/_models/customer.model';
import { NumberToLetter } from 'convertir-nombre-lettre';
import { capitalize } from 'src/app/_utilities/string/capitalize';
import { SaleDeliveryService } from './sale-delivery.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderDeliveryDocumentService {

  createdBy : any;
  customer: Customer;

  constructor(
    private datePipe: DatePipe,
    private saleDeliveryService : SaleDeliveryService,
    private pageFooterService: PageFooterService) { }
  

  getOrderDeliveryDoc(appParam: AppParam, delivery: Delivery, delivreredArticles: any[]) {
    
    var doc = new jsPDF('p', 'mm', 'a4');
    var doc = new jsPDF();
    var x = 10;
    var y =20;
    var date = new Date(delivery['date']);
    var img = new Image();
    var splitCustomerName = doc.splitTextToSize(`${delivery["customerOrder"]["customer"]["tradeName"]}`.toUpperCase(), 120);
    var splitDeliveryAddress = doc.splitTextToSize(`${delivery.deliveryAddress}`.toUpperCase(), 120);

    // var splitDepotName = doc.splitTextToSize(`Depot : ${delivery["customerOrder"]["depot"]["name"]}`.toUpperCase(), 130);

    img.src =  "assets/images/vertical-code-barre.png";
    doc.setFontSize(9);
    doc.rect(15, 17, 95, 40)
    doc.setFont("arial", "bold");
    doc.text("BON DE LIVRAISON N° : " + delivery["deliveryNoteNumber"], x + 104, y);
    doc.text("............................................................................................", 114, y+3);
    doc.addImage(img, "PNG", 91, 18, x + 8, 38);
    doc.text("DATE : " , x + 104, y +6);
    doc.text(this.datePipe.transform(date, 'dd/MM/yyyy'), x + 142, y +6);

    doc.setFontSize(9);
    doc.rect(115, 30, 80, 27)
    doc.text("CLIENT", x + 132, y + 14);
    doc.text(splitCustomerName, x + 107, y + 19);
    // doc.text(splitDepotName, x + 107, y + 18);
    
    doc.text("Adresse de livraison : ", x + 125, y + 25);
    doc.text(splitDeliveryAddress, x + 107, y + 30);

    doc.setFontSize(8);
    var tBody =  [];
 
    for (let index = 0; index < delivreredArticles.length; index++) {
      
      const element = delivreredArticles[index];
      let cellBgColor = environment.docWhiteCellBgColor;
      
      if(index%2 != 0)  cellBgColor = environment.docStripedCellBgColor;
      
          let article = [
            { content: element['article']['reference'], styles: { valign: 'middle', fillColor: cellBgColor} },
            { content: element['article']['name'] , styles: { fillColor: cellBgColor}},
            { content:  new Intl.NumberFormat('de-DE').format(element["qty"]), styles: { valign: 'middle', halign: 'center', fillColor: cellBgColor } },
          ];
          tBody.push(article);
        }
        
    
    doc['autoTable']({
      head: [[
        {content:'REFERENCE'},
        {content:'DESIGNATION'},
        {content:'QTE'}
      ]],
      body: tBody,
      theme: 'grid',
      headStyles: {fontSize:8, fillColor : [230, 230, 230], lineColor: [0, 0, 0], halign:'center' , textColor: [0, 0, 0], lineWidth: 0.25  },
      bodyStyles: {textColor: [0, 0, 0], lineColor: [0, 0, 0], lineWidth: 0.25, fontStyle: "bold", fontSize:9, font: "arial"},
      startY: 60,
      didDrawPage: function (data) {

        doc.setFontSize(8)
        var pageSize = doc.internal.pageSize
        var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()

        if(delivery["customerOrder"]["depot"]["deptPrincipal"] == true) {
          let depotName = delivery["customerOrder"]["depot"]["name"];
          doc.text(depotName.match(/\b(\w)/g).join(''), data.settings.margin.left + 125, pageHeight - 10)
        }
        
        doc.text("- Page " + data.pageNumber + " -", data.settings.margin.left + 80, pageHeight - 3)
      }
    })
    
    let finalY = (doc as any).lastAutoTable.finalY;
    let numberOfPackages = delivreredArticles.map(x=>x.qty).reduce(function(a, b){ return a + b; });

    let driver = delivery.driver["firstName"]+ " "+ delivery.driver["lastName"];
    let vehicle = delivery.vehicle["registerNum"]
    doc = this.pageFooterService.get(doc, appParam, finalY,numberOfPackages, driver, vehicle, delivery["comment"]);

    return doc;
  }


  getOrderDeliveryDocOld(appParam: AppParam, delivery: Delivery, delivreredArticles: any[]) {
    
  //   var doc = new jsPDF('p', 'mm', 'a4');
    
  //   //doc.header
  //   doc = this.pageHeaderService.get(doc, 'Bon de livraison', appParam);
    
  //   //info client
  //   this.customer = delivery["customerOrder"]["customer"];
  //   doc.setFontSize(15)
  //   doc.setFont("arial", "bold");
  //   doc.text(this.customer.corporateName, 80, 60);
  //   doc.setFontSize(12)
  //   doc.setFont("arial", "normal");
  //   doc.text("Adresse : " + this.customer.address, 80, 65);
  //   doc.text("Contact : " + this.customer.phone, 80, 70);
    
  //   //info 
  //   doc.text("Date : " + this.datePipe.transform(new Date(), 'dd/MM/yyyy'), 15, 60);
  //   doc.text("Reference : " + delivery.deliveryNoteNumber, 15, 66);
  //   doc.text("N° client : " + this.customer.customerNumber, 15, 72)
    
  //   //table
  //   var tBody = [];
  //   for (let index = 0; index < delivreredArticles.length; index++) {
  //     const element = delivreredArticles[index];
  //     let article = [
  //       { content: element['article']['reference'], styles: { valign: 'middle', halign: 'center' } },
  //       { content: element['article']['name'] }, { content: element["qty"], styles: { valign: 'middle', halign: 'center' } },
        
  //     ];
  //     tBody.push(article);
  //   }
    
  //   doc['autoTable']({
  //     head: [[
  //       { content: 'Reference', styles: { fillColor: [230, 238, 255], textColor: [0, 0, 0], lineWidth: 0.25 } },
  //       { content: 'Designation', styles: { fillColor: [230, 238, 255], textColor: [0, 0, 0], lineWidth: 0.25 } },
  //       { content: 'Quantité', styles: { fillColor: [230, 238, 255], textColor: [0, 0, 0], lineWidth: 0.25 } },
  //     ]],
  //     body: tBody,
  //     theme: 'grid',
  //     startY: 77,
  // styles: {font: "arial", fontSize: 9},
  //     didDrawPage: function (data) {
        
  //       var pageSize = doc.internal.pageSize
  //       var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
        
  //       //page  footer
  //       doc.setTextColor(150)
  //       doc.setFontSize(10);
  //       doc.setLineWidth(0.25)
        
  //       var splitFooter = doc.splitTextToSize(appParam.footPage, 180);
  //       doc.line(195, pageHeight - 15, data.settings.margin.left, pageHeight - 15)
  //       doc.text(splitFooter, data.settings.margin.left, pageHeight - 12);
  //       doc.setTextColor(0, 26, 77);
  //       doc.text("- Page " + data.pageNumber + " -", data.settings.margin.left + 80, pageHeight - 3);
  //     }
  //   })
    
  //   let finalY = (doc as any).lastAutoTable.finalY;
  //   doc = this.pageFooterService.get(doc, appParam, finalY, delivery.numberOfPackages, null, null);

  //   return doc;
  }

  getOrderDeliveryInvoice(appParam: AppParam, delivery: Delivery, delivreredArticles: any[], invoiceType){

   
    var doc = new jsPDF();

    doc = this.saleDeliveryService.getInvoiceDoc(appParam, delivery, delivreredArticles, invoiceType);
    return doc;
   
  }

  getAllDelivery(deliveries : any[]){    
    var doc = new jsPDF('p', 'mm', 'a4');
    
    doc.setDrawColor(0);
    doc.setFillColor(230, 230, 230);
    doc.rect(14, 10, 182, 10, "FD")
    
    doc.setFont("arial", "bold");
    doc.setFontSize(9)
    doc.text("Imprimé le   : " + this.datePipe.transform(new Date(), 'dd/MM/yyyy'), 160, 7)
    doc.setFontSize(16)
    doc.text("HISTORIQUE DES LIVRAISONS", 65, 17);
    let tBody = [];
    for (let index = 0; index < deliveries.length; index++) {
      const item = deliveries[index];
      let article = [
        { content: this.datePipe.transform(new Date(item[0]), 'dd/MM/yyyy'), styles: { valign: 'middle', halign: 'center' } },
        { content: item[1], styles: { valign: 'middle', halign: 'left' } },
        { content: item[2], styles: { valign: 'middle', halign: 'left' } },
        { content: item[3], styles: { valign: 'middle', halign: 'left' } },

      ];
      tBody.push(article);
    } 
    doc['autoTable']({
      head: [[
        { content: 'DATE' },
        { content: 'N° BL' },
        { content: 'CLIENT'},
        { content: 'DEPOT'},
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

