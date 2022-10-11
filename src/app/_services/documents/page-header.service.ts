import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { AppParam } from 'src/app/_models/app-param.model';

@Injectable({
  providedIn: 'root'
})
export class PageHeaderService {

  constructor(
    private datePipe: DatePipe
  ) { }

  get(doc: jsPDF , title:string, appParam: AppParam){

    doc.setFontSize(20);
    var img = new Image();
    doc.setFontSize(20);
    //doc.setTextColor(0, 26, 77);
    doc.text(title, 15, 20)
    img.src = appParam.logo;
    doc.addImage(img, "PNG", 170, 8, 30, 20);
    //info socitete
    doc.setFontSize(15)
    doc.setFont("arial", "bold");
    doc.text(appParam.nameCompany.toUpperCase(), 15, 30);
    doc.setFontSize(12)
    doc.text(appParam.legalForm, 61, 30);
    doc.setFontSize(12)
    doc.setFont("arial", "normal");
    doc.text(appParam.address, 15, 37);
    doc.text("Contact : " + appParam.phone1, 15, 44);
    doc.setLineWidth(1)
    doc.line(195, 50, 15, 50)

   return doc
  }
}
