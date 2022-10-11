import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class ComplaintFormDocumentService {

  constructor() { }
  public makeComplaintForm() {
    var doc = new jsPDF('l', 'mm', 'a4');
    doc.setFont("Arial", "bold");
    var img = new Image();
    img.src = "assets/images/code-bar-sav-plainte.PNG";

    //formulaire gauche
    doc.setFontSize(14)
    doc.text("FORMULAIRE DE PLAINTE ", 7, 10);
    doc.setFontSize(10);
    doc.addImage(img, "JPEG", 102, 10, 47, 20);
    doc.text("N° DE PLAINTE : ", 15, 20);
    doc.line(15, 21, 43, 21);
    //rectangle numero plainte
    doc.rect(46, 13, 53, 9);
    doc.text("Code ", 15, 30);
    doc.line(15, 31, 25, 31);
    //rectangle code
    doc.rect(46, 23, 53, 9);
    //rect code bare
    doc.text("DATE SIGNAL/RECEPTION : ", 7, 40);
    doc.rect(66, 33, 82, 9);
    doc.text("NOM ET PRENOMS DU CLIENT : ", 7, 50);
    doc.rect(66, 44, 82, 9);
    doc.text("TELEPHONE CLIENT ", 7, 60);
    doc.rect(66, 55, 82, 9);
    doc.text("ADRESSE CLIENT ", 7, 71);
    doc.rect(66, 66, 82, 9);
    doc.text("N° FACTURE ", 7, 81);
    doc.rect(66, 77, 82, 9);
    doc.text("DATE D'ACHAT ", 7, 92);
    doc.rect(66, 88, 82, 9);
    doc.text("FOURNISSEUR ", 7, 104);
    doc.rect(66, 99, 82, 9);
    doc.text("REFERENCE DE L'APPAREIL ", 7, 115);
    doc.rect(66, 110, 82, 9);
    doc.text("N° DE SERIE ", 7, 126);
    doc.rect(66, 121, 82, 9);
    doc.text("INFORMATION SUR LA PANNE ", 7, 140);
    doc.rect(66, 132, 82, 15);
    doc.text("DIAGNOSTIC DU TECHNICIEN ", 7, 158);
    doc.rect(66, 149, 82, 15);
    doc.text("RAPPORT DU TECHNICIEN ", 7, 174);
    doc.rect(66, 166, 82, 15);
    doc.rect(7, 183, 70, 15);
    doc.rect(78, 183, 70, 15);

    doc.text("SIGNATURE CLIENT ", 10, 187);
    doc.line(10, 188, 45, 188);
    doc.text("SIGNATURE TECHNICIEN ", 80, 187);
    doc.line(80, 188, 125, 188);

    //formulaire droit
    //formulaire droit
    doc.setFontSize(14)
    doc.text("FORMULAIRE DE PLAINTE ", 150, 10);
    doc.setFontSize(10);
    doc.text("N° DE PLAINTE : ", 157, 20);
    doc.line(157, 21, 185, 21);
    //rectangle numero plainte
    doc.rect(187, 13, 53, 9);
    doc.addImage(img, "JPEG", 243, 10, 47, 20);
    doc.text("Code :", 157, 30);
    doc.line(157, 31, 166, 31);
    //rectangle code
    doc.rect(187, 23, 53, 9);

    // doc.rect(242, 12, 45, 18);
    doc.text("DATE SIGNAL/RECEPTION : ", 151, 40);
    doc.rect(207, 33, 82, 9);
    doc.text("NOM ET PRENOMS DU CLIENT : ", 151, 50);
    doc.rect(207, 44, 82, 9);
    doc.text("TELEPHONE CLIENT ", 151, 60);
    doc.rect(207, 55, 82, 9);
    doc.text("ADRESSE CLIENT ", 151, 71);
    doc.rect(207, 66, 82, 9);
    doc.text("N° FACTURE ", 151, 81);
    doc.rect(207, 77, 82, 9);
    doc.text("DATE D'ACHAT ", 151, 92);
    doc.rect(207, 88, 82, 9);
    doc.text("FOURNISSEUR ", 151, 104);
    doc.rect(207, 99, 82, 9);
    doc.text("REFERENCE DE L'APPAREIL ", 151, 115);
    doc.rect(207, 110, 82, 9);
    doc.text("N° DE SERIE ", 151, 126);
    doc.rect(207, 121, 82, 9);
    doc.text("INFORMATION SUR LA PANNE ", 151, 140);
    doc.rect(207, 132, 82, 15);
    doc.text("DIAGNOSTIC DU TECHNICIEN ", 151, 158);
    doc.rect(207, 149, 82, 15);
    doc.text("RAPPORT DU TECHNICIEN ", 151, 174);
    doc.rect(207, 166, 82, 15);
    doc.rect(150, 183, 69, 15);
    doc.rect(221, 183, 69, 15);

    doc.text("SIGNATURE CLIENT ", 155, 187);
    doc.line(190, 188, 155, 188);
    doc.text("SIGNATURE TECHNICIEN ", 225, 187);
    doc.line(225, 188, 270, 188);
    return doc;
  }


}
