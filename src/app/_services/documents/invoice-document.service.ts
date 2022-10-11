import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { AppParam } from 'src/app/_models/app-param.model';
import { Invoice } from 'src/app/_models/invoice.model';
import { PageFooterService } from './page-footer.service';
import 'jspdf-autotable';
import { InvoiceService } from '../invoice.service';
import { environment } from 'src/environments/environment';
import { PageHeaderService } from './page-header.service';
import { NumberToLetter } from 'convertir-nombre-lettre';
import { capitalize } from 'src/app/_utilities/string/capitalize';
import { Customer } from 'src/app/_models/customer.model';
import { BranchOffice } from 'src/app/_models/branchOffice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceDocumentService {

  tvaPercentage: number;
  airsiPercentage: number;
  customer: Customer;
  branchOffice : BranchOffice;

  constructor(
    private datePipe: DatePipe,
    private pageHederService: PageHeaderService,
    private pageFooterService: PageFooterService) { }

  getInvoiceDoc(appParam: AppParam, invoice: Invoice, articles : any) {
   

  var doc = new jsPDF('p', 'mm', 'a4');   
  this.customer = invoice.customer;
  this.branchOffice = invoice["branchOffice"];
    doc.line(195, 75, 15, 75)
    doc.setFontSize(9)
    doc.setFont("arial", "bold");
    doc.text("Abidan le :"+ this.datePipe.transform(new Date(), 'dd/MM/yyyy'), 162, 80);
    
    doc.text("CLIENT:  ", 15, 80);
    doc.text(": " + this.customer.corporateName.toUpperCase(), 45, 80);
    doc.line(15, 81, 30, 81)
    doc.text("SUCCURSALE", 15, 86);
    doc.text(": " + ((this.branchOffice != null) ? this.branchOffice?.name : ""), 45, 86);
    doc.text("TEL" , 15, 92);
    doc.text(": " + ((this.branchOffice != null) ? this.branchOffice?.interlocutorPhone : ""), 45, 92);
    doc.text("N° CC" , 15, 98)
    doc.text(": " + invoice.taxpayerAccount, 45, 98)

    doc.text("RF :" , 162, 92);
    // doc.text(": " + this.branchOffice ? invoice["branchOffice"] : '', 45, 92);
    doc.text("BC N°" , 162, 98)
    doc.text(": " + invoice.customerOrderNumber, 45, 98)

    //table
    var tBody = [];

    for (let index = 0; index < articles.length; index++) {
      const element = articles[index];   
      let cellBgColor = environment.docWhiteCellBgColor;
      
      if(index%2 != 0)  cellBgColor = environment.docStripedCellBgColor;
      let totalHt = element["invoicedUnitPrice"] * element["invoicedQty"];
      let article = [
        { content: element["invoicedQty"], styles: { valign: 'middle', halign: 'center', fillColor: cellBgColor } },
        { content: element['article']['reference'], styles: { valign: 'middle', fillColor: cellBgColor } },
        { content: element['article']['name'], styles: { valign: 'middle', halign: 'left', fillColor: cellBgColor } },
        { content: new Intl.NumberFormat('de-DE').format(element["invoicedUnitPrice"].toFixed()), styles: { valign: 'middle', halign: 'center', fillColor: cellBgColor } },
        { content: new Intl.NumberFormat('de-DE').format(Number(totalHt.toFixed())) , styles: { valign: 'middle', halign: 'center', fillColor: cellBgColor } },

      ];
      tBody.push(article);
    }

    doc['autoTable']({
      head: [[
        { content: 'Quantité'},
        { content: 'Reference'},
        { content: 'Designation'},
        { content: 'prix U. HT'},
        { content: 'Montant Ht'},
      ]],
      body: tBody,
      theme: 'grid',
      headStyles: {fontSize:8, fillColor : [230, 230, 230], lineColor: [0, 0, 0], halign:'center' , textColor: [0, 0, 0], lineWidth: 0.25  },
      bodyStyles: {textColor: [0, 0, 0], lineColor: [0, 0, 0], lineWidth: 0.25, fontStyle: "bold", fontSize:9},
      startY: 100,
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

    if (finalY >= 240) {
      doc.addPage();
      finalY = 10;

      doc = this.getInvoiceFoot(doc, finalY, invoice, articles);

      //page  footer
      doc.setTextColor(150)
      doc.setFontSize(8);
      doc.setLineWidth(0.25)
      var pageSize = doc.internal.pageSize
      var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
      var splitFooter = doc.splitTextToSize(appParam.footPage, 180);
      doc.line(195, pageHeight - 15, 10, pageHeight - 15)
      doc.text(splitFooter, 10, pageHeight - 12);
      doc.setTextColor(0, 26, 77);
      doc.text("- Page " + (doc.internal.pages.length - 1) + " -", 10 + 80, pageHeight - 3)
    } else {

      doc = this.getInvoiceFoot(doc, finalY, invoice, articles);

    }

    return doc;
  }

  getInvoiceFoot(doc: jsPDF, finalY: number, invoice: Invoice, articles: any) {
    doc.setFillColor(230, 230, 230);
    doc.setDrawColor(0,0,0);
    doc.rect(15, finalY + 1, 55, 30)
    doc.rect(15, finalY + 1, 55, 5, "FD")
    doc.text("La comptabilité ", 30, finalY + 5);

    doc.setFontSize(8);
    doc.text("TOTAL HT      :", 143, finalY + 5);
    doc.rect(164, finalY + 1, 32, 6)
    doc.setFontSize(10);
    doc.text(new Intl.NumberFormat('de-DE').format( Number(invoice.totalHt.toFixed())), 166, finalY + 5);

    doc.setFontSize(8);
    doc.text("TVA ", 143, finalY + 12);
    doc.setTextColor(255, 0, 0);
    doc.text(environment.tvaRate + "%", 152, finalY + 12);
    doc.text(":", 162, finalY + 12);
    doc.setTextColor(0, 0, 0);
    doc.rect(164, finalY + 8, 32, 6)
    doc.setFontSize(10);
    doc.text(new Intl.NumberFormat('de-DE').format( Number(invoice.tvaValue.toFixed())), 166, finalY + 12);
    doc.setFontSize(8);
    doc.text("AIRSI ", 143, finalY + 19);
    doc.setTextColor(255, 0, 0);
    doc.text(environment.airsiRate + "%", 154, finalY + 19);
    doc.text(":", 162, finalY + 19);
    doc.setTextColor(0, 0, 0);
    doc.rect(164, finalY + 15, 32, 6)
    doc.setFontSize(10);
    doc.text(new Intl.NumberFormat('de-DE').format(Number(invoice.airsiValue.toFixed())), 166, finalY + 19);
    doc.setDrawColor(0);
    doc.setFillColor(230, 230, 230);
    doc.rect(164, finalY + 22, 32, 6, "FD");
    doc.setFontSize(8);
    doc.text("TOTAL TTC   :", 143, finalY + 26);
    doc.setFontSize(10);
    doc.text(new Intl.NumberFormat('de-DE').format(Number(invoice.totalTtc.toFixed())), 166, finalY + 26);

    doc.text("Arrêté la présente facture à la somme de (FCFA) :", 15, finalY + 40);
    doc.setFont("courier", "bolditalic");
    doc.text(capitalize(NumberToLetter(invoice.totalTtc.toFixed(0))), 15, finalY + 45)
    doc.setFont("arial", "normale");

    doc.setFont("arial", "BOLD");
    doc.setFillColor(230, 230, 230);
    doc.rect(152, finalY + 42, 45, 5, "FD")
    doc.text("N° de Bon de livraison", 158, finalY + 46);
    doc.rect(152, finalY + 42, 45, 30)

    let bls = [];
    articles.forEach((element, key) => {
      let bl = element["articleSold"]["saleDelivery"]["deliveryNoteNumber"];
      if(!bls.includes(bl)) bls.push(bl);
    });

    bls.forEach((element, key) => {
      doc.text("- " + element, 165, finalY + 46 + ((key + 1) * 5));
    })

    return doc;

  }


  
}
