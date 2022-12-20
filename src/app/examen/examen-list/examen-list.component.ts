import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { PageList } from 'src/app/_models/page-list.model';
import { NotificationService } from 'src/app/_services/notification.service';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';
import { SubSink } from 'subsink';
import { IExam } from '../models/exam';
import { AnalysisBulletinDocService } from '../services/document/analysis-bulletin-doc.service';
import { ExamService } from '../services/exam.service';

@Component({
  selector: 'app-examen-list',
  templateUrl: './examen-list.component.html',
  styleUrls: ['./examen-list.component.scss']
})
export class ExamenListComponent implements OnInit {

  private subs = new SubSink();

  public searchForm: FormGroup;

  public items: any;

  showloading: boolean = false;

  @Input()
  patientId : number;

  @Input()
  admissionId : number;

  @Output('updatePatientExamenNumber') updatePatientExamenNumber: EventEmitter<any> =
  new EventEmitter();

  examen : any;


  currentPage: number;
  empty: boolean;
  firstPage: boolean;
  lastPage: boolean;
  totalItems: number;
  totalPages: number;


  selectedSize: number;

  sizes = [
    { id: 10, value: 10 },
    { id: 25, value: 25 },
    { id: 50, value: 50 },
    { id: 100, value: 100 },
    { id: 250, value: 250 },
    { id: 500, value: 500 },
    { id: 1000, value: 1000 },
  ];
  docSrc: string;

  resultAskByDoctor : boolean; 
  constructor(
    private examenService: ExamService,
    private notificationService: NotificationService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private analysisBulletinDocService: AnalysisBulletinDocService
    // private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.initform();
    this.getExam();
  }

  initform() {
    this.searchForm = new FormGroup({
      patientId: new FormControl(this.patientId),
      page: new FormControl(0),
      size: new FormControl(10),
      sort: new FormControl('id,desc'),
    });
  }

  public getExam() {
    this.showloading = true;
    this.subs.add(
      this.examenService.findAllPatientExame(this.searchForm.value).subscribe(
        (response: PageList) => {
          this.showloading = false;
          this.currentPage = response.currentPage + 1;
          this.empty = response.empty;
          this.firstPage = response.firstPage;
          this.items = response.items;
          console.log(this.items);
          
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

  onPageChange(event) {
    this.searchForm.get('page').setValue(event - 1);
    this.getExam();
  }

  openAddForm(addFormContent) {
    this.modalService.open(addFormContent, { size: 'xl' });
  }

  openUpdateForm(updateFormContent, item?) {
    this.examen = item;
    this.modalService.open(updateFormContent, { size: 'xl' });
  }

  openAnalysisBulletinForm(makAsdoneContent,item){
    this.resultAskByDoctor = true;
    this.examen = item;
    console.log(this.examen);
    this.modalService.open(makAsdoneContent, { size: 'lg' });
  }

  onSearchValueChange(): void {
    this.getExam();
  }

  addExam() {
    this.modalService.dismissAll();
    this.notificationService.notify(
      NotificationType.SUCCESS,
      "analyse démandé avec succès"
    );
    this.updatePatientExamenNumber.emit();
    this.getExam();
  }

 
  printExamenBulletinDoc(printContent,examen : IExam){
    this.modalService.open(printContent, { size: 'xl' });
    let doc  = this.analysisBulletinDocService.getExamenBulletinDoc(examen);
    this.docSrc = doc.output('datauristring');  
  }
}
