import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class MonthAlertDocumentService {

  constructor(
    private datePipe: DatePipe
  ) { }

  public getMonthAlert(){
    var doc = new jsPDF('p', 'mm', 'a4');
    return doc;
  }
}
