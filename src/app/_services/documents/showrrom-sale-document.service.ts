import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { AppParam } from 'src/app/_models/app-param.model';
import { ShowroomSale } from 'src/app/_models/showroomSale.model';
import 'jspdf-autotable';
import { User } from 'src/app/_models/user.model';
import { capitalize } from 'src/app/_utilities/string/capitalize';
import { NumberToLetter } from 'convertir-nombre-lettre';
import { SaleDeliveryService } from './sale-delivery.service';
import { Delivery } from 'src/app/_models/delivery.model';

@Injectable({
  providedIn: 'root'
})
export class ShowrromSaleDocumentService {

  createdBy : User;

  constructor(
    private saleDeliveryService : SaleDeliveryService,
    private datePipe: DatePipe) { }
    
   getInvoiceDoc(appParam: AppParam, showroomSale: any, articlesSold: any) {

    var doc = new jsPDF();

    doc = this.saleDeliveryService.getInvoiceDoc(appParam, showroomSale, articlesSold, null);
    return doc;
   } 
}
