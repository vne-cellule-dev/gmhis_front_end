import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/_services/notification.service';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';
import { IExam } from '../models/exam';
import { IExamItemDto } from '../models/exam-item-dto';
import { ExamService } from '../services/exam.service';

@Component({
  selector: 'app-analysis-bulletin',
  templateUrl: './analysis-bulletin.component.html',
  styleUrls: ['./analysis-bulletin.component.scss']
})
export class AnalysisBulletinComponent implements OnInit {

  @Input()
  public examen: any;
  
  showloading: boolean = false;
  currentIndex: number;
  examenId: number;
  analysisRequestItems: IExamItemDto[];
  medicalAnalysisSpeciality: any = [];
  selectectedExamIds: string[] = [];
  medicalAnalysisResultFiles: any = [];
  pdfFile: File;
  file: File;
  @Input()
  resultAskByDoctor : boolean = false; 

  constructor(
    private examenService: ExamService,
    private notificationService: NotificationService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    console.log(this.examen);
    
    this.getAnalysisRequestItemsByAnalysisId(this.examen.id);
    this.getAnalysisRequestResultFile(this.examen.id);
  }

  onExamenFileSelect(event) {
    
    this.file = event.target.files[0];    
    // this.analysisRequestItems[2]["file"] = this.file;
    
    // this.readFile(this.files[0]).then(fileContents => {

    // })
  }

  

  markAsperformed(){    
  if (this.selectectedExamIds.length != 0 && this.file != null ) {
    this.examenService.makAsPerformed(this.selectectedExamIds, this.file).subscribe(
      (response : any) => {
        this.modalService.dismissAll(); 
        this.notificationService.notify(
          NotificationType.SUCCESS,
          "analyse effectuée avec succès"
        );  
        this.selectectedExamIds = [];  
        this.file = null;
      },(errorResponse: HttpErrorResponse) => {
          this.showloading = false;
          this.notificationService.notify(
            NotificationType.ERROR,
            errorResponse.error.message
          );
          this.selectectedExamIds = [];  
        }
    )
  }else{
    this.notificationService.notify(
      NotificationType.ERROR,
     "Veuillez joindre un fichier et choisir une analyse."
    );
  }
  }

  getAnalysisRequestItemsByAnalysisId(analysisId): any {
    this.examenService.getAnalysisRequestItemsByAnalysisId(analysisId).subscribe(
      (response : any) => {
        this.analysisRequestItems = response;
        this.medicalAnalysisSpeciality = [];
        this.analysisRequestItems.forEach((el,i)=>{
          this.removeDuplicates(this.medicalAnalysisSpeciality,el["medicalAnalysisName"]);    
        })
      },
      (errorResponse: HttpErrorResponse) => {
        this.showloading = false;
        this.notificationService.notify(
          NotificationType.ERROR,
          errorResponse.error.message
        );
      }
    )
  }

  getAnalysisRequestResultFile(analysisId): any {
    this.examenService.getAnalysisRequestRquestFiles(analysisId).subscribe(
      (response : any) => {
        this.medicalAnalysisResultFiles = response;
        console.log(this.medicalAnalysisResultFiles);
        
      },
      (errorResponse: HttpErrorResponse) => {
        this.showloading = false;
        this.notificationService.notify(
          NotificationType.ERROR,
          errorResponse.error.message
        );
      }
    )
  }
  removeDuplicates(arr,item) {
    if (!arr.includes(item)) {
      arr.push(item);
    }
}

getExamItemsIdToCollected(examId){
  if (this.selectectedExamIds.includes(examId)) {
    let index = this.selectectedExamIds.indexOf(examId);
    this.selectectedExamIds.splice(index, 1);

  } else {
    this.selectectedExamIds.push(examId);
  }

}

openPdfFile(pdfFileContent, file : File){
  // this.modalService.dismissAll();
  this.modalService.open(pdfFileContent, { size: 'lg' });
  this.pdfFile = file;
}
}
