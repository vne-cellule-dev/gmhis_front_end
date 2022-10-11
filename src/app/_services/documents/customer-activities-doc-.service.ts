import { style } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { Customer } from 'src/app/_models/customer.model';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication.service';
import { CustomerOperationService } from '../customer-operation.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerActivitiesDocService {


  constructor(
    private datePipe: DatePipe,
    private authenticationService: AuthenticationService,
    private customerOperationService: CustomerOperationService
  ) { }
  getDoc(operations: any[], customer: Customer, date: any, activityType : String) {
    var doc = new jsPDF();

    let periodeStart = "--/--/--";
    let periodeEnd = "--/--/--";

    if (date) {
      periodeStart = this.datePipe.transform(new Date(date["start"]), 'dd/MM/yyyy');
      periodeEnd = this.datePipe.transform(new Date(date["end"]), 'dd/MM/yyyy');
    }

    let user = this.authenticationService.getUserFromLocalStorage()
    let currentUserFullName = user.firstName + " " + user.lastName;

    doc.rect(14, 10, 182, 30);
    doc.setDrawColor(0, 0, 0);
    doc.rect(70, 10, 70, 10);
    doc.setFont("arial", "bold");
    doc.setFontSize(12);
    doc.text('ACTIVITES CLIENT', 86, 17);
    doc.setFontSize(9);
    doc.text("Code Client :", 15, 27);
    doc.text(customer.customerNumber, 42, 27);
    doc.text("Nom Client  :", 15, 35);
    doc.setTextColor(255, 0, 0);
    doc.text(customer.tradeName.toUpperCase(), 42, 35);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.text(this.datePipe.transform(new Date(), 'dd/MM/yyyy'), 170, 15);
    doc.text("Période du suivie", 170, 25);
    doc.line(170, 26, 191, 26);
    doc.text("Du : " + periodeStart, 170, 32);
    doc.text("Au : " + periodeEnd, 170, 38);
    // doc.text("Imprimé par "+ currentUserFullName, 160, 45)

    var tBody = [];
    let items = [];
    let totalSale = 0;
    let totalEntry = 0;
    let totalAsset = 0;
    let initialBalance = 0;

    if (activityType != "findAllOperation") {
      items = operations["items"];
    } 
    else {
      
      let customerBalance = customer['customerAccount']["balance"];
      
      let op = this.customerOperationService.getAllOperationWithPreviousBalance(operations["items"], customerBalance);
      items = op[0];
      initialBalance = op[1];
 
    }

    let initialBalanceRow = [{ content: '--/--/----', styles: { valign: 'middle', halign: 'center' } }, { content: '...', styles: { valign: 'middle', halign: 'left' } }, { content: "Solde en fin de période", styles: { valign: 'middle', halign: 'left' } }, { content: '...', styles: { valign: 'middle', halign: 'right'}}, { content: "...", styles: { valign: 'middle', halign: 'right' } }, { content: "...", styles: { valign: 'middle', halign: 'right' } }, { content: (items.length != 0) ?  new Intl.NumberFormat('de-DE').format(initialBalance) : "", styles: { valign: 'middle', halign: 'right' } }];
    tBody.push(initialBalanceRow);

    for (let index = 0; index < items.length; index++) {

      const op = items[index];
      let cellBgColor = environment.docWhiteCellBgColor;
      if(index%2 != 0)  cellBgColor = environment.docStripedCellBgColor;

      let article = [
        { content: this.datePipe.transform(new Date(op[1]), 'dd/MM/yyyy'), styles: { valign: 'middle', halign: 'center' } }, //date
        { content: op[2], styles: { valign: 'middle', halign: 'left' } }, // vouchernumber
        { content: op[4] }, //libelle
        { content: new Intl.NumberFormat('de-DE').format(op[5]), styles: { valign: 'middle', halign: 'right' } }, //achat
        { content: new Intl.NumberFormat('de-DE').format(op[6]), styles: { valign: 'middle', halign: 'right' } }, //versement
        { content: new Intl.NumberFormat('de-DE').format(op[8]), styles: { valign: 'middle', halign: 'right' } }, //avoir
        { content: new Intl.NumberFormat('de-DE').format(op[10]), styles: { valign: 'middle', halign: 'right' } }, // solde precedent
      ];
      tBody.push(article);
      totalSale += op[5];
      totalEntry += op[6];
      totalAsset += op[8];
    }
    // let balance =  totalSale - (totalEntry + totalAsset);

    tBody.push([{ content: '', colSpan:2, styles: { lineWidth: 0 } }, { content: "Total", styles: { fillColor: [230, 230, 230] } }, { content: new Intl.NumberFormat('de-DE').format(totalSale) + ' FCFA', styles: { valign: 'middle', halign: 'right', fillColor: [230, 230, 230] } }, { content: new Intl.NumberFormat('de-DE').format(totalEntry) + ' FCFA', styles: { valign: 'middle', halign: 'right', fillColor: [230, 230, 230] } }, { content: new Intl.NumberFormat('de-DE').format(totalAsset) + ' FCFA', styles: { valign: 'middle', halign: 'right', fillColor: [230, 230, 230] } }, { content: "", styles: { lineWidth: 0 } }])

    doc['autoTable']({
      head: [[
        { content: 'DATE' },
        { content: 'N° DE BON' },
        { content: "LIBELE" },
        { content: 'ACHAT' },
        { content: 'REGLEMENT' },
        { content: 'AVOIR' },
        { content: 'CUMUL' },
      ]],
      body: tBody,
      theme: 'grid',
      headStyles: { fontSize: 8, fillColor: [230, 230, 230], lineColor: [0, 0, 0], halign: 'center', textColor: [0, 0, 0], lineWidth: 0.25, },
      bodyStyles: {textColor: [0, 0, 0],  lineColor: [0, 0, 0], lineWidth: 0.25, fontStyle: "bold", fontSize: 9 },
      startY: 42,
      styles: {font: "arial", fontSize: 9},
      didDrawPage: function (data) {
        doc.setFontSize(8)
        var pageSize = doc.internal.pageSize
        var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
        doc.text("- Page " + data.pageNumber + " -", data.settings.margin.left + 80, pageHeight - 3)
      }
    })

    let finalY = (doc as any).lastAutoTable.finalY;
    doc.setFontSize(10)

    doc.text("Solde :", 130, finalY + 10);
    doc.setDrawColor(0, 0, 0);
    doc.rect(145, finalY + 6, 50, 6);
    doc.text(new Intl.NumberFormat('de-DE').format(customer["customerAccount"]["balance"])+ " FCFA", 150, finalY + 10);
    doc.line(130, finalY + 11, 139, finalY + 11)

    //signature
    doc.text("signature client", 150, finalY + 20);
    doc.setDrawColor(0, 0, 0);
    doc.line(150, finalY + 21, 173, finalY + 21)
    doc.setFont("courier", "bolditalic");
    doc.text("Lu et approuvé ", 150, finalY + 50);
    return doc;
  }
}
