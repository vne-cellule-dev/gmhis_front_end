import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SubSink } from 'subsink';

import {NotificationService, CashRegisterActivityService,UserService} from 'src/app/_services';
import { ICashRegisterActivity } from 'src/app/_models';


import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { PageList } from 'src/app/_models/page-list.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';
import { CashRegisterService } from 'src/app/cash-register/cash-register.service';

@Component({
  selector: 'app-cractivity-list',
  templateUrl: './cractivity-list.component.html',
  styleUrls: ['./cractivity-list.component.scss']
})
export class CractivityListComponent implements OnInit {

  private subs = new SubSink();
  searchForm : FormGroup;
  public crActivity : ICashRegisterActivity;
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
    { id: 100, value: 100 }
  ];

  states = [
    { id: true, value: 'ouverte' },
    { id: false, value: 'fermée' },
  ];

  /* A variable that is used to show a loader when the data is being fetched from the server. */
  showLoader : boolean = false;
  currentIndex: number;
  cashRegistersNameAndId: any;
  cashiers: any;

  constructor(
    private crActivityService : CashRegisterActivityService,
    private notificationService: NotificationService,
    private cashRegisterService : CashRegisterService,
    private cashierService : UserService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {    
   this.initSearchForm();
   this.getCrActivity();
   this.findActiveCashRegisterNameAndId();
   this.findActiveUserNameAndId();
  }


  initSearchForm(){
    this.searchForm = new FormGroup({
      cashier : new FormControl(''),
      cashRegister: new FormControl(''),
      state : new FormControl(null),
      page: new FormControl(0),
      size: new FormControl(50),
      sort: new FormControl('id,desc'),
    })
  }


  public getCrActivity(){
    this.showLoader = true;
    this.subs.add(
      this.crActivityService.getPaginatedListOfCrActivity(this.searchForm.value).subscribe(
        (response: PageList) => {
          console.log(response);
          this.showLoader = false;
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
          this.showLoader = false;
          this.notificationService.notify(
            NotificationType.ERROR,
            errorResponse.error.message
          );
        }
      )
    )
  }

  onPageChange(event) {
    this.searchForm.get('page').setValue(event - 1);
    this.getCrActivity();
  }

  openAddForm(addFormContent) {
    this.modalService.open(addFormContent, { size: 'lg' });
  }

  openUpdateForm(updateFormContent, item?) {
    this.crActivity = item;
    console.log(this.crActivity);
    
    this.modalService.open(updateFormContent, { size: 'lg' });
  }

  addCrActivity() {
    this.modalService.dismissAll();
    this.notificationService.notify(
      NotificationType.SUCCESS,
      'Acitivité de caisse ajoutée avec succès'
    );
    this.getCrActivity();
  }

  updateCrActivity() {
    this.modalService.dismissAll();
    this.notificationService.notify(
      NotificationType.SUCCESS,
      'Acitivité de caisse modifiée avec succès'
    );
    this.getCrActivity();
  }

  rowSelected(crActivity: ICashRegisterActivity, index: number) {
    this.currentIndex = index;
    this.crActivity = crActivity;
  }


  private findActiveCashRegisterNameAndId(){
    this.cashRegisterService.findCashRegisternameAndIdList().subscribe(
      (response : any) => {
        this.cashRegistersNameAndId = response;        
      },
      (errorResponse : HttpErrorResponse) => {
        this.showLoader = false;
        this.notificationService.notify(
          NotificationType.ERROR,
          errorResponse.error.message
        ); 
      }
    )
  }

  private findActiveUserNameAndId(){
    this.cashierService.findAllActive().subscribe(
      (response : any) => {
        this.cashiers = response;
        console.log(this.cashiers);
                
      },
      (errorResponse : HttpErrorResponse) => {
        this.showLoader = false;
        this.notificationService.notify(
          NotificationType.ERROR,
          errorResponse.error.message
        ); 
      }
    )
  }
}
