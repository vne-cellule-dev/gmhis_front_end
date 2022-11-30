import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'


@Injectable({
  providedIn: 'root'
})
export class PrescriptionDocumentService {

  constructor(
    private datePipe : DatePipe,

  ) { }

  getPrescriptionDocument(prescription : any, prescriptionItems : any){
  
    console.log(prescription);

    console.log(prescriptionItems);

    let tBody : any = [];

    var doc = new jsPDF('p', 'mm', 'a5');
    
      // doc.setFontSize(9)
      // doc.text("Date   : " + this.datePipe.transform(invoice["billDate"], 'dd/MM/yyyy')  , 160, 47)
    
      doc.setFontSize(8)
      doc.text(`Dr ${prescription["practicienFirstName"]} ${prescription["practicienFirstName"]}`.toString().toUpperCase(), 15, 13);
      doc.text(prescription["serviceName"].toString().toLowerCase(), 15, 17);

      doc.setFontSize(8)
      doc.text(`${prescription["facilityName"]}`.toString(), 100, 13);
      doc.text(`${prescription["facilityAdress"]}`.toString(), 100, 17);
      doc.text(`${prescription["facilityContact"]}`.toString(), 100, 21);




      doc.setFontSize(8)
      doc.text(`${prescription["facilityCity"]} (${prescription["facilityLocality"]}),`.toString(), 100, 36);
      doc.text(` le ${this.datePipe.transform(prescription["prescriptionDate"], 'dd/MM/yyyy')}`, 123, 36);

    
      doc.setFontSize(9)
      doc.text("Ordonnance  N°", 25, 36);
      doc.text(prescription["prescriptionNumber"].toString().toUpperCase(), 50, 36);

      

      doc.setFontSize(8)
      doc.text(`${prescription["patientCivility"]} ${prescription["patientFirstName"]} ${prescription["patientLastName"]}`.toString().toUpperCase(), 15, 55);
      doc.text(`${prescription["patientAge"]} ans, ${prescription["patientWeight"]} kg`.toString(), 15, 59);

   
      prescriptionItems.forEach(element => {
        let prescription = [
          { content: element.drug, styles: { valign: 'middle' } },
          { content: element.quantity , styles: { valign: 'center' } },
          { content: element.dosage, styles: { valign: 'middle' } },
          { content: element.duration , styles: { valign: 'middle' } },
        ];
        tBody.push(prescription);
      });
    
      autoTable(doc,{
        head: [[
          { content: "Médicament" },
          { content: 'Quantité' },
          { content: 'Posologie' },
          { content: 'durée' },
    
    
        ]],
        body: tBody,
        theme: 'grid',
        headStyles: {fontSize:8, fillColor : [230, 230, 230], lineColor: [0, 0, 0], halign:'center' , textColor: [0, 0, 0], lineWidth: 0.25,  },
        bodyStyles: {textColor: [0, 0, 0], lineColor: [0, 0, 0], lineWidth: 0.25, fontStyle: "bold", fontSize:9},
        startY: 63,
        styles: {font: "arial", fontSize: 9},
        didDrawPage: function (data :any ) {
    
          doc.setFontSize(8)
          var pageSize = doc.internal.pageSize
          var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
    
          //doc  footer
          doc.text("- Page " + data.pageNumber + " -", data.settings.margin.left + 80, pageHeight - 3)
        }
      })


      doc.setFontSize(9)
      doc.text(prescription["prescriptionObservation"].toString(), 15, 150);

      doc.setFontSize(9)
      doc.text("Signature", 120, 170);

      doc.setFontSize(9)
      doc.text("CAchet", 120, 185);
      return doc;
    
    }
}
