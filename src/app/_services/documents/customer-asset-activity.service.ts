import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { Customer } from 'src/app/_models/customer.model';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';


@Injectable({
  providedIn: 'root'
})
export class CustomerAssetActivityService {

  EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  EXCEL_EXTENSION = '.xlsx';

  constructor(
    private datePipe: DatePipe,
    private authenticationService: AuthenticationService
  ) { }

  getDoc(assets: any[], customer: Customer, date: string) {
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
    doc.text('INVENTAIRE DES AVOIRS', 17, 17)
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

    for (let item in assets) {

      let asset = assets[item];

      for (let assetNumber in asset) {

        let assetNumberRow = [{ content: '', styles: { lineWidth: 0 } }, { content: assetNumber, styles: { valign: 'middle', halign: 'center', textColor: [255, 0, 0], lineWidth: 0 } }, { content: '', colSpan: 6, styles: { lineWidth: 0 } }];
        tBody.push(assetNumberRow);

        let articles = asset[assetNumber];
        for (let index = 0; index < articles.length; index++) {

          const element = articles[index];

          let cellBgColor = environment.docWhiteCellBgColor;
          if (index % 2 != 0) cellBgColor = environment.docStripedCellBgColor;

          let article = [
            { content: this.datePipe.transform(new Date(element.asset['date']), 'dd/MM/yyyy'), styles: { valign: 'middle', halign: 'center' } },
            { content: element.asset.assetsNumber, styles: { valign: 'middle', halign: 'center' } },
            { content: element['article']['reference'], styles: { valign: 'middle', halign: 'center' } },
            { content: element['article']['name'] },
            { content: new Intl.NumberFormat('de-DE').format(element["assetUnitPrice"]) + " FCFA", styles: { valign: 'middle', halign: 'right' } },
            { content: new Intl.NumberFormat('de-DE').format(element["qty"]), styles: { valign: 'middle', halign: 'center' } },
            { content: new Intl.NumberFormat('de-DE').format(element["totalAmount"]) + " FCFA", styles: { valign: 'middle', halign: 'right' } },
            { content: element.asset['salesDelivery']['deliveryNoteNumber'], styles: { valign: 'middle', halign: 'center' } },
          ];
          tBody.push(article);
          total += element["totalAmount"];
          tBody.push([{ content: "SOUS TOTAL:", colSpan: 6, styles: { halign: 'right' } }, { content: new Intl.NumberFormat('de-DE').format(element["totalAmount"]) + " FCFA", styles: { valign: 'middle', halign: 'right', fillColor: [230, 230, 230] } }])

        }
      }

    }

    //  for (let index = 0; index < assets.length; index++) {
    //    const asset = assets[index];
    //         

    //         let articles = JSON.parse(asset["articles"]);
    //         for (let index = 0; index < articles.length; index++) {
    //           const element = articles[index];
    //           let article = [
    //                     { content: this.datePipe.transform(new Date(asset['date']), 'dd/MM/yyyy'), styles: { valign: 'middle', halign: 'center' }},
    //                     { content: asset.assetsNumber,  styles: { valign: 'middle', halign: 'center' } },
    //                     { content: element['reference'],  styles: { valign: 'middle', halign: 'center' } },
    //                     { content: element['name'] },
    //                     { content: new Intl.NumberFormat('de-DE').format(element["unitPrice"]) + " FCFA" , styles: { valign: 'middle', halign: 'right'} },
    //                     { content: new Intl.NumberFormat('de-DE').format(element["qty"]), styles: { valign: 'middle', halign: 'center' } },
    //                     { content: new Intl.NumberFormat('de-DE').format(element["totalAmount"]) + " FCFA", styles: { valign: 'middle', halign: 'right' } },
    //                     { content: asset['salesDelivery']['deliveryNoteNumber'],  styles: { valign: 'middle', halign: 'center' } },
    //                   ];
    //                   tBody.push(article);
    //                   tBody.push([{ content: "SOUS TOTAL:", colSpan: 6, styles: { halign: 'right'}}, {content: new Intl.NumberFormat('de-DE').format(element["totalAmount"]) + " FCFA" , styles: { valign: 'middle', halign: 'right', fillColor : [230,230,230] }}])

    //                   total += element["totalAmount"];
    //         }   
    // }


    tBody.push([{ content: "TOTAL:", colSpan: 7, styles: { halign: 'right', lineWidth: 0.5, fillColor: [230, 230, 230] } }, { content: new Intl.NumberFormat('de-DE').format(total) + " FCFA", styles: { valign: 'middle', halign: 'right', fillColor: [230, 230, 230] } }])

    doc['autoTable']({
      head: [[
        { content: 'DATE' },
        { content: 'N° AVOIR' },
        { content: 'REFERENCE' },
        { content: 'DESIGNATION' },
        { content: 'PRIX FACTURE' },
        { content: 'QUANTITE' },
        { content: 'TOTAL' },
        { content: 'N° BL' }
      ]],
      body: tBody,
      theme: 'grid',
      headStyles: { fontSize: 8, fillColor: [230, 230, 230], lineColor: [0, 0, 0], halign: 'center', textColor: [0, 0, 0], lineWidth: 0.25, },
      bodyStyles: { textColor: [0, 0, 0], lineColor: [0, 0, 0], lineWidth: 0.25, fontStyle: "bold", fontSize: 9 },
      startY: 38,
      styles: { font: "arial", fontSize: 9 },
      didDrawPage: function (data) {

        doc.setFontSize(8)
        var pageSize = doc.internal.pageSize
        var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
        doc.text("- Page " + data.pageNumber + " -", data.settings.margin.left + 80, pageHeight - 3)
      }
    })

    let finalY = (doc as any).lastAutoTable.finalY;

    return doc;
  }

