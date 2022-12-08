import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { PageList } from 'src/app/_models/page-list.model';
import { NotificationService } from 'src/app/_services/notification.service';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';
import { SubSink } from 'subsink';
import { PrescriptionDocumentService } from '../services/prescription-document.service';
import { PrescriptionService } from '../services/prescription.service';

@Component({
  selector: 'app-prescription-list',
  templateUrl: './prescription-list.component.html',
  styleUrls: ['./prescription-list.component.scss']
})
export class PrescriptionListComponent implements OnInit {

  private subs = new SubSink();

  public searchForm: FormGroup;

  public items: any;

  showloading: boolean = false;

  @Input()
  patientId : number;

  @Output('updatePatientPrescriptionNumber') updatePatientPrescriptionNumber: EventEmitter<any> =
  new EventEmitter();

  prescription : any;


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
  constructor(
    private prescriptionService: PrescriptionService,
    private notificationService: NotificationService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private datePipe: DatePipe,
    private prescriptionDocumentService  : PrescriptionDocumentService
  ) { }

  ngOnInit(): void {
    this.initform();
    console.log(this.patientId);
    
    let dateConvert: string;
    this.getPrescription();
  }

  initform() {
    this.searchForm = new FormGroup({
      patient: new FormControl(this.patientId),
      page: new FormControl(0),
      size: new FormControl(10),
      sort: new FormControl('id,desc'),
    });
  }

  public getPrescription() {
    this.showloading = true;
    this.subs.add(
      this.prescriptionService.findAll(this.searchForm.value).subscribe(
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
    this.getPrescription();
  }

  openAddForm(addFormContent) {
    this.modalService.open(addFormContent, { size: 'xl' });
  }

  openUpdateForm(updateFormContent, item?) {
    this.prescription = item;
    this.modalService.open(updateFormContent, { size: 'xl' });
  }

  onSearchValueChange(): void {
    this.getPrescription();
  }

  addPrescription() {
    this.modalService.dismissAll();
    this.notificationService.notify(
      NotificationType.SUCCESS,
      "Ordonnance crée avec succès"
    );
    this.updatePatientPrescriptionNumber.emit();
    this.getPrescription();
  }

  printPrescription(printContent, item : any){
      this.prescriptionService.getPrescriptionDetails(item["id"]).subscribe(
        (response : any) => {
          console.log(response);
          
          this.prescriptionService.getPrescriptionItemByPrescriptionId(response["id"]).subscribe(
            (res : any) => {
              this.modalService.open(printContent, { size: 'xl' });
              let doc = this.prescriptionDocumentService.getPrescriptionDocument(response,res);
              this.docSrc = doc.output('datauristring');
            }
          )
        }
      ) 
  }
}
