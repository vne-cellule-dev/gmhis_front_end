import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Transfert } from 'src/app/_models/transfert.model';
import { TransfertService } from '../transfert.service';
import { DatePipe } from '@angular/common';
import { AppParam } from 'src/app/_models/app-param.model';
import { PageFooterService } from './page-footer.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransfertDeliveryNoteService {

  constructor(
    private transfertService : TransfertService,
    private datePipe: DatePipe,
    private pageFooterService : PageFooterService
  ) {

   }

  getDeliveryNote(transfer: Transfert, articleTransfered : any[], appParam: AppParam, driver :string, vehicle : string){
          
    var doc = new jsPDF();
    var x = 10;
    var y =20;
    var date = new Date(transfer[1]);
    var img = new Image();
    img.src =  "assets/images/code-barre.jpg";
    doc.setFontSize(8);
    doc.setFont("arial", "bold");
    doc.text("BON DE TRANSFERT N° : " + transfer[2], x + 104, y);
    doc.text("............................................................................................", 114, y+3);
    doc.addImage(img, "JPEG", 15, 20, x + 35, y);
    doc.text("Date : " + this.datePipe.transform(date, 'dd/MM/yyyy'), x + 5, y + 24);
    doc.rect(115, 27, 80, 19)
    doc.text("SOURCE : " + transfer[3].toUpperCase(), x + 107, y + 16);
    doc.text("DESTINATION : " + transfer[4].toUpperCase(), x + 107, y + 23);
    doc.text("DEPOTS", x + 133, y + 11);
    doc.setFontSize(8);
    var tBody =  [];
    articleTransfered.forEach((x, index) => {
      
      let cellBgColor = environment.docWhiteCellBgColor;
      if(index%2 != 0)  cellBgColor = environment.docStripedCellBgColor;

        let article = [
          {content:x['article']['reference'], styles: { valign: 'middle',  fillColor: cellBgColor}},
          {content: x['article']['name'], styles: { fillColor: cellBgColor }}, 
          {content: new Intl.NumberFormat('de-DE').format(x["qtyTransferred"]), styles: { valign: 'middle', halign:'center',  fillColor: cellBgColor}}];
        tBody.push(article);
    })
    
    doc['autoTable']({
      head: [[
        {content:'REFERENCE'},
        {content:'DESIGNATION'},
        {content:'QTE'}
      ]],
      body: tBody,
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
    let numberOfPackages = articleTransfered.map(x=>x.qtyTransferred).reduce(function(a, b){ return a + b; });

    if(transfer[10] != null && transfer[10] != "") {
      doc = this.pageFooterService.get(doc, appParam, finalY,numberOfPackages, driver, vehicle, transfer[10]);
    } else {
      doc = this.pageFooterService.get(doc, appParam, finalY,numberOfPackages, driver, vehicle, "");
    }
   
    return doc;
  }
}