  getCsvDoc(assets: any[], customer: Customer, date: string) {

    var Heading = [];
    var wscols = [];
    for (let index = 0; index < 8; index++) {
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
      date: 'INVENTAIRE DES AVOIRS',
      asset: '',
      reference: '',
      designation: '',
      price: '',
      qty: '',
      total: '',
      bl: ''
    })

    data.push({
      date: '',
      asset: '',
      reference: '',
      designation: 'BILAN GENERALE',
      price: '',
      qty: '',
      total: '',
      bl: ''
    })

    data.push({
      date: customer.tradeName,
      asset: '',
      reference: '',
      designation: 'Periode du ' + periodeStart + "  au " + periodeEnd,
      price: '',
      qty: '',
      total: 'En date du '+ this.datePipe.transform(new Date(), 'dd/MM/yyyy'),
      bl: ''
    })
    data.push({
      date: '',
      asset: '',
      reference: '',
      designation: '',
      price: '',
      qty: '',
      total: '',
      bl: ''
    })
    data.push({
      date: '',
      asset: '',
      reference: '',
      designation: '',
      price: '',
      qty: '',
      total: '',
      bl: ''
    })
    data.push({
      date: 'DATE',
      asset: 'N° AVOIR',
      reference: 'REFERENCE',
      designation: 'DESIGNATION',
      price: 'PRIX FACTURE',
      qty: 'QUANTITE',
      total: 'TOTAL',
      bl: 'N° BL'
    })

    for (let item in assets) {

      let asset = assets[item];

      for (let assetNumber in asset) {

        data.push({
          date: '',
          asset: assetNumber,
          reference: '',
          designation: '',
          price: '',
          qty: '',
          total: '',
          bl: ''
        })

        let articles = asset[assetNumber];
        for (let index = 0; index < articles.length; index++) {

          const element = articles[index];

          data.push({
            date: this.datePipe.transform(new Date(element.asset['date']), 'dd/MM/yyyy'),
            asset: element.asset.assetsNumber,
            reference: element['article']['reference'],
            designation: element['article']['name'],
            price: element["assetUnitPrice"],
            qty: element["qty"],
            total: element["totalAmount"],
            bl: element.asset['salesDelivery']['deliveryNoteNumber']
          })

          total += element["totalAmount"];

          data.push({
            date: '',
            asset: '',
            reference: '',
            designation: '',
            price: '',
            qty: "SOUS TOTAL:",
            total: element["totalAmount"],
            bl: ''
          })
        }
      }

    }

    data.push({
      date: '',
      asset: "",
      reference: '',
      designation: '',
      price: '',
      qty: '',
      total: '',
      bl: ''
    })
    data.push({
      date: '',
      asset: "",
      reference: '',
      designation: '',
      price: '',
      qty: "TOTAL:",
      total: total,
      bl: ''
    })

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data, { skipHeader: true });
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    worksheet['!cols'] = wscols;
    worksheet['!cols']
    XLSX.utils.sheet_add_aoa(worksheet, Heading);
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, customer.tradeName + ' Avoirs du ' + periodeStart + "  au " + periodeEnd);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + this.EXCEL_EXTENSION);
  }
}
