import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import { DatePipe } from '@angular/common';
import { ActService } from 'src/app/act/act/service/act.service';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class InvoiceDocumentService {

  public acts : any[] = [];
  constructor(
    private datePipe : DatePipe,
    private actservice : ActService
    ) { }

getInvoiceDocument(invoice : any, acts : any){
  
console.log(invoice);

var doc = new jsPDF('p', 'mm', 'a4');
  // doc.setDrawColor(0);
  // doc.setFillColor(230, 230, 230);
  doc.rect(50, 42, 45, 7)
  
  doc.addImage(invoice["facilityLogo"], "JPEG", 14, 10, 30, 30);

  doc.setFontSize(16)
  doc.text(invoice["facilityName"].toString().toUpperCase() , 65, 10)
  // doc.setFont("arial", "bold");
  doc.setFontSize(9)
  doc.text("Date   : " + this.datePipe.transform(invoice["billDate"], 'dd/MM/yyyy')  , 160, 47)


  doc.setFontSize(12)
  doc.text("FACTURE  N°", 60, 47);

  doc.setFontSize(12)
  doc.text(invoice["billNumber"], 100, 47);
  let tBody : any = [];
  let totalAmount : number = 0 ;

  doc.setFontSize(10)
  doc.setFont("aria", );
  doc.text("Etab. payeur/Sociétaire   :  " , 14, 60)
    doc.setFont("arial", "bold");
  doc.text(invoice["subscriberName"] ? invoice["subscriberName"] : "" , 58, 60)

  doc.setFont("aria", "normal");
  doc.text("Adresse  :  " , 14, 66)
    doc.setFont("arial", "bold");
  doc.text(invoice["subscriberAdress"] ? invoice["subscriberAdress"] : "" , 58, 66)

  doc.setFont("aria", "normal");
  doc.text("Compte contribuable n°:  " , 14, 72)
    doc.setFont("arial", "bold");
  doc.text("" , 58, 72)

  doc.setFont("aria", "normal");
  doc.text("Nom patient(e):  " , 14, 78)
    doc.setFont("arial", "bold");
  doc.text(invoice["patientLastName"] + " " + invoice["patientFirstName"] , 58, 78)
  doc.setFont("aria", "normal");
  doc.text("Assuré(e) principal(e) :  " , 14, 84)
    doc.setFont("arial", "bold");
  doc.text(" " , 58, 84)

  doc.setFont("aria", "normal");
  doc.text("Lien de parenté   :  " , 14, 90)
    doc.setFont("arial", "bold");
  doc.text(" " , 58, 90)

  doc.setFont("aria", "normal");
  doc.text("Matricule:  " , 14, 96)
    doc.setFont("arial", "bold");
  doc.text(" " , 58, 96)


  doc.rect(115, 55, 80, 40)

  doc.setFont("aria", "normal");
  doc.text("Dossier n°  :  " , 117, 60)
  doc.text("H0015632" , 138, 60)

  doc.setFont("aria", "normal");
  doc.text("Servcie n°  :  " , 117, 66)
  doc.text(invoice["serviceName"] , 138, 66)

  doc.setFont("aria", "normal");
  doc.text("Entré(e) le   :  " , 117, 72)
  doc.text( this.datePipe.transform(invoice["admissionStartDate"], 'dd/MM/yyyy') , 138, 72)

  doc.setFont("aria", "normal");
  doc.text("Sortie(e) le   :  " , 117, 78)
  doc.text(" " , 138, 78)

  doc.setFont("aria", "normal");
  doc.text("Chambre   :  " , 117, 84)
  doc.text("CH4ER" , 138, 84)

  acts.forEach(element => {
    totalAmount = totalAmount + element.actCost; 
    let article = [
      { content: element.actName, styles: { valign: 'middle' } },
      { content: element.practicianLastName + " " + element.practicianFirstName, styles: { valign: 'middle' } },
      { content: 1, styles: { valign: 'middle' } },
      { content: element.actCost +" FCFA", styles: { valign: 'middle' } },
      { content: element.actCost +" FCFA", styles: { valign: 'middle' } },
    ];
    tBody.push(article);
  });

  // doc.setFont("times", "bold");
  // doc.rect(25, 590, 100, 20);
  doc.setTextColor(0, 0, 0)
  doc.text("Total facture", 130, 170);
  doc.setTextColor(255, 0, 0)
  doc.text(invoice["totalAmount"].toString(), 176, 170);

  doc.setTextColor(0, 0, 0)
      doc.text("Taux de couverture", 130, 180);
      doc.setTextColor(255, 0, 0)
      doc.text(invoice["coverage"].toString()+ "%", 176, 180);

      doc.rect(25, 630, 330, 20);
      doc.setTextColor(0, 0, 0)
      doc.text("Part prise en charge (PEC", 130, 190);
      doc.setTextColor(255, 0, 0)
      doc.text(invoice["partTakenCareOf"].toString(), 176, 190);

      // doc.rect(25, 650, 330, 20);
      // doc.setTextColor(0, 0, 0)
      // doc.text("Remise", 130, 200);
      // doc.setTextColor(255, 0, 0)
      // doc.text(invoice["discountInCfa"].toString(), 176, 200);

      doc.rect(25, 670, 330, 20);
      doc.setTextColor(0, 0, 0)
      doc.text("Part adhérent", 130, 210);
      doc.setTextColor(255, 0, 0)
      doc.text(invoice["patientPart"].toString(), 176, 210);

      doc.rect(25, 690, 330, 20);
      doc.setTextColor(0, 0, 0)
      doc.text("Net à payer", 130, 220);
      doc.setTextColor(255, 0, 0)
      doc.text(invoice["patientPart"].toString(), 176, 220);

      doc.setTextColor(0, 0, 0)
      doc.text("Arrêté la présente facture à la somme de : "  , 14, 240);
      doc.text(invoice["patientPart"].toString() + " FCFA", 14, 245);

      doc.setTextColor(0, 0, 0)
      doc.text("VISA CLIENT" , 14, 260);

      doc.setTextColor(0, 0, 0)
      doc.text("LA FACTURATION" , 150, 260);
     
        
          
  autoTable(doc,{
    head: [[
      { content: "Libellé de l'acte" },
      { content: 'Praticien' },
      { content: 'Nbr/jr' },
      { content: 'PU' },
      { content: 'Montant' },


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

  return doc;

}


}
