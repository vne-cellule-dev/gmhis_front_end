import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { th } from 'date-fns/locale';
import { PageList } from 'src/app/_models/page-list.model';
import { NotificationService } from 'src/app/_services/notification.service';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';
import { SubSink } from 'subsink';
import { IExam } from '../models/exam';
import { IExamItemDto } from '../models/exam-item-dto';
import { ExamService } from '../services/exam.service';

@Component({
  selector: 'app-laboratory-examen',
  templateUrl: './laboratory-examen.component.html',
  styleUrls: ['./laboratory-examen.component.scss']
})
export class LaboratoryExamenComponent implements OnInit {

  private subs = new SubSink();

  public searchForm: FormGroup;

  file: File;


  currentPage: number;
  empty: boolean;
  firstPage: boolean;
  lastPage: boolean;
  totalItems: number;
  totalPages: number;

  public items: any;

  selectedSize: number;

  public examen: IExam;


  sizes = [
    { id: 10, value: 10 },
    { id: 25, value: 25 },
    { id: 50, value: 50 },
    { id: 100, value: 100 },
    { id: 250, value: 250 },
    { id: 500, value: 500 },
    { id: 1000, value: 1000 },
  ];

  actives = [
    { id: true, value: 'Actif' },
    { id: false, value: 'Inactif' },
  ];

  showloading: boolean = false;
  currentIndex: number;
  examenId: string;
  analysisRequestItems: IExamItemDto[];
  medicalAnalysisSpeciality: any = [];
  selectectedExamIds: string[] = [];
  medicalAnalysisResultFiles: any = [];
  pdfFile: File;


  constructor(
    private examenService: ExamService,
    private notificationService: NotificationService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.initform();
    this.getAllExam();
  }


  initform() {
    this.searchForm = new FormGroup({
      name: new FormControl(''),
      active: new FormControl(null),
      page: new FormControl(0),
      size: new FormControl(50),
      sort: new FormControl('id,desc'),
    });
  }

  onSearchValueChange(): void {
    this.getAllExam();
  }

  public getAllExam() {
    this.showloading = true;
    this.subs.add(
      this.examenService.findAll(this.searchForm.value).subscribe(
        (response: PageList) => {
          this.showloading = false;
          this.currentPage = response.currentPage + 1;
          this.empty = response.empty;
          this.firstPage = response.firstPage;
          this.items = response.items;
          this.lastPage = response.lastPage;
          this.selectedSize = response.size;
          this.totalItems = response.totalItems;
          this.totalPages = response.totalPages;
        },
        (errorResponse: HttpErrorResponse) => {
          this.showloading = false;
          this.notificationService.notify(
            NotificationType.ERROR,
            errorResponse.error.message
          );
        }
      )
    );
  }

  onIsActiveChange() {
    this.getAllExam();
  }

  onPageChange(event) {
    this.searchForm.get('page').setValue(event - 1);
    this.getAllExam();
  }

  openAddForm(addFormContent) {
    this.modalService.open(addFormContent, { size: 'lg' });
  }

  public openUpdateForm(updateFormContent, item : IExam) {
    this.examen = item;
    this.modalService.open(updateFormContent, { size: 'lg' });
  }



  addActCode() {
    this.modalService.dismissAll();
    this.notificationService.notify(
      NotificationType.SUCCESS,
      "Code d'acte ajouté avec succès"
    );
    this.getAllExam();
  }

  updateActCode() {
    this.modalService.dismissAll();
    this.notificationService.notify(
      NotificationType.SUCCESS,
      "Code d'acte modifié avec succès"
    );
    this.getAllExam();
  }

  rowSelected(examen: IExam, index: number) {
    this.currentIndex = index;
    this.examenId = examen?.id;
  }

  onExamenFileSelect(event) {
    
    this.file = event.target.files[0];    
   
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

performeAnalysis(){
  this.notificationService.notify(
    NotificationType.SUCCESS,
    "analyse effectuée avec succès"
  );  
  this.getAllExam();
}
}
