import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { InsuranceService } from 'src/app/insurance/insurance.service';
import { PageList } from 'src/app/_models/page-list.model';
import { NotificationService } from 'src/app/_services/notification.service';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';
import { SubSink } from 'subsink';
import { InvoiceService } from '../service/invoice.service';

@Component({
  selector: 'app-insurance-bill',
  templateUrl: './insurance-bill.component.html',
  styleUrls: ['./insurance-bill.component.scss']
})
export class InsuranceBillComponent implements OnInit {

  private subs = new SubSink();

  public searchForm: FormGroup;

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
  bill: any;
  insurances: any;

  searchDateRange : string;

  constructor(
    private invoiceService: InvoiceService,
    private notificationService: NotificationService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private insuranceService : InsuranceService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
   
    this.initform();
    console.log(this.actServicesNameAndId);
    this.getInsuranceBill();
    this.getAllInsuranceActiveIdAndName();
  }

  initform() {
    this.searchForm = new FormGroup({
      insuranceId: new FormControl(""),
      date : new FormControl(""),
      page: new FormControl(0),
      size: new FormControl(50),
      sort: new FormControl('id,desc'),
    });
  }

  onSearchValueChange(): void {
    this.getInsuranceBill();
  }

  onDateChange(range): void {
    console.log(range);
  }
  

  public getInsuranceBill() {

    let start = null;
    let end = null;
    let date = this.searchForm.get("date").value;
  
    if (typeof (date) == "object") {
      start = date.start.toISOString().split('T')[0];
      end = (!date.end) ? date.start.toISOString().split('T')[0] : date.end.toISOString().split('T')[0]
      this.searchDateRange = start + "," + end;
      console.log(this.searchDateRange);  
      this.searchForm.get("date").setValue(this.searchDateRange);
    }
    this.showloading = true;
    this.subs.add(
      this.invoiceService.findAllInsuranceBil(this.searchForm.value).subscribe(
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
          if (typeof (date) == "object") {
            this.searchForm.get("date").setValue(date);
          }
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
    this.getInsuranceBill();
  }

  onPageChange(event) {
    this.searchForm.get('page').setValue(event - 1);
    this.getInsuranceBill();
  }

  // openAddForm(addFormContent) {
  //   this.modalService.open(addFormContent, { size: 'xl' });
  // }

  // openUpdateForm(updateFormContent, item?) {
  //   this.invoice = item;
  //   console.log(this.invoice);
  //   this.modalService.open(updateFormContent, { size: 'xl' });
  // }

  // openPaymentForm(paymentFormContent, item?) {
  //   this.invoice = item;
  //   this.makeInvoice = false;
  //   console.log(this.invoice);
  //   this.modalService.open(paymentFormContent, { size: 'xl' });
  // }

  updateAdmission() {
    this.modalService.dismissAll();
    this.notificationService.notify(
      NotificationType.SUCCESS,
      'admission modifié avec succès'
    );
    this.getInsuranceBill();
  }

addInvoice(){
  this.modalService.dismissAll();
  this.notificationService.notify(
    NotificationType.SUCCESS,
    'facture crée avec succès'
  );
  this.getInsuranceBill();
}


addPayment(){
  this.modalService.dismissAll();
  this.notificationService.notify(
    NotificationType.SUCCESS,
    'facture encaissée avec succès'
  );
  this.getInsuranceBill();
}


  rowSelected(bill: any, index: number) {
    this.currentIndex = index;
    this.bill = bill;
  }

  showActionsList(){
    this.acctionsList = !this.acctionsList;
  }


  getAllInsuranceActiveIdAndName():void {
    this.subs.add(
      this.insuranceService.getAllInsuranceActive().subscribe(
        (response : any) => {
          this.insurances = response;
          console.log(this.insurances);
          
        },
        (errorResponse : HttpErrorResponse) =>{
          this.notificationService.notify(NotificationType.ERROR, errorResponse.message);
        }
      )
    )
  }

 

  // printInvoice(printContent, invoice) {
  //   this.invoiceService.getInvoiceDetail(invoice.id).subscribe(
  //     (res : any) => {
  //     console.log(res);
  //          this.actservice.getActsByBillId(res["billId"]).subscribe(
  //       (response : any) => {
  //         this.acts = response;
  //         console.log(this.acts);
  //         this.modalService.open(printContent, { size: 'xl' });
  //         let doc = this.invoiceDocumentService.getInvoiceDocument(res,  this.acts);
  //         this.docSrc = doc.output('datauristring');  
  //       }
  //     )
    
  //     }
  //   )
  // }

}
