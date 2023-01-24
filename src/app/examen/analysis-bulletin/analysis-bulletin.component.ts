import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Output('performeAnalysis') performeAnalysis: EventEmitter<any> = new EventEmitter();

  
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
    this.getAnalysisRequestItemsByAnalysisId(this.examen.id);
    this.getAnalysisRequestResultFile(this.examen.id);
  }

  onExamenFileSelect(event) {
    
    this.file = event.target.files[0];    
    // this.analysisRequestItems[2]["file"] = this.file;
    
    // this.readFile(this.files[0]).then(fileContents => {

    // })
  }

  

/**
 * It takes the selected exam ids and the file and sends them to the backend to be saved
 */
  markAsperformed(){    
  if (this.selectectedExamIds.length != 0 && this.file != null ) {
    this.examenService.makAsPerformed(this.selectectedExamIds, this.file).subscribe(
      (response : any) => {
        this.modalService.dismissAll(); 
        this.performeAnalysis.emit();  
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

  /**
   * It gets the analysis request items by analysis id and then it removes the duplicates from the
   * array
   * @param analysisId - The id of the analysis
   */
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

 /**
  * It gets the analysis request result files
  * @param analysisId - The id of the analysis request
  */
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


  /**
   * If the array does not include the item, push the item to the array
   * @param arr - the array to remove duplicates from
   * @param item - the item to be added to the array
   */
  removeDuplicates(arr,item) {
    if (!arr.includes(item)) {
      arr.push(item);
    }
}

/**
 * If the examId is in the array, remove it. If it's not in the array, add it
 * @param examId - The id of the exam item
 */
getExamItemsIdToCollected(examId){
  if (this.selectectedExamIds.includes(examId)) {
    let index = this.selectectedExamIds.indexOf(examId);
    this.selectectedExamIds.splice(index, 1);

  } else {
    this.selectectedExamIds.push(examId);
  }

}

/**
 * It opens a modal window and assigns the file to a variable
 * @param pdfFileContent - This is the modal content.
 * @param {File} file - File - The file object that contains the file name, file type, and file
 * content.
 */
openPdfFile(pdfFileContent, file : File){
  // this.modalService.dismissAll();
  this.modalService.open(pdfFileContent, { size: 'lg' });
  this.pdfFile = file;
}


}
