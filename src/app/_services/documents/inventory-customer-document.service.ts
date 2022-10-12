import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { InventoryCustomer } from 'src/app/_models/inventoryCustomer.model';
@Injectable({
  providedIn: 'root'
})
export class InventoryCustomerDocumentService {

  constructor(
    private datePipe: DatePipe
  ) { }

  public getJInventoryCustomerDetails(inventoryCustomer : InventoryCustomer, articles : any){ 
    var doc = new jsPDF('l', 'mm', 'a4');
    doc.setDrawColor(0);
    doc.setFillColor(230, 230, 230);
    doc.rect(14, 10, 270, 10, "FD")
    doc.setFontSize(9)
    doc.setFont("arial", "bold");
    doc.text("Imprimé le   : " + this.datePipe.transform(new Date(), 'dd/MM/yyyy'), 200, 7)
    doc.setFontSize(16)
    doc.text("DETAIL INVENTAIRE CLIENT", 100, 17);
    doc.setFontSize(9);
    doc.text("CLIENT : " + inventoryCustomer.customer["tradeName"], 15, 26);
    doc.text("CATEGORIE CLIENT : " + inventoryCustomer.customer["customerFamily"]["name"], 15, 32);

    doc.text("Date : " + this.datePipe.transform(inventoryCustomer["dateInventory"], 'dd/MM/yyyy'), 15, 38);
    doc.text("ARTICLES INVENTORIES : " +  new Intl.NumberFormat('de-DE').format(inventoryCustomer.numberOfPackage), 15, 44);
   
    let tBody = [];

    let stockValue = 0;
    for (let index = 0; index < articles.length; index++) {
      const item = articles[index];
      let article = [
        { content: item[2], styles: { valign: 'middle', halign: 'center' } },
        { content: item[3], styles: { valign: 'middle', halign: 'left' } },
        { content: new Intl.NumberFormat('de-DE').format(item[4]), styles: { valign: 'middle', halign: 'center' } },
        { content: new Intl.NumberFormat('de-DE').format(item[5]), styles: { valign: 'middle', halign: 'center' } },
        { content: new Intl.NumberFormat('de-DE').format(item[6]), styles: { valign: 'middle', halign: 'center' } }
      ];
      tBody.push(article);
      stockValue += item[6];
    }

    let balance =  inventoryCustomer.customer['customerAccount']["balance"];
    let difference = balance - stockValue;
    

    doc.text("VALEUR DU STOCK :    " + new Intl.NumberFormat('de-DE').format(stockValue)+ " "+"FCFA", 200, 26);
    doc.text("SOLDE CLIENT:     " + new Intl.NumberFormat('de-DE').format(balance)+ " "+"FCFA", 200, 32);
    doc.text("DIFFERENCE :     "  +  new Intl.NumberFormat('de-DE').format(difference) +" "+"FCFA", 200, 38);

    doc['autoTable']({
      head: [[
        { content: 'REFERENCE' },
        { content: 'DESIGNATION' },
        { content: 'STOCK COMPTE' },
        { content: 'PRIX UNIT. (FCFA)'},
        { content: 'VALEUR STOCK (FCFA)'}
      ]],
      body: tBody,
      theme: 'grid',
      headStyles: {fontSize:8, fillColor : [230, 230, 230], lineColor: [0, 0, 0], halign:'center' , textColor: [0, 0, 0], lineWidth: 0.25,  },
      bodyStyles: {textColor: [0, 0, 0], lineColor: [0, 0, 0], lineWidth: 0.25, fontStyle: "bold", fontSize:9},
      startY: 49,
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
