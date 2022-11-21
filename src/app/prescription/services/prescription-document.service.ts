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

    var doc = new jsPDF('p', 'mm', 'a4');
    
      // doc.setFontSize(9)
      // doc.text("Date   : " + this.datePipe.transform(invoice["billDate"], 'dd/MM/yyyy')  , 160, 47)
    
      doc.setFontSize(11)
      doc.text(`${prescription["practicienFirstName"]} ${prescription["practicienFirstName"]}`.toString().toUpperCase(), 15, 20);
      doc.text(prescription["serviceName"], 15, 27);


      doc.setFontSize(11)
      doc.text(`${prescription["facilityCity"]} (${prescription["facilityLocality"]})`.toString().toUpperCase(), 150, 80);
      doc.text(this.datePipe.transform(prescription["prescriptionDate"], 'dd/MM/yyyy'), 150, 86);

    
      doc.setFontSize(12)
      doc.text("Ordonnance  N°", 60, 47);
      doc.text(prescription["prescriptionNumber"].toString().toUpperCase(), 93, 47);

      

      doc.setFontSize(11)
      doc.text(`${prescription["patientCivility"]} ${prescription["patientFirstName"]} ${prescription["patientLastName"]}`.toString().toUpperCase(), 15, 100);
   
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
          { content: "Mécament" },
          { content: 'Quantité' },
          { content: 'Posologie' },
          { content: 'durée' },
    
    
        ]],
        body: tBody,
        theme: 'grid',
        headStyles: {fontSize:8, fillColor : [230, 230, 230], lineColor: [0, 0, 0], halign:'center' , textColor: [0, 0, 0], lineWidth: 0.25,  },
        bodyStyles: {textColor: [0, 0, 0], lineColor: [0, 0, 0], lineWidth: 0.25, fontStyle: "bold", fontSize:9},
        startY: 110,
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
      doc.text(prescription["prescriptionObservation"].toString(), 15, 200);

      doc.setFontSize(11)
      doc.text("SIGNATURE", 160, 230);

      doc.setFontSize(11)
      doc.text("CACHET", 160, 260);
      return doc;
    
    }
}
