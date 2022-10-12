import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DatePipe } from '@angular/common';
import { Expense } from 'src/app/_models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseDocumentService {

  constructor(
    private datePipe: DatePipe
  ) { }

  public getInvoiceList(response : any[]){

    let expenses = response["expense"];
    let totalExpense = response["totalExpense"] != null  ? new Intl.NumberFormat('de-DE').format(response["totalExpense"])  : 0;
    var doc = new jsPDF('l', 'mm', 'a4');
    doc.setDrawColor(0);
    doc.setFillColor(230, 230, 230);
    doc.rect(14, 10, 270, 10, "FD")
    
    doc.setFont("arial", "bold");
    doc.setFontSize(9)
    doc.text("Imprimé le   : " + this.datePipe.transform(new Date(), 'dd/MM/yyyy'), 250, 7)
    doc.setFontSize(16)
    doc.text("HISTORIQUE DES DEPENSES", 110, 17);
    doc.setFontSize(11)
    doc.text("Total depense   : " + totalExpense + " FCFA", 15, 27)

    let tBody = [];

    for (let index = 0; index < expenses.length; index++) {
      const item = expenses[index];
      let article = [
        { content: this.datePipe.transform(new Date(item.dateExpense), 'dd/MM/yyyy'), styles: { valign: 'middle', halign: 'center' } },
        { content: item.depot.id == 0 ? "SOCIETE BIBLOS" : item.depot.name, styles: { valign: 'middle', halign: 'left' } },
        { content: new Intl.NumberFormat('de-DE').format(item.amount), styles: { valign: 'middle', halign: 'right' } },
        { content: item.bank? item.bank.name : "", styles: { valign: 'middle', halign: 'left' } },
        { content: item.financialCharge?.name, styles: { valign: 'middle', halign: 'left' } },
        { content: item.paymentType, styles: { valign: 'middle', halign: 'left' } },
        { content: `${item.madeBy.firstName} ${item.madeBy.lastName}`, styles: { valign: 'middle', halign: 'left' } },
        { content:`${item.createdBy.firstName} ${item.createdBy.lastName}` , styles: { valign: 'middle', halign: 'left' } },
      ];
      tBody.push(article);
    }

    doc['autoTable']({
      head: [[
        { content: 'DATE' },
        { content: 'DEPOT' },
        { content: 'MONTANT'},
        { content: 'BANQUE'},
        { content: 'CHARGE'},
        { content: 'TYPE DE PAY.'},
        { content: 'EFFECTUE PAR'},
        { content: 'SAISI PAR.'},
      ]],
      body: tBody,
      theme: 'grid',
      headStyles: {fontSize:8, fillColor : [230, 230, 230], lineColor: [0, 0, 0], halign:'center' , textColor: [0, 0, 0], lineWidth: 0.25,  },
      bodyStyles: {textColor: [0, 0, 0], lineColor: [0, 0, 0], lineWidth: 0.25, fontStyle: "bold", fontSize:9},
      startY: 30,
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
