import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActService } from 'src/app/act/act/service/act.service';
import { PageList } from 'src/app/_models/page-list.model';
import { InvoiceSavService } from 'src/app/_services/afterSalesService/invoice-sav.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';
import { SubSink } from 'subsink';
import { IInvoice } from '../models/invoice';
import { InvoiceDocumentService } from '../service/document/invoice-document.service';
import { InvoiceService } from '../service/invoice.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {

  private subs = new SubSink();

  public searchForm: FormGroup;

  public invoice: IInvoice;

  docSrc: any;

  public makeInvoice : boolean;

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

  showloading: boolean = false;
  currentIndex: number;

  acctionsList : boolean = false;
  actServicesNameAndId: any;
  activeActNameAndId: any;

  billStatus =  [
    {id: 'R' , value: 'Non Encaissé'},
    {id: 'C' , value: 'Encaissé'},
  ]
  acts: any;
  constructor(
    private invoiceService: InvoiceService,
    private notificationService: NotificationService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private invoiceDocumentService : InvoiceDocumentService,
    private actservice : ActService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
   
    this.initform();
    console.log(this.actServicesNameAndId);
    this.getPatient();
  }

  initform() {
    this.searchForm = new FormGroup({
      billNumber: new FormControl(''),
      admissionNumber: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      patientExternalId: new FormControl(''),
      cellPhone: new FormControl(''),
      cnamNumber: new FormControl(''),
      idCardNumber: new FormControl(null),
      convention: new FormControl(null),
      insurance: new FormControl(null),
      subscriber: new FormControl(null),
      fromDate: new FormControl(null),
      toDate: new FormControl(null),
      billStatus: new FormControl("R"),
      page: new FormControl(0),
      size: new FormControl(50),
      sort: new FormControl('id,desc'),
    });
  }

  onSearchValueChange(): void {
    this.getPatient();
  }

  public getPatient() {
    this.showloading = true;
    this.subs.add(
      this.invoiceService.findAll(this.searchForm.value).subscribe(
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

  // openAddForm(addFormContent) {
  //   this.modalService.open(addFormContent, { size: 'xl' });
  // }

  // openUpdateForm(updateFormContent, item?) {
  //   this.invoice = item;
  //   console.log(this.invoice);
  //   this.modalService.open(updateFormContent, { size: 'xl' });
  // }

  openPaymentForm(paymentFormContent, item?) {
    this.invoice = item;
    this.makeInvoice = false;
    console.log(this.invoice);
    this.modalService.open(paymentFormContent, { size: 'xl' });
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


addPayment(){
  this.modalService.dismissAll();
  this.notificationService.notify(
    NotificationType.SUCCESS,
    'facture encaissée avec succès'
  );
  this.getPatient();
}


  rowSelected(invoice: IInvoice, index: number) {
    this.currentIndex = index;
    this.invoice = invoice;
  }

  showActionsList(){
    this.acctionsList = !this.acctionsList;
  }


 

  printInvoice(printContent, invoice) {
    this.invoiceService.getInvoiceDetail(invoice.id).subscribe(
      (res : any) => {
      console.log(res);
           this.actservice.getActsByBillId(res["billId"]).subscribe(
        (response : any) => {
          this.acts = response;
          console.log(this.acts);
          this.modalService.open(printContent, { size: 'xl' });
          let doc = this.invoiceDocumentService.getInvoiceDocument(res,  this.acts);
          this.docSrc = doc.output('datauristring');  
        }
      )
    
      }
    )
  }
}
