import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { PageList } from 'src/app/_models/page-list.model';
import { NotificationService } from 'src/app/_services/notification.service';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';
import { SubSink } from 'subsink';
import { ActCategoryService } from '../../category/service/act-category.service';
import { Act } from '../models/act';
import { ActService } from '../service/act.service';

@Component({
  selector: 'app-act-list',
  templateUrl: './act-list.component.html',
  styleUrls: ['./act-list.component.scss']
})
export class ActListComponent implements OnInit {

  private subs = new SubSink();

  public searchForm: FormGroup;

  public act: Act;

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
  actCategoriesNameAndId: any;
  constructor(
    private actService: ActService,
    private notificationService: NotificationService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private actCategoryService : ActCategoryService
  ) {}

  ngOnInit(): void {
    this.initform();
    this.getPaginatedListOfAct();
    this.findActiveActCategoryNameAndId()
  }



  initform() {
    this.searchForm = new FormGroup({
      name: new FormControl(''),
      category: new FormControl(''),
      active: new FormControl(null),
      page: new FormControl(0),
      size: new FormControl(50),
      sort: new FormControl('id,desc'),
    });
  }

  onSearchValueChange(): void {
    this.getPaginatedListOfAct();
  }

  public getPaginatedListOfAct() {
    this.showloading = true;
    this.subs.add(
      this.actService.getPaginatedListOfAct(this.searchForm.value).subscribe(
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
    this.getPaginatedListOfAct();
  }

  onPageChange(event) {
    this.searchForm.get('page').setValue(event - 1);
    this.getPaginatedListOfAct();
  }

  openAddForm(addFormContent) {
    this.modalService.open(addFormContent, { size: 'lg' });
  }

  openUpdateForm(updateFormContent, item?) {
    this.act = item;
    console.log(this.act);
    this.modalService.open(updateFormContent, { size: 'lg' });
  }

  addAct() {
    this.modalService.dismissAll();
    this.notificationService.notify(
      NotificationType.SUCCESS,
      "Acte ajouté avec succès"
    );
    this.getPaginatedListOfAct();
  }

  updateAct() {
    this.modalService.dismissAll();
    this.notificationService.notify(
      NotificationType.SUCCESS,
      "Acte modifié avec succès"
    );
    this.getPaginatedListOfAct();
  }

  rowSelected(act: Act, index: number) {
    this.currentIndex = index;
    this.act = act;
  }

  private findActiveActCategoryNameAndId(){
    this.actCategoryService.findActiveActCategoryNameAndId().subscribe(
      (response : any) => {
        this.actCategoriesNameAndId = response;
        console.log("actCategoriesNameAndId",this.actCategoriesNameAndId);
        
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

}
