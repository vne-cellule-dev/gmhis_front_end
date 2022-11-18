import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActService } from 'src/app/act/act/service/act.service';
import { InvoiceDocumentService } from 'src/app/invoice/service/document/invoice-document.service';
import { ServiceService } from 'src/app/service/service/service.service';
import { PageList } from 'src/app/_models/page-list.model';
import { NotificationService } from 'src/app/_services/notification.service';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';
import { SubSink } from 'subsink';
import { IAdmission } from '../model/admission';
import { AdmissionService } from '../service/admission.service';

@Component({
  selector: 'app-admission-list',
  templateUrl: './admission-list.component.html',
  styleUrls: ['./admission-list.component.scss']
})
export class AdmissionListComponent implements OnInit {

  private subs = new SubSink();

  public searchForm: FormGroup;

  public admission: IAdmission;

  public makeInvoiceByAdmission : boolean;

  currentPage: number;
  empty: boolean;
  firstPage: boolean;
  lastPage: boolean;
  totalItems: number;
  totalPages: number;

  public items: any;

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

  actives = [
    { id: true, value: 'Actif' },
    { id: false, value: 'Inactif' },
  ];

  admissionStatus =  [
    {id: 'R' , value: 'Non Facturée'},
    {id: 'B' , value: 'Facturée'},
  ]

  showloading: boolean = false;
  currentIndex: number;

  acctionsList : boolean = false;
  actServicesNameAndId: any;
  activeActNameAndId: any;
  docSrc: string;

  searchDateRange : string;

  constructor(
    private admissionService: AdmissionService,
    private notificationService: NotificationService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private serviceService : ServiceService,
    private actService : ActService,
    private invoiceDocumentService : InvoiceDocumentService

  ) {}

  ngOnInit(): void {
   
    this.initform();
    this.findActiveAServiceNameAndId();
    this.findActiveActNameAndId();
    console.log(this.actServicesNameAndId);
    this.getPatient();
  }

  initform() {
    this.searchForm = new FormGroup({
      admissionNumber: new FormControl(''),
      admissionStatus: new FormControl('R'),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      patientExternalId: new FormControl(''),
      cellPhone: new FormControl(''),
      cnamNumber: new FormControl(''),
      idCardNumber: new FormControl(''),
      practician: new FormControl(null),
      service: new FormControl(null),
      faciliTyId : new FormControl("2bd56b2f-80ed-4a8c-a496-cd7f8b676f42"),
      act: new FormControl(""),
      date: new FormControl(null),
      page: new FormControl(0),
      size: new FormControl(50),
      sort: new FormControl('id,desc'),
    });
  }

  onSearchValueChange(): void {
    // let fromDate = this.searchForm.get('fromDate').value.toISOString().slice(0, 10);
    // let toDate = this.searchForm.get('toDate').value.toISOString().slice(0, 10);
    // this.searchForm.get('fromDate').setValue(new Date(fromDate));
    // console.log(fromDate);
    // console.log(toDate);
    this.getPatient();
  }

  public getPatient() {
    let start = null;
    let end = null;
    let date = this.searchForm.get("date").value;
  
    this.showloading = true;
    this.subs.add(
      this.admissionService.findAll(this.searchForm.value).subscribe(
        (response: PageList) => {
          console.log(response);
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
    this.getPatient();
  }

  onPageChange(event) {
    this.searchForm.get('page').setValue(event - 1);
    this.getPatient();
  }

  openAddForm(addFormContent) {
    this.modalService.open(addFormContent, { size: 'xl' });
  }

  openUpdateForm(updateFormContent, item?) {
    this.admission = item;
    console.log(this.admission);
    this.modalService.open(updateFormContent, { size: 'xl' });
  }

  openInvoiceForm(invoiceFormContent, item?) {
    this.admission = item;
    this.makeInvoiceByAdmission = true;
    console.log(this.admission);
    this.modalService.open(invoiceFormContent, { size: 'xl' });
  }

  updateAdmission() {
    this.modalService.dismissAll();
    this.notificationService.notify(
      NotificationType.SUCCESS,
      'admission modifié avec succès'
    );
    this.getPatient();
  }

addInvoice(){
  this.modalService.dismissAll();
  this.notificationService.notify(
    NotificationType.SUCCESS,
    'facture crée avec succès'
  );
  this.getPatient();
}


  rowSelected(admission: IAdmission, index: number) {
    this.currentIndex = index;
    this.admission = admission;
  }

  showActionsList(){
    this.acctionsList = !this.acctionsList;
  }

  public findActiveAServiceNameAndId(){
    this.serviceService.findActiveServiceNameAndId().subscribe(
      (response : any) => { 
        this.actServicesNameAndId = response;
        console.log(this.actServicesNameAndId);
      },
      (errorResponse : HttpErrorResponse) => {
        this.showloading = false;
        this.notificationService.notify(
          NotificationType.ERROR,
          errorResponse.error.message
        ); 
      }
    )
  }
  public findActiveActNameAndId(){
    this.actService.getListOfActiveAct().subscribe(
      (response : any) => {
        this.activeActNameAndId = response; 
      },
      (errorResponse : HttpErrorResponse) => {
        this.showloading = false;
        this.notificationService.notify(
          NotificationType.ERROR,
          errorResponse.error.message
        ); 
      }
    )
  }


  printInvoice(printContent) {
    
    this.modalService.open(printContent, { size: 'xl' });

    // let doc = this.invoiceDocumentService.getInvoiceDocument();
    // this.docSrc = doc.output('datauristring');

  
  }

}
