import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SupplierOrderStockDocumentService {

  constructor(
    private datePipe: DatePipe
  ) { }

  public supplierOrderStock(orderStock : any[]){  
    var doc = new jsPDF('p', 'mm', 'a4');
    doc.setDrawColor(0);
    doc.setFillColor(230, 230, 230);
    doc.rect(14, 10, 182, 10, "FD")
    
    doc.setFont("arial", "bold");
    doc.setFontSize(9)
    doc.text("Imprimé le   : " + this.datePipe.transform(new Date(), 'dd/MM/yyyy'), 160, 7)
    doc.setFontSize(16)
    doc.text("HISTORIQUE DES STOCK COMMANDE", 50, 17);

    let tBody = [];

    for (let index = 0; index < orderStock.length; index++) {
      const element = orderStock[index];
      let article = [
        { content: index + 1, styles: { valign: 'middle'}},
        { content: element[3], styles: { valign: 'middle'} }, //reference
        { content:  new Intl.NumberFormat('de-DE').format(element[4]),  styles: { valign: 'middle', halign: 'center' }  }, //sty in stock
        { content:  new Intl.NumberFormat('de-DE').format(element[6] ? element[6] : 0), styles: { valign: 'middle', halign: 'center' } }, //qty ordered
        { content:  new Intl.NumberFormat('de-DE').format(element[7] ? element[7] : 0),  styles: { valign: 'middle', halign: 'center' }  }, //loaded
        // { content:  new Intl.NumberFormat('de-DE').format(element[element[8] ? element[8] : 0]),  styles: { valign: 'middle', halign: 'center' }  }, //loaded
        { content:  new Intl.NumberFormat('de-DE').format((element[6]  - element[7]) > 0 ? element[6]  - element[7] : 0 ), styles: { valign: 'middle', halign: 'center' } }, //remainin qty
        { content:  new Intl.NumberFormat('de-DE').format(element[4] + element[7]),  styles: { valign: 'middle', halign: 'center' }  }, //total

      ];
      tBody.push(article);
    }
    
    
    doc['autoTable']({
      head: [[
        { content :"N°"},
        { content: 'REFERENCE' },
        { content: 'QTE EN STOCK' },
        { content: 'CMD EN COURS' },
        { content: 'QTE CHARGE'},
        // { content: 'QTE RECU'},
        { content: 'QTE EN USINE'},
        { content: 'QTE EN TOTAL'},
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

  getDetailByArticle(loadings: any []) {

    var doc = new jsPDF('p', 'mm', 'a4');
    doc.setDrawColor(0);
    doc.setFillColor(230, 230, 230);
    doc.rect(14, 10, 182, 10, "FD")
    
    doc.setFont("arial", "bold");
    doc.setFontSize(9)
    doc.text("Imprimé le   : " + this.datePipe.transform(new Date(), 'dd/MM/yyyy'), 160, 7)
    doc.setFontSize(16)
    doc.text("Details des chargements par article", 50, 17);

    let tBody = [];

    for (let index = 0; index < loadings.length; index++) {
      const element = loadings[index];
      let containers = [
        { content: index + 1, styles: { valign: 'middle'}},
        { content: element["billOfLading"]["billNumber"],  styles: { valign: 'middle', halign: 'center' }  }, 
        { content: element["containerNumber"], styles: { valign: 'middle'} }, 
        { content: element["article"]["reference"], styles: { valign: 'middle'} }, 
        { content:  new Intl.NumberFormat('de-DE').format(element["numberOfBoxes"]), styles: { valign: 'middle', halign: 'center' } }, 
        { content:  new Intl.NumberFormat('de-DE').format(element["numberOfPieces"]),  styles: { valign: 'middle', halign: 'center' }  }, 
        { content:  element["billOfLading"]["deliveryDate"] ? this.datePipe.transform(new Date(element["billOfLading"]["deliveryDate"]), 'dd/MM/yyyy'): "",  styles: { valign: 'middle', halign: 'center' }  },
        { content:  element["billOfLading"]["forcastDate"] ? this.datePipe.transform(new Date(element["billOfLading"]["forcastDate"]), 'dd/MM/yyyy') : "",  styles: { valign: 'middle', halign: 'center' }  },
       ];
      tBody.push(containers);
    }
    
    doc['autoTable']({
      head: [[
        { content :"N°"},
        { content: 'BL' },
        { content: 'Conteneur' },
        { content: 'reference' },
        { content: 'Nbre de cartons'},
        { content: 'Nbre de peices'},
        { content: 'Charg. prevu le'},
        { content: 'Arrivé prevu le'},
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
