import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { Customer } from 'src/app/_models/customer.model';
import { Entry } from 'src/app/_models/entry.model';
import { Fundraising } from 'src/app/_models/fundraising.model';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class CustomerCashRegisterEntryActivityService {

  EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  EXCEL_EXTENSION = '.xlsx';

  constructor(
    private datePipe: DatePipe,
    private authenticationService: AuthenticationService
  ) { }

  getDoc(fundraisings: Fundraising[], customer: Customer, date: string) {
    // Use http://dataurl.net/#dataurlmaker
    var doc = new jsPDF(("landscape"));

    let periodeStart = "--/--/--";
    let periodeEnd = "--/--/--";

    if (date) {
      let periode = date.split(",");
      periodeStart = this.datePipe.transform(new Date(periode[0]), 'dd/MM/yyyy');
      periodeEnd = this.datePipe.transform(new Date(periode[1]), 'dd/MM/yyyy');
    }


    let user = this.authenticationService.getUserFromLocalStorage()
    let currentUserFullName = user.firstName + " " + user.lastName;

    doc.rect(14, 10, 270, 25);
    doc.setDrawColor(0, 0, 0);
    doc.setFillColor(230, 230, 230);
    doc.rect(14, 10, 80, 10, "FD");
    doc.setFont("arial", "bold");
    doc.setFontSize(12);
    doc.text('INVENTAIRE DES REGLEMENTS', 17, 17)
    doc.setTextColor(255, 0, 0)
    doc.text(customer.corporateName, 17, 30)
    doc.rect(120, 20, 72, 15);
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(10);
    doc.text("BILAN GENERAL", 122, 25)
    doc.text("Période du " + periodeStart + " au " + periodeEnd, 122, 32)
    doc.setDrawColor(0, 0, 0);
    doc.text('En date du ' + this.datePipe.transform(new Date(), 'dd/MM/yyyy'), 230, 15)
    doc.text("Imprimé par " + currentUserFullName, 230, 21)

    var tBody = [];

    let total = 0;

    for (let index = 0; index < fundraisings.length; index++) {

      const entry = fundraisings[index];
      let cellBgColor = environment.docWhiteCellBgColor;
      
      if(index%2 != 0)  cellBgColor = environment.docStripedCellBgColor;

      let article = [
          { content: this.datePipe.transform(new Date(entry['collectionDate']), 'dd/MM/yyyy'), styles: { valign: 'middle', halign: 'center'}},
          { content: entry["cashRegisterNumber"], styles: { valign: 'middle', halign: 'center'} },
          { content: new Intl.NumberFormat('de-DE').format(entry.amount) + " FCFA", styles: { valign: 'middle', halign: 'right' }},
          { content: entry.observation, styles: { valign: 'middle'}},
      ];
        tBody.push(article);

        total += entry.amount;
      }

    tBody.push([{ content: "TOTAL:", colSpan: 2, styles: { halign: 'right', lineWidth: 0.5, fillColor: [230, 230, 230] } }, { content: new Intl.NumberFormat('de-DE').format(total) + " FCFA", styles: { valign: 'middle', halign: 'right', fillColor: [230, 230, 230] } }])
   
    doc['autoTable']({
      head: [[
        { content: 'DATE' },
        { content: 'N° BC' },
        { content: 'MONTANT' },
        { content: 'COMMENTAIRE' },
      ]],
      body: tBody,
      theme: 'grid',
      headStyles: { fontSize: 8, fillColor: [230, 230, 230], lineColor: [0, 0, 0], halign: 'center', textColor: [0, 0, 0], lineWidth: 0.25, },
      bodyStyles: {textColor: [0, 0, 0],  lineColor: [0, 0, 0], lineWidth: 0.25, fontStyle: "bold", fontSize: 9 },
      startY: 38,
      styles: {font: "arial", fontSize: 9},
      tableLineColor: 0,
      didDrawPage: function (data) {

        doc.setFontSize(8)
        var pageSize = doc.internal.pageSize
        var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
        doc.text("- Page " + data.pageNumber + " -", data.settings.margin.left + 80, pageHeight - 3)
      }
    })

    let finalY = (doc as any).lastAutoTable.finalY;
    doc.setFontSize(10)
    //signature
    doc.text("signature client", 250, finalY + 10);
    doc.setDrawColor(0, 0, 0);
    doc.line(250, finalY + 11, 273, finalY + 11)
    doc.setFont("courier", "bolditalic");
    doc.text("Lu et approuvé ", 250, finalY + 50);

    return doc;
  }

  getCsvDoc(fundraisings: Fundraising[], customer: Customer, date: string) {
    var Heading = [];
    var wscols = [];
    for (let index = 0; index < 7; index++) {
      if (index == 0) {
        wscols.push({ wch: 25 })
      } else if (index == 3) {
        wscols.push({ wch: 50 })
      } else {
        wscols.push({ wch: 15 })
      }
    }

    let periodeStart = "--/--/--";
    let periodeEnd = "--/--/--";

    if (date) {
      let periode = date.split(",");
      periodeStart = this.datePipe.transform(new Date(periode[0]), 'dd/MM/yyyy');
      periodeEnd = this.datePipe.transform(new Date(periode[1]), 'dd/MM/yyyy');
    }

    let data = [];

    let total = 0;

    data.push({
      date: 'INVENTAIRE DES REGLEMENTS',
      bc: '',
      montant: '',
      observation: '',
      
    })

    data.push({
      date: '',
      bc: '',
      montant: 'BILAN GENERALE',
      observation: '',
    })

    data.push({
      date: customer.tradeName,
      bc: '',
      montant: 'BILAN GENERALE',
      observation: '',
    
    })
    data.push({
      date: customer.tradeName,
      bc: '',
      montant: 'Periode du ' + periodeStart + "  au " + periodeEnd,
      observation: 'En date du '+ this.datePipe.transform(new Date(), 'dd/MM/yyyy'),
    
    })

    data.push({
      date: '',
      bc: '',
      montant: '',
      observation: '',
    })

    data.push({
      date: '',
      bc: '',
      montant: '',
      observation: '',
    })

    data.push({
      date: 'DATE',
      bc: 'N° BC',
      montant: 'MONTANT',
      observation: 'OBSERVATION',
    })

    for (let index = 0; index < fundraisings.length; index++) {

      const entry = fundraisings[index];
     
      data.push({
        date: this.datePipe.transform(new Date(entry['collectionDate']), 'dd/MM/yyyy'),
        bc: entry["cashRegisterNumber"],
        montant: entry.amount,
        observation: entry.observation,
      })
        total += entry.amount;
      }

      data.push({
        date: '',
        bc: "TOTAL",
        montant: total,
        observation: '',
      })
    
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data, { skipHeader: true });
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    worksheet['!cols'] = wscols;
    worksheet['!cols']
    XLSX.utils.sheet_add_aoa(worksheet, Heading);
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, customer.tradeName + ' Reglement du ' + periodeStart + "  au " + periodeEnd);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + this.EXCEL_EXTENSION);
  }
}
