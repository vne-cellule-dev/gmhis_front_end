import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Country } from 'src/app/_models/country.model';
import { PageList } from 'src/app/_models/page-list.model';
import { CountryService } from 'src/app/_services/country.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';

import { SubSink } from 'subsink';

@Component({
  selector: 'app-list-country',
  templateUrl: './list-country.component.html',
  styleUrls: ['./list-country.component.scss']
})
export class ListCountryComponent implements OnInit, OnDestroy {
    private subs = new SubSink();

  faSort = faSort;

  /*   
   collection of roles
  */
  public items: Country[];

  /**
   * table sorting direction
   */
  public sortDirection = "desc";

  /**
   * table sort tooltip msg
   */
  public tooltipMsg = "Trier par ordre croissant";

  /**
   * search form
   */
  public searchForm: FormGroup;

  /**
   * the number of item to display per page
   */
  selectedSize: number;

  sizes = [
    { id: 50, value: 50 },
    { id: 100, value: 100 },
    { id: 150, value: 150 },
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

  country: Country;

  /**
    * selected row index
    */
  currentIndex: number;

  /**
  * handle the spinner
  */
  showloading: boolean = false;


  constructor(
    private countryService: CountryService,
    private notificationService: NotificationService
  ) { }

  // Unsubscribe when the component dies
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.initform();
    this.getCountries();
  }

  /**
   * init form
   */
  initform() {
    this.searchForm = new FormGroup({
      name: new FormControl(""),
      isoCode: new FormControl(""),
      page: new FormControl(0),
      size: new FormControl(50),
      sort: new FormControl("id,asc"),
    })
  }

  /*
    method to fetch all users
  */
  public getCountries() {
    this.showloading = true;
    this.subs.add(
      this.countryService.findAll(this.searchForm.getRawValue()).subscribe(
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
    this.getCountries();
  }

  onTableSizeChange(): void {
    this.getCountries();
  }

  onIsActiveChange(): void {
    this.getCountries();
  }

  onKeyUp(): void {
    this.getCountries();
  }

  /**
   * 
   * @param column 
   */
  sortBy(column) {
    if (this.sortDirection == 'desc') {
      this.sortDirection = 'asc';
      this.tooltipMsg = "Trier par ordre decroissant";
    } else if (this.sortDirection == 'asc') {
      this.sortDirection = 'desc';
      this.tooltipMsg = "Trier par ordre croissant";
    }

    this.searchForm.get('sort').setValue(column + "," + this.sortDirection);
    this.getCountries();
  }

  rowSelected(country: Country, index: number) {
    this.currentIndex = index;
    this.country = country;
  }
}
