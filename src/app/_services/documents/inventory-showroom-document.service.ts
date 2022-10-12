import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Inventory } from 'src/app/_models/inventory.model';
@Injectable({
  providedIn: 'root'
})
export class InventoryShowroomDocumentService {

  
  
  constructor(
    private datePipe: DatePipe
  ) { }

  public getJInventoryShowroomDetails(inventory : Inventory,  inventoriedArticles: any[]){
    var doc = new jsPDF('l', 'mm', 'a4');
    doc.setDrawColor(0);
    doc.setFillColor(230, 230, 230);
    doc.rect(14, 10, 270, 10, "FD")
    doc.setFont("arial", "bold");
    doc.setFontSize(16)
    doc.text("DETAIL INVENTAIRE SHOWROOM", 100, 17);
    doc.setFontSize(10)
    doc.text("EFFECTUE LE  :   " +this.datePipe.transform(inventory["inventoryDate"], 'dd/MM/yyyy'), 15, 26) ;
    doc.text("DEPOT :   " + inventory.depot["name"], 15, 32);
    doc.text("VALEUR STOCK MACHINE :   " + new Intl.NumberFormat('de-DE').format(inventory["depotStockValue"])+" F", 15, 38);
    doc.text("VALEUR STOCK NON INVENTORIE :   " + new Intl.NumberFormat('de-DE').format(inventory["nonInventoryStockValue"])+" F", 15, 44);
    doc.text("ARTICLES INVENTORIES :     " + new Intl.NumberFormat('de-DE').format(inventory.numberOfPackage), 220, 26);
    doc.text("ARTICLES EN STOCK :     " + new Intl.NumberFormat('de-DE').format(inventory["depotPackages"]), 220, 32);
    doc.text("ARTICLES ECART :     " +  new Intl.NumberFormat('de-DE').format(inventory["depotPackages"] - inventory.numberOfPackage)  , 220, 38);

    let tBody = [];
    let stockValue = 0;
    let totalEcart = 0;
    let savPackages = 0;
    let packagesDifference = 0;
    for (let index = 0; index < inventoriedArticles.length; index++) {
      const element = inventoriedArticles[index];
      let rowEcart = element[8]  * element[7];
      totalEcart = totalEcart + (rowEcart);
      let article = [
        { content: element[3], styles: { valign: 'middle' } }, //reference
        { content: element[4], styles: { valign: 'middle', halign: 'left'} }, //name
        { content: new Intl.NumberFormat('de-DE').format(element[5]), styles: { valign: 'middle', halign: 'center' } }, //stock machine
        { content: new Intl.NumberFormat('de-DE').format(element[6]), styles: { valign: 'middle', halign: 'center' } }, //stock compté
        { content: new Intl.NumberFormat('de-DE').format(element[11]), styles: { valign: 'middle', halign: 'center' } }, //stock sav
        { content: new Intl.NumberFormat('de-DE').format(element[8]), styles: { valign: 'middle', halign: 'center' } }, //ecart
        { content: new Intl.NumberFormat('de-DE').format(element[7]) + " "+"F", styles: { valign: 'middle', halign: 'right' } }, //prix de vente unitaite
        { content: new Intl.NumberFormat('de-DE').format(element[9]) + " "+"F", styles: { valign: 'middle', halign: 'right' } }, //valeur du stock
        { content: new Intl.NumberFormat('de-DE').format(rowEcart)+ " "+"F", styles: { valign: 'middle', halign: 'right' } }, //valeur ecart
      ];
      tBody.push(article);
      stockValue += (element[6] + element[11]) * element[7];
      savPackages += element[11];
      packagesDifference += element[8];
    }

    tBody.push([
      {content: ""},{content: "TOTAL", styles: { valign: 'middle', halign: 'right' }},
      {content: inventory["depotPackages"], styles: { valign: 'middle', halign: 'center' }},
      {content: inventory["numberOfPackage"], styles: { valign: 'middle', halign: 'center' }},
      {content: "", styles: { valign: 'middle', halign: 'center' }},
      {content: "", styles: { valign: 'middle', halign: 'center' }},
      {content: "", styles: { valign: 'middle', halign: 'center' }},
      {content: new Intl.NumberFormat('de-DE').format(stockValue)+ "F", styles: { valign: 'middle', halign: 'right' } },
      {content: new Intl.NumberFormat('de-DE').format(totalEcart)+ "F", styles: { valign: 'middle', halign: 'right' }  }])

    doc['autoTable']({
      head: [[
        { content: 'REFERENCE' },
        { content: 'DESIGNATION' },
        { content: 'STOCK MACHINE' },
        { content: 'STOCK COMPTE'},
        { content: 'STOCK SAV'},
        { content: 'ECART'},
        { content: 'PRIX U VENTE'},
        { content: 'VAL. STOCK VENTE'},
        { content: 'VALEUR ECART'},
      ]],
      body: tBody,
      theme: 'grid',
      headStyles: {fontSize:8, fillColor : [230, 230, 230], lineColor: [0, 0, 0], halign:'center' , textColor: [0, 0, 0], lineWidth: 0.25,  },
      bodyStyles: {textColor: [0, 0, 0], lineColor: [0, 0, 0], lineWidth: 0.25, fontStyle: "bold", fontSize:9},
      startY: 54,
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
