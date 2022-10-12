import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CityAuthorityEnum } from 'src/app/_enum/cityAuthority.enum';
import { City } from 'src/app/_models/city.model';
import { PageList } from 'src/app/_models/page-list.model';
import { CityService } from 'src/app/_services/city.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { UserService } from 'src/app/_services/user.service';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent implements OnInit {


  private subs = new SubSink();
  
  faSort = faSort;

  /**
   * collection of city
   */
  public items: City[];

  public city: City;

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
    private cityService : CityService,
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
    this.getCity();
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
  public getCity() {
    this.showloading = true;
    this.subs.add(
      this.cityService.getCity(this.searchForm.value).subscribe(
      (response: PageList) => {
        this.currentPage = response.currentPage + 1;
        this.empty = response.empty;
        this.firstPage = response.firstPage;
        this.items = response.items;                
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
    this.getCity();
  }

  onTableSizeChange(): void {
    this.getCity();
  }

  onIsActiveChange(): void {
    this.getCity();
  }

  onKeyUp(): void {
    this.getCity();
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
    this.getCity();
  }

  selectItem(item) {
   this.city = item;
  }

  openAddForm(addFormContent) {
    this.modalService.open(addFormContent, { size: 'lg' });
  }

  openUpdateForm(updateFormContent, item) {
    this.city = item;
    this.modalService.open(updateFormContent, { size: 'lg' });
  }

  openDetailsForm(detailFormContent, item) {
    this.city = item;
    this.details = true;
    this.modalService.open(detailFormContent, { size: 'lg', scrollable: true });
  }

  addCity() {
    this.modalService.dismissAll();
    this.notificationService.notify(NotificationType.SUCCESS, "ville ajouté avec succès");
    this.getCity();
  }

  updateCity() {
    this.modalService.dismissAll();
    this.notificationService.notify(NotificationType.SUCCESS, "ville modifié avec succès");
    this.getCity();
  }

  rowSelected(article: City, index: number) {
    this.currentIndex = index;
   this.city = article;
  }

  public get canListCity() {
    return this.userService.checkAuthority(CityAuthorityEnum.CITY_LIST);
  }

  public get canAddCity() {
    return this.userService.checkAuthority(CityAuthorityEnum.CITY_ADD);
  }

  public get canUpdateCity() {
    return this.userService.checkAuthority(CityAuthorityEnum.CITY_UPDATE);
  }



}
