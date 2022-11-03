import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { PageList } from 'src/app/_models/page-list.model';
import { NotificationService } from 'src/app/_services/notification.service';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';
import { SubSink } from 'subsink';
import { IInsuranceSubscriber } from '../insuranceSubscriber.model';
import { SubscriberService } from '../subscriber.service';

@Component({
  selector: 'app-subscriber-list',
  templateUrl: './subscriber-list.component.html',
  styleUrls: ['./subscriber-list.component.scss'],
})
export class SubscriberListComponent implements OnInit {
  private subs = new SubSink();

  public searchForm: FormGroup;

  public insuranceSubscriber: IInsuranceSubscriber;

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
  constructor(
    private insuranceSubscriberService: SubscriberService,
    private notificationService: NotificationService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.initform();
    this.getInsuranceSubscriber();
    const actGroup = {
      active: false,
      id: 0,
      name: 'INSURANCE SUBSCRIBER',
    };

    // this.actGroupService.createActGroup(actGroup).subscribe(
    //   (res : any)=>{
    //     console.log(res);

    //   },
    //   (error : HttpErrorResponse) =>{
    //     console.error(error.error.message);

    //   }
    // )
  }

  // public getAntecedent() {
  //   this.showloading = true;
  //   this.subs.add(
  //     this.actCodeService.findAll(this.searchForm.value).subscribe(
  //       (response: PageList) => {
  //         console.log(response);
  //         this.showloading = false;
  //         this.currentPage = response.currentPage + 1;
  //         this.empty = response.empty;
  //         this.firstPage = response.firstPage;
  //         this.items = response.items;
  //         this.lastPage = response.lastPage;
  //         this.selectedSize = response.size;
  //         this.totalItems = response.totalItems;
  //         this.totalPages = response.totalPages;
  //       },
  //       (errorResponse: HttpErrorResponse) => {
  //         this.showloading = false;
  //         this.notificationService.notify(
  //           NotificationType.ERROR,
  //           errorResponse.error.message
  //         );
  //       }
  //     )
  //   );
  // }

  initform() {
    this.searchForm = new FormGroup({
      name: new FormControl(''),
      active: new FormControl(null),
      page: new FormControl(0),
      size: new FormControl(10),
      sort: new FormControl('id,desc'),
    });
  }

  onSearchValueChange(): void {
    this.getInsuranceSubscriber();
  }

  public getInsuranceSubscriber() {
    this.showloading = true;
    this.subs.add(
      this.insuranceSubscriberService.findAll(this.searchForm.value).subscribe(
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
    this.getInsuranceSubscriber();
  }

  onPageChange(event) {
    this.searchForm.get('page').setValue(event - 1);
    this.getInsuranceSubscriber();
  }

  openAddForm(addFormContent) {
    this.modalService.open(addFormContent, { size: 'lg' });
  }

  openUpdateForm(updateFormContent, item?) {
    this.insuranceSubscriber = item;
    console.log(this.insuranceSubscriber);
    this.modalService.open(updateFormContent, { size: 'lg' });
  }

  addInsuranceSubscriber() {
    this.modalService.dismissAll();
    this.notificationService.notify(
      NotificationType.SUCCESS,
      "Etablissement garant ajoutée avec succès"
    );
    this.getInsuranceSubscriber();
  }

  updateInsuranceSubscriber() {
    this.modalService.dismissAll();
    this.notificationService.notify(
      NotificationType.SUCCESS,
      "Etablissement garant modifiée avec succès"
    );
    this.getInsuranceSubscriber();
  }

  rowSelected(insuranceSubscriber: IInsuranceSubscriber, index: number) {
    this.currentIndex = index;
    this.insuranceSubscriber = insuranceSubscriber;
  }
}
