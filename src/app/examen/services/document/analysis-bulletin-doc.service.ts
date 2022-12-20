import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { IExam } from '../../models/exam';

@Injectable({
  providedIn: 'root'
})
export class AnalysisBulletinDocService {


  constructor() { }

  getExamenBulletinDoc(examen : IExam){
    
    var doc = new jsPDF('p', 'mm', 'a4');


    doc.text("BULLETIN D'ANALYSE", 75, 17);

    doc.setFontSize(11)
    doc.setFont("aria", );
    doc.text(`Patient  : ${examen.patientFirstName} ${examen.patientLastName} ` , 14, 35)
    doc.text(`Sexe  :  ${examen.patientGender}` , 14, 43)
    doc.text(`Age  :  ${examen.patientAge}` , 14, 51)

    doc.text(`N° de demande   :  ${examen.analysisNumber}` , 130, 35)
    var splitSiteName = doc.splitTextToSize("", 35);
    doc.text( splitSiteName , 130, 43)
    doc.text(`N° CMU  :  ` , 130, 43)
    doc.text(`N° de télephone  :  ${examen.patientTel1}/ ${examen.patientTel2}` , 130, 51)

    doc.setFontSize(12)
    doc.text("ANALYSES DÉMANDÉS", 75, 68);

    return doc;
  }

}
