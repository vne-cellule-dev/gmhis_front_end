import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SalePlaningDocumentService {

  constructor(
    private datePipe: DatePipe
  ) { }

  public getSalePlanning(){
    var doc = new jsPDF('p', 'mm', 'a4');
    return doc;
  }
}
