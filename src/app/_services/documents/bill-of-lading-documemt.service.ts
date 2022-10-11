import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { BillOfLading } from 'src/app/_models/billOfLading.model';

@Injectable({
  providedIn: 'root'
})
export class BillOfLadingDocumemtService {

  constructor(
    private datePipe: DatePipe
  ) { }
  public getArticleStockDoc(packingList : BillOfLading[]){        
    var doc = new jsPDF('p', 'mm', 'a4');
    doc.setDrawColor(0);
    doc.setFillColor(230, 230, 230);
    doc.rect(14, 10, 182, 10, "FD")
    
    doc.setFont("arial", "bold");
    doc.setFontSize(9)
    doc.text("Imprimé le   : " + this.datePipe.transform(new Date(), 'dd/MM/yyyy'), 160, 7)
    doc.setFontSize(16)
    doc.text("PACKING LISTS", 84, 17);

    let tBody = [];

    for (let index = 0; index < packingList.length; index++) {
      const item = packingList[index];
      let state : string = "";
      if (item["nbContainerReceived"] <= 0) {
        state = "En attente";
      }else if(item["nbContainerReceived"] > 0 && item["nbContainerReceived"] < item["nbContainerLoaded"]){
        state = "Partiellement reçu";
      }
      else if(item["nbContainerReceived"] >= item["nbContainerLoaded"]){
        state = "Terminé";
      }

      let article = [
        { content: item.billNumber, styles: { valign: 'middle' } },
        { content: item["supplierOrderNumber"], styles: { valign: 'middle' } },
        { content: item["supplier"]["tradeName"], styles: { valign: 'middle' } },
        { content: this.datePipe.transform(item.forcastDate, 'dd/MM/yyyy') , styles: { valign: 'middle', halign: 'center' } },
        { content: item.declarationNumber , styles: { valign: 'middle', halign: 'center' } },
        { content: state , styles: { valign: 'middle', halign: 'center' } },

        // { content: new Intl.NumberFormat('de-DE').format(item.costPrice), styles: { valign: 'middle', halign: 'center' } },
        // { content: new Intl.NumberFormat('de-DE').format(item.qty), styles: { valign: 'middle', halign: 'center' } },
        // { content: new Intl.NumberFormat('de-DE').format(item.salesPrice), styles: { valign: 'middle', halign: 'center' } },

      ];
      tBody.push(article);
    }

    doc['autoTable']({
      head: [[
        { content: 'N° BL' },
        { content: 'N° COMMANDE	' },
        { content: 'FOURNISSEUR' },
        { content: 'RÉCEPTION PRÉVU LE'},
        { content: 'DÉCLARATION'},
        { content: 'ETAT'}


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
