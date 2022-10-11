import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { AppParam } from 'src/app/_models/app-param.model';
import { Delivery } from 'src/app/_models/delivery.model';
import 'jspdf-autotable';
import { capitalize } from 'src/app/_utilities/string/capitalize';
import { NumberToLetter } from 'convertir-nombre-lettre';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SaleDeliveryService {

  createdBy: any;
  tvaRate = environment.tvaRate;

  constructor(
    private datePipe: DatePipe) { }
    

  getInvoiceDoc(appParam: AppParam, saleDelivery: Delivery, articles: any, invoiceType: string) {

    this.createdBy = saleDelivery["user"];  
    var doc = new jsPDF();
    var x = 10;
    var y =20;
    var date = new Date(saleDelivery['date']);
    var img = new Image();
    img.src =  "assets/images/code-barre.jpg";
    let customerOrder = saleDelivery.customerOrder 
    
    doc.setFontSize(10);
    doc.setFont("arial", "bold");
    doc.addImage(img, "JPEG", 15, 20, x + 35, y);
    doc.setFontSize(7);
    doc.text(this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss'), x + 160, y+2);

    doc.setFontSize(8);
    doc.text("FACTURE N°" , 15, y+30);
    doc.text(": " + saleDelivery.deliveryNoteNumber, x + 25, y+30);
    doc.text("DATE",  15, y+36);
    doc.setFontSize(9);
    doc.text(": " +this.datePipe.transform(date, 'dd/MM/yyyy HH:mm:ss'), x + 25, y+36);
    doc.setFontSize(8);
    doc.text("OP. SAISIE", 15, y+42);
    doc.text(": " + (this.createdBy.firstName+" "+ this.createdBy.lastName).toUpperCase() , x + 25, y+42);

    doc.text("CLIENT" , 100, y+30);
    doc.text(": " + saleDelivery["customer"]["tradeName"] , 120, y+30);
    doc.text("SUCCURSALE" , 100, y+36);
    doc.text(": " + ( customerOrder ? customerOrder["branchOffice"]["name"]: "")  , 120, y+36);
    doc.text("REGLEMENT",  100, y+42);
    doc.setFontSize(9);
    doc.text(": " + saleDelivery['paymentType'].toUpperCase(), 120, y+42);

    //table
    var tBody = [];
    for (let index = 0; index < articles.length; index++) {
      
      const element = articles[index];
      let cellBgColor = environment.docWhiteCellBgColor;
      
      if(index%2 != 0)  cellBgColor = environment.docStripedCellBgColor;

      let unitSalePrice = element["unitSalePrice"];
      let rowTotalHt = element["totalHt"];

      if(invoiceType== "withTva") {
        unitSalePrice = element["unitSalePrice"] / (1 + (this.tvaRate / 100));
        rowTotalHt = element["totalHt"] / (1 + (this.tvaRate / 100));
      }

      let article = [
        { content: element['article']['reference'], styles: { fillColor: cellBgColor }},
        { content: element['article']['name'], styles: { fillColor: cellBgColor }},
        { content: new Intl.NumberFormat('de-DE').format(unitSalePrice.toFixed()),  styles: { valign: 'middle', halign: 'center', fillColor: cellBgColor }},
        { content: new Intl.NumberFormat('de-DE').format(element["invoiceQty"]),  styles: { valign: 'middle', halign: 'center', fillColor: cellBgColor }},
        { content: new Intl.NumberFormat('de-DE').format(rowTotalHt.toFixed()),  styles: { valign: 'middle', halign: 'center', fillColor: cellBgColor }},

      ]; 
      tBody.push(article)
    }

    doc['autoTable']({
      head: [[
        { content: 'Reference'},
        { content: 'Designation'},
        { content: 'prix U. HT'},
        { content: 'Quantité' },
        { content: 'Montant Ht'},
      ]],
      body: tBody,
      theme: 'grid',
      headStyles: {fontSize:8, fillColor : [230, 230, 230], lineColor: [0, 0, 0], halign:'center' , textColor: [0, 0, 0], lineWidth: 0.25  },
      bodyStyles: {textColor: [0, 0, 0], lineColor: [0, 0, 0], lineWidth: 0.25, fontStyle: "bold", fontSize:9},
   
      startY: 68,
      styles: {font: "arial", fontSize: 9},
      didDrawPage: function (data) {

        var pageSize = doc.internal.pageSize
        var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
        doc.text("- Page " + data.pageNumber + " -", data.settings.margin.left + 80, pageHeight - 3)
      }
    })

    doc.setFontSize(10);
    doc.setFont("arial", "bold");
    doc.setLineWidth(0.25)
    let finalY = (doc as any).lastAutoTable.finalY;

    if (finalY >= 230) {
      doc.addPage();
      finalY = 10;
      var pageSize = doc.internal.pageSize
      var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
      doc = this.getInvoiceFoot(doc, finalY, saleDelivery, articles, invoiceType);
      doc.text("- Page " + (doc.internal.pages.length - 1) + " -", 10 + 80, pageHeight - 3)
    } else {

      doc = this.getInvoiceFoot(doc, finalY, saleDelivery, articles, invoiceType);

    }

    return doc;
  }

  getInvoiceFoot(doc: jsPDF, finalY: number, saleDelivery: Delivery, articles: any, invoiceType: string) {

    let totalCostHt = saleDelivery.totalCostHt;
    let totalAfterDiscount = saleDelivery["totalAfterDiscount"];
    
    
    let tvaValue = 0;
    if(invoiceType== "withTva") {
      totalCostHt = saleDelivery.totalCostHt / (1 + (this.tvaRate / 100));
      totalAfterDiscount = (totalCostHt - (saleDelivery["discountValue"] + saleDelivery.specialDiscount));
      tvaValue = saleDelivery["netToPaid"] - totalAfterDiscount;
    }
    
    doc.setFontSize(9);
    doc.setDrawColor(0);
    doc.rect(38, finalY + 1, 20, 5)
    doc.text("TOTAL COLIS :", 13, finalY + 5);
    doc.line(13, finalY + 6 , 36, finalY + 6)
    doc.text(saleDelivery.numberOfPackages.toString(), 40, finalY + 5);
    doc.text("TOTAL HT BRUTE  :", 60, finalY + 5);
    doc.text(new Intl.NumberFormat('de-DE').format(Number(totalCostHt.toFixed())), 94, finalY + 5);
    doc.setTextColor(255, 0, 0);
    doc.setFontSize(10);
    doc.rect(92, finalY + 1, 32, 6)
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.text("REMISE ",60, finalY + 12);
    doc.text(new Intl.NumberFormat('de-DE').format(saleDelivery["discountValue"]), 94, finalY + 12);
    doc.setTextColor(255, 0, 0);
    doc.setFontSize(10);
    doc.text(saleDelivery.discount + " % :", 75, finalY + 12);
    doc.rect(92, finalY + 8, 32, 6)
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    doc.text("REMISE SPECIALE :", 60, finalY + 19);
    doc.rect(92, finalY + 15, 32, 6)
    doc.setFontSize(10);
    doc.text(new Intl.NumberFormat('de-DE').format(saleDelivery.specialDiscount), 94, finalY + 19);
    doc.setFontSize(9);


    doc.text("TOTAL HT NET", 135, finalY + 5);
    doc.text(":", 162, finalY + 5);
    doc.text(new Intl.NumberFormat('de-DE').format(totalAfterDiscount.toFixed()), 165, finalY + 5);
    doc.rect(164, finalY + 1, 32, 6)

    doc.text("TOTAL TVA", 135, finalY + 12);
    doc.setTextColor(255, 0, 0);
    doc.text(saleDelivery['tva'] + " %", 155, finalY + 12);
    doc.setTextColor(0, 0, 0);
    doc.text(":", 162, finalY + 12);
    doc.text(new Intl.NumberFormat('de-DE').format(Number(tvaValue.toFixed())), 165, finalY + 12);
    doc.rect(164, finalY + 8, 32, 6)

    
    doc.text("NET A PAYER", 135, finalY + 19);
    doc.text(":", 162, finalY + 19);
    doc.setFillColor(230,230,230);
    doc.setDrawColor(0,0,0)
    doc.rect(164, finalY + 15, 32, 6, "FD")
    doc.text(new Intl.NumberFormat('de-DE').format(saleDelivery["netToPaid"]), 165, finalY + 19);

    doc.text("AVANCE", 135, finalY + 26);
    doc.text(":", 162, finalY + 26);
    doc.text(new Intl.NumberFormat('de-DE').format(saleDelivery["advance"]), 165, finalY + 26);
    doc.rect(164, finalY + 22, 32, 6)
    
    doc.setFillColor(230,230,230);
    doc.rect(135, finalY + 29, 27, 6, "F")
    doc.text("RESTE A PAYER", 135, finalY + 33);
    doc.text(":", 162, finalY + 33);
    doc.text(new Intl.NumberFormat('de-DE').format(saleDelivery["remainder"]), 165, finalY + 33);
    doc.rect(164, finalY + 29, 32, 6)

    doc.text("Arrêté la présente facture à la somme de (FCFA) :", 15, finalY + 40);
    doc.setFont("courier", "bolditalic");
    doc.text(capitalize(NumberToLetter(saleDelivery["netToPaid"].toFixed(0))), 15, finalY + 45)
    
    doc.text("CONDITION DE REGLEMENT :", 15, finalY + 60);

    doc.setFontSize(9);
    doc.setFont("arial", "Normal");
    doc.text("Espèce", 63, finalY + 55);
    doc.rect(65, finalY + 57, 6, 5);

    doc.text("Chèque", 76, finalY + 55);
    doc.rect(78, finalY + 57, 6, 5);

    doc.text("Virément", 89, finalY + 55);
    doc.rect(92, finalY + 57, 6, 5);

    doc.setFont("arial", "BOLD");
    doc.setFillColor(230, 230, 230);
    doc.rect(152, finalY + 42, 45, 5, "FD")
    doc.text("CACHET / SIGNATURE", 158, finalY + 46);
    doc.rect(152, finalY + 42, 45, 30)


    return doc;
   } 
}
