import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { PageList } from 'src/app/_models/page-list.model';
import { NotificationService } from 'src/app/_services/notification.service';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';
import { SubSink } from 'subsink';
import { ActCategory } from '../actCategory.model';
import { ActCategoryService } from '../service/act-category.service';

@Component({
  selector: 'app-act-category-list',
  templateUrl: './act-category-list.component.html',
  styleUrls: ['./act-category-list.component.scss'],
})
export class ActCategoryListComponent implements OnInit {
  private subs = new SubSink();

  public searchForm: FormGroup;

  public actCategory: ActCategory;

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
    private actCategoryService: ActCategoryService,
    private notificationService: NotificationService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.initform();
    this.getSimpleList();
    this.getactCategories();
    // const actCategory = {
    //   active: true,
    //   id: 11,
    //   name: "CAAAARDIO"
    // }
    // this.actCategoryService.updateActCategory(actCategory).subscribe(
    //   (res : any)=>{
    //     console.log(res);

    //   },
    //   (error : HttpErrorResponse) =>{
    //     console.error(error.error.message);

    //   }
    // )
  }

  getSimpleList() {
    this.actCategoryService.findActSimpleList().subscribe((response: any) => {
      console.log(response);
    });
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
    this.getactCategories();
  }

  public getactCategories() {
    this.showloading = true;
    this.subs.add(
      this.actCategoryService.findAll(this.searchForm.value).subscribe(
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
    this.getactCategories();
  }

  onPageChange(event) {
    this.searchForm.get('page').setValue(event - 1);
    this.getactCategories();
  }

  openAddForm(addFormContent) {
    this.modalService.open(addFormContent, { size: 'lg' });
  }

  openUpdateForm(updateFormContent, item?) {
    this.actCategory = item;
    console.log(this.actCategory);
    this.modalService.open(updateFormContent, { size: 'lg' });
  }

  addActCategory() {
    this.modalService.dismissAll();
    this.notificationService.notify(
      NotificationType.SUCCESS,
      "spécialité d'acte ajoutée avec succès"
    );
    this.getactCategories();
  }

  updateActCategory() {
    this.modalService.dismissAll();
    this.notificationService.notify(
      NotificationType.SUCCESS,
      "spécialité d'acte modifiée avec succès"
    );
    this.getactCategories();
  }

  rowSelected(actCategory: ActCategory, index: number) {
    this.currentIndex = index;
    this.actCategory = actCategory;
  }
}
