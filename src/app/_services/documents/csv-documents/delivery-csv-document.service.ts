import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { Delivery } from 'src/app/_models/delivery.model';
import { ArticleSold } from 'src/app/_models/articleSold.model';
import { DeliveryService } from '../../delivery.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class DeliveryCsvDocumentService {

  EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  EXCEL_EXTENSION = '.xlsx';

  constructor(
    private deliveryService: DeliveryService,
    private datePipe: DatePipe
  ) { }

  public exportInvoiceToCsv(delivery : Delivery, articleSolds: ArticleSold[]): void {

        let customerOrder = delivery.customerOrder;            
        var Heading = [];
        var wscols = [];
            for (let index = 0; index < 5; index++) {
              if (index == 0) {
                wscols.push({ wch: 25 })
             }else if (index == 1) {
                wscols.push({ wch: 50 })
              } else {
                wscols.push({ wch: 15 })
              }
            }  

            let data = []; 
            
            data.push({
              reference: "BL N° : " + delivery.deliveryNoteNumber,
               name: "CLIENT: " + delivery["customer"]["tradeName"],
               unitPriceHt: "",
               qty: "",
               totalHt: ""
            });
           
            data.push({
              reference: "DATE: " + this.datePipe.transform(delivery.date, 'dd/MM/yyyy HH:mm:ss'),
               name: "SUCCURSALE: "  ,
               unitPriceHt: "",
               qty: "",
               totalHt: ""
            });

            data.push({
              reference: "OP. Saisie : " + delivery["user"]["firstName"]+" " +delivery["user"]["lastName"] ,
               name: "Adresse liv.:" + delivery.deliveryAddress ,
               unitPriceHt: "",
               qty: " ",
               totalHt: ""
            });

            data.push({
              reference: "",
               name: "" ,
               unitPriceHt: "",
               qty: "",
               totalHt:""
            });
            data.push({
              reference: "REFERENCE" ,
               name: "DESIGNATION" ,
               unitPriceHt: "PRIX UNITAIRE",
               qty: "QUANTITE",
               totalHt: "TOTAL HT"
            });

            articleSolds.forEach(el => {   
              let articleSold = {
               reference: el["article"]["reference"],
               name: el["article"]["name"],
               unitPriceHt: el["unitSalePrice"],
               qty: el["invoiceQty"],
               totalHt: el["totalHt"]
              }
              data.push(articleSold);
            });
            data.push({
              reference: "",
               name: "" ,
               unitPriceHt: "",
               qty: "",
               totalHt:""
            });
            data.push({
              reference: "TOTAL COLIS : " +delivery.numberOfPackages,
               name: "TOTAL HT BRUT : " ,
               unitPriceHt: delivery.totalCostHt,
               qty: "TOTAL HT NET: ",
               totalHt: delivery["totalAfterDiscount"]
            });
            data.push({
              reference: "",
               name: "REMISE: ",
               unitPriceHt: delivery["discountValue"],
               qty: "TOTAL TVA: ",
               totalHt: delivery["tvaValue"]
            });
            data.push({
              reference: "",
               name: "REMISE SPACIALE: ",
               unitPriceHt: delivery["specialDiscount"],
               qty: "NET A PAYER: ",
               totalHt: delivery["netToPaid"]
            });
            data.push({
              reference: "",
               name: "AVANCE: " ,
               unitPriceHt: delivery["advance"],
               qty: "NET A PAYER: ",
               totalHt: delivery["remainder"]
            });
            const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data, { skipHeader: true });
            const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            worksheet['!cols'] = wscols;
            worksheet['!cols'] 
            XLSX.utils.sheet_add_aoa(worksheet, Heading);
            const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, delivery.deliveryNoteNumber);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.EXCEL_TYPE });
    FileSaver.saveAs(data, fileName  + this.EXCEL_EXTENSION);
  }

  

}
