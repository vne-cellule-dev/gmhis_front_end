import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Customer } from 'src/app/_models/customer.model';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class CustomerSaleDeveryActivityService {

  EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  EXCEL_EXTENSION = '.xlsx';

  constructor(
    private datePipe: DatePipe,
    private authenticationService: AuthenticationService
  ) { }
  getDoc(deliveries: any[], customer: Customer, date: string) {
    // Don't forget, that there are CORS-Restrictions. So if you want to run it without a Server in your Browser you need to transform the image to a dataURL
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
    doc.text('INVENTAIRE DES ACHATS', 17, 17)
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
    doc.setFillColor(230, 230, 230);
    doc.rect(208, 25, 75, 10, "FD");
    doc.setFontSize(12);
    doc.text('BON DE LIVRAISON VALORISE', 213, 32);

    var tBody = [];

    let total = 0;

    for (let item in deliveries) {

      let delivery = deliveries[item];

      for (let blNumber in delivery) {

        let deliveryNoteNumber = [{ content: '', styles: { lineWidth: 0 } }, { content: blNumber, styles: { valign: 'middle', halign: 'center', textColor: [255, 0, 0], lineWidth: 0 } }, { content: '', colSpan: 5, styles: { lineWidth: 0 } }];
        tBody.push(deliveryNoteNumber);

        let articles = delivery[blNumber];
        let firstArticle = articles[0];
        let branchOffice = "";
      if(firstArticle){
        firstArticle["saleDelivery"]["customerOrder"] ? firstArticle["saleDelivery"]["customerOrder"]["branchOffice"] : "";
      }  
        let branchOfficeName = branchOffice ? branchOffice["name"] : "";
        let subTotal = 0;


        for (let index = 0; index < articles.length; index++) {

          const element = articles[index];
          let cellBgColor = environment.docWhiteCellBgColor;

          if (index % 2 != 0) cellBgColor = environment.docStripedCellBgColor;

          let article = [
            { content: this.datePipe.transform(new Date(element['saleDelivery']['date']), 'dd/MM/yyyy'), styles: { valign: 'middle', halign: 'center' } },
            { content: blNumber, styles: { valign: 'middle', halign: 'center' } },
            { content: element['article']['reference'], styles: { valign: 'middle', } },
            { content: element['article']['name'], styles: { valign: 'middle' } },
            { content: new Intl.NumberFormat('de-DE').format(element["invoicePrice"]) + " FCFA", styles: { valign: 'middle', halign: 'right' } },
            { content: new Intl.NumberFormat('de-DE').format(element["qty"]), styles: { valign: 'middle', halign: 'center' } },
            { content: new Intl.NumberFormat('de-DE').format(element["totalHt"]) + " FCFA", styles: { valign: 'middle', halign: 'right' } }

          ];
          tBody.push(article);

          subTotal += element["totalHt"];
          total += element["totalHt"];
        }
        tBody.push([{ content: branchOfficeName, colSpan: 5, styles: { lineWidth: 0 } }, { content: "SOUS TOTAL:", styles: { halign: 'right', lineWidth: 0 } }, { content: new Intl.NumberFormat('de-DE').format(subTotal) + " FCFA", styles: { valign: 'middle', halign: 'right', fillColor: [230, 230, 230] } }])

      }
    }
    tBody.push([{ content: "TOTAL:", colSpan: 6, styles: { halign: 'right', lineWidth: 0.5, fillColor: [230, 230, 230] } }, { content: new Intl.NumberFormat('de-DE').format(total) + " FCFA", styles: { valign: 'middle', halign: 'right', fillColor: [230, 230, 230] } }])

    doc['autoTable']({
      head: [[
        { content: 'DATE' },
        { content: 'N° BL' },
        { content: 'REFERENCE' },
        { content: 'DESIGNATION' },
        { content: 'PRIX FACTURE' },
        { content: 'QUANTITE' },
        { content: 'TOTAL' }
      ]],
      body: tBody,
      theme: 'grid',
      headStyles: { fontSize: 8, fillColor: [230, 230, 230], lineColor: [0, 0, 0], halign: 'center', textColor: [0, 0, 0], lineWidth: 0.25, },
      bodyStyles: { textColor: [0, 0, 0], lineColor: [0, 0, 0], lineWidth: 0.25, fontStyle: "bold", fontSize: 9 },
      startY: 38,
      styles: { font: "arial", fontSize: 9 },
      tableLineColor: 0,
      didDrawPage: function (data) {
        doc.setFontSize(8)
        var pageSize = doc.internal.pageSize
        var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
        doc.text("- Page " + data.pageNumber + " -", data.settings.margin.left + 80, pageHeight - 3)
      },
      didParseCell: function (data) {

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

  public exportCustomerDeliveriesReviewToCsv(deliveries: any[], customer: Customer, date: string): void {

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

    data.push({
      date: 'INVENTAIRE DES ACHATS',
      bl: '',
      reference: '',
      designation: '',
      price: '',
      qty: '',
      total: ''
    })

    data.push({
      date: '',
      bl: '',
      reference: '',
      designation: 'BILAN GENERALE',
      price: '',
      qty: '',
      total: 'En date du '+ this.datePipe.transform(new Date(), 'dd/MM/yyyy')
    })

    data.push({
      date: customer.tradeName,
      bl: '',
      reference: '',
      designation: 'Periode du ' + periodeStart + "  au " + periodeEnd,
      price: '',
      qty: '',
      total: 'BON DE LIVRAISON VALORISE'
    })
    data.push({
      date: '',
      bl: '',
      reference: '',
      designation: '',
      price: '',
      qty: '',
      total: ''
    })
    data.push({
      date: '',
      bl: '',
      reference: '',
      designation: '',
      price: '',
      qty: '',
      total: ''
    })
    data.push({
      date: 'DATE',
      bl: 'N° BL',
      reference: 'REFERENCE',
      designation: 'DESIGNATION',
      price: 'PRIX FACTURE',
      qty: 'QUANTITE',
      total: 'TOTAL'
    })


    let total = 0;

    for (let item in deliveries) {

      let delivery = deliveries[item];

      for (let blNumber in delivery) {

        data.push({
          date: '',
          bl: blNumber,
          reference: '',
          designation: '',
          price: '',
          qty: '',
          total: ''
        })


        let articles = delivery[blNumber];
        let firstArticle = articles[0];
        let branchOffice = "";
        if(firstArticle){
          firstArticle["saleDelivery"]["customerOrder"] ? firstArticle["saleDelivery"]["customerOrder"]["branchOffice"] : "";
        }
        let branchOfficeName = branchOffice ? branchOffice["name"] : "";
        let subTotal = 0;


        for (let index = 0; index < articles.length; index++) {

          const element = articles[index];

          data.push({
            date: this.datePipe.transform(new Date(element['saleDelivery']['date']), 'dd/MM/yyyy'),
            bl: blNumber,
            reference: element['article']['reference'],
            designation: element['article']['name'],
            price: element["invoicePrice"] + " F",
            qty: element["qty"],
            total: element["totalHt"]
          })

          subTotal += element["totalHt"];
          total += element["totalHt"];
        }

        data.push({
          date: branchOfficeName,
          bl: '',
          reference: '',
          designation: '',
          price: '',
          qty: 'SOUS TOTAL:',
          total: subTotal
        })

        data.push({
          date: '',
          bl: '',
          reference: '',
          designation: '',
          price: '',
          qty: '',
          total: ''
        })

      }
    }

    data.push({
      date: '',
      bl: '',
      reference: '',
      designation: '',
      price: '',
      qty: '',
      total: ''
    })

    data.push({
      date: '',
      bl: '',
      reference: '',
      designation: '',
      price: '',
      qty: 'TOTAL',
      total: total
    })

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data, { skipHeader: true });
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    worksheet['!cols'] = wscols;
    worksheet['!cols']
    XLSX.utils.sheet_add_aoa(worksheet, Heading);
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, customer.tradeName + ' Achat du ' + periodeStart + "  au " + periodeEnd);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + this.EXCEL_EXTENSION);
  }
}
