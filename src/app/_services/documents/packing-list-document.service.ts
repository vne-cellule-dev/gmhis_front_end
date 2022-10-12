import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PackingListDocumentService {

  constructor(
    private datePipe: DatePipe
  ) { }

  getDoc(data : any[]) {

    let billOfLading = data[0]["billOfLading"];
    let blNumber = billOfLading ?  billOfLading["billNumber"]:"";
    let supplier = billOfLading ? billOfLading["supplier"]["tradeName"]:"";
    let declaration = billOfLading ? billOfLading["declarationNumber"]:"";
    let voyageNumber = billOfLading ? billOfLading["voyageNumber"]:"";

    var doc = new jsPDF('p', 'mm', 'a4');
    doc.setDrawColor(0);
    doc.setFillColor(230, 230, 230);
    doc.rect(14, 10, 182, 10, "FD")
    
    doc.setFont("arial", "bold");
    doc.setFontSize(9)
    doc.text("Imprimé le   : " + this.datePipe.transform(new Date(), 'dd/MM/yyyy'), 160, 7)
    doc.setFontSize(16)
    doc.text("PACKING LIST", 100, 17);
    doc.setFontSize(9)
    doc.text("BILL OF LADING : " +blNumber , 15, 25);
    doc.text("FOURNISSEUR : " +supplier, 15, 31);
    doc.text("DECLARATION : " + declaration, 130, 25);
    doc.text("N° DE VOYAGE : " + voyageNumber, 130, 31);
    let tBody = [];

    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      
      let containers = [
        { content: index + 1, styles: { valign: 'middle'}},
        { content: element["containerNumber"], styles: { valign: 'middle'} }, 
        { content: element["article"]["reference"], styles: { valign: 'middle'} }, 
        { content:  new Intl.NumberFormat('de-DE').format(element["numberOfBoxes"]), styles: { valign: 'middle', halign: 'center' } }, 
        { content:  new Intl.NumberFormat('de-DE').format(element["numberOfPieces"]),  styles: { valign: 'middle', halign: 'center' }  }, 
     ];
      tBody.push(containers);
    }
    
    
    doc['autoTable']({
      head: [[
        { content :"N°"},
        { content: 'CONTENEUR' },
        { content: 'REFERENCE' },
        { content: 'NBRE DE CARTONS'},
        { content: 'NBRE DE PIECES'},
      ]],
      body: tBody,
      theme: 'grid',
      headStyles: {fontSize:8, fillColor : [230, 230, 230], lineColor: [0, 0, 0], halign:'center' , textColor: [0, 0, 0], lineWidth: 0.25,  },
      bodyStyles: {textColor: [0, 0, 0], lineColor: [0, 0, 0], lineWidth: 0.25, fontStyle: "bold", fontSize:9},
      startY: 35,
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
