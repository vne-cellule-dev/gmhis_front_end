import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { PageList } from 'src/app/_models/page-list.model';
import { NotificationService } from 'src/app/_services/notification.service';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';
import { SubSink } from 'subsink';
import { ICashRegister } from '../cash-register.model';
import { CashRegisterService } from '../cash-register.service';

@Component({
  selector: 'app-cash-register-list',
  templateUrl: './cash-register-list.component.html',
  styleUrls: ['./cash-register-list.component.scss'],
})
export class CashRegisterListComponent implements OnInit {
  private subs = new SubSink();

  public searchForm: FormGroup;

  public cashRegister: ICashRegister;

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
    private cashRegisterService: CashRegisterService,
    private notificationService: NotificationService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.initform();
    this.getCashRegister();
  }

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
    this.getCashRegister();
  }

  public getCashRegister() {
    this.showloading = true;
    this.subs.add(
      this.cashRegisterService.findAll(this.searchForm.value).subscribe(
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
    this.getCashRegister();
  }

  onPageChange(event) {
    this.searchForm.get('page').setValue(event - 1);
    this.getCashRegister();
  }

  openAddForm(addFormContent) {
    this.modalService.open(addFormContent, { size: 'lg' });
  }

  openUpdateForm(updateFormContent, item?) {
    this.cashRegister = item;
    console.log(this.cashRegister);
    this.modalService.open(updateFormContent, { size: 'lg' });
  }

  addCashRegister() {
    this.modalService.dismissAll();
    this.notificationService.notify(
      NotificationType.SUCCESS,
      'Caisse ajoutée avec succès'
    );
    this.getCashRegister();
  }

  updateCashRegister() {
    this.modalService.dismissAll();
    this.notificationService.notify(
      NotificationType.SUCCESS,
      'Caisse modifiée avec succès'
    );
    this.getCashRegister();
  }

  rowSelected(cashRegister: ICashRegister, index: number) {
    this.currentIndex = index;
    this.cashRegister = cashRegister;
  }
}
