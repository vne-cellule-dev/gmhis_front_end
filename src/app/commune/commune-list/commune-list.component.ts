import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CommuneAuthorityEnum } from 'src/app/_enum/communeAuthority.enum';
import { Commune } from 'src/app/_models/commune.model';
import { PageList } from 'src/app/_models/page-list.model';
import { CommuneService } from 'src/app/_services/commune.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { UserService } from 'src/app/_services/user.service';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-commune-list',
  templateUrl: './commune-list.component.html',
  styleUrls: ['./commune-list.component.scss']
})
export class CommuneListComponent implements OnInit {
    
  private subs = new SubSink();
  
  faSort = faSort;

  /**
   * collection of commune
   */
  public items: Commune[];

  public commune: Commune;

  public sortDirection = "desc";

  public tooltipMsg = "Trier par ordre croissant";

  /**
   * search form
   */
  public searchForm: FormGroup;


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

  currentPage: number;
  empty: boolean;
  firstPage: boolean;
  lastPage: boolean;
  totalItems: number;
  totalPages: number;

  /**
  * selected row index
  */
  currentIndex: number;

  /**
  * handle the spinner
  */
  showloading: boolean = false;
  details: boolean;

  constructor(
    private notificationService: NotificationService,
    private communeService : CommuneService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private userService: UserService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  // Unsubscribe when the component dies
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.initform();
    this.getCommune();
  }

  ngAfterViewInit() { }

  initform() {
    this.searchForm = new FormGroup({
      name: new FormControl(""),
      page: new FormControl(0),
      size: new FormControl(10),
      sort: new FormControl("id,desc"),
    })
  }

/**
* method to fetch carriers
*/
  public getCommune() {
    this.showloading = true;
    this.subs.add(
      this.communeService.getCommune(this.searchForm.value).subscribe(
      (response: PageList) => {
        this.currentPage = response.currentPage + 1;
        this.empty = response.empty;
        this.firstPage = response.firstPage;
        this.items = response.items;     
        console.log(this.items);
                           
        this.lastPage = response.lastPage;
        this.selectedSize = response.size;
        this.totalItems = response.totalItems;
        this.totalPages = response.totalPages;
        this.showloading = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.showloading = false;
        this.notificationService.notify(NotificationType.ERROR, errorResponse.error.message);
      }
    ));

  }

  onPageChange(event) {
    this.searchForm.get("page").setValue(event - 1);
    this.getCommune();
  }

  onTableSizeChange(): void {
    this.getCommune();
  }

  onIsActiveChange(): void {
    this.getCommune();
  }

  onKeyUp(): void {
    this.getCommune();
  }

  sortBy(column) {
    if (this.sortDirection == 'desc') {
      this.sortDirection = 'asc';
      this.tooltipMsg = "Trier par ordre decroissant";
    } else if (this.sortDirection == 'asc') {
      this.sortDirection = 'desc';
      this.tooltipMsg = "Trier par ordre croissant";
    }

    this.searchForm.get('sort').setValue(column + "," + this.sortDirection);
    this.getCommune();
  }

  selectItem(item) {
   this.commune = item;
  }

  openAddForm(addFormContent) {
    this.modalService.open(addFormContent, { size: 'lg' });
  }

  openUpdateForm(updateFormContent, item) {
    this.commune = item;
    this.modalService.open(updateFormContent, { size: 'lg' });
  }

  openDetailsForm(detailFormContent, item) {
    this.commune = item;
    this.details = true;
    this.modalService.open(detailFormContent, { size: 'lg', scrollable: true });
  }

  addCommune() {
    this.modalService.dismissAll();
    this.notificationService.notify(NotificationType.SUCCESS, "commune ajouté avec succès");
    this.getCommune();
  }

  updateCommune() {
    this.modalService.dismissAll();
    this.notificationService.notify(NotificationType.SUCCESS, "commune modifié avec succès");
    this.getCommune();
  }

  rowSelected(article: Commune, index: number) {
    this.currentIndex = index;
   this.commune = article;
  }

  public get canListCommune() {
    return this.userService.checkAuthority(CommuneAuthorityEnum.COMMUNE_LIST);
  }

  public get canAddCommune() {
    return this.userService.checkAuthority(CommuneAuthorityEnum.COMMUNE_ADD);
  }

  public get canUpdateCommune() {
    return this.userService.checkAuthority(CommuneAuthorityEnum.COMMUNE_UPDATE);
  }



}
