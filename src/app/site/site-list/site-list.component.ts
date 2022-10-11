import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { SiteAuthorityEnum } from 'src/app/_enum/SiteAuthority.enum';
import { Commune } from 'src/app/_models/commune.model';
import { PageList } from 'src/app/_models/page-list.model';
import { Site } from 'src/app/_models/site.model';
import { CommuneService } from 'src/app/_services/commune.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { SiteService } from 'src/app/_services/site.service';
import { UserService } from 'src/app/_services/user.service';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';
import { SubSink } from 'subsink';
@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.scss']
})
export class SiteListComponent implements OnInit {
  private subs = new SubSink();
  
  faSort = faSort;

  /**
   * collection of Site
   */
  public items: Site[];

  public site: Site;

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
  communes: Commune[];

  constructor(
    private notificationService: NotificationService,
    private siteService : SiteService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private userService: UserService,
    private communeService : CommuneService
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
    this.getCommunes();
    this.getSite();
  }

  ngAfterViewInit() { }

  initform() {
    this.searchForm = new FormGroup({
      nom: new FormControl(""),
      communeId: new FormControl(null),
      page: new FormControl(0),
      size: new FormControl(10),
      sort: new FormControl("id,desc"),
    })
  }

/**
* method to fetch carriers
*/
  public getSite() {
    this.showloading = true;
    this.subs.add(
      this.siteService.getSite(this.searchForm.value).subscribe(
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
    this.getSite();
  }

  onSearchearchValueChange(): void {
    this.getSite();
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
    this.getSite();
  }

  selectItem(item) {
   this.site = item;
  }

  openAddForm(addFormContent) {
    this.modalService.open(addFormContent, { size: 'lg' });
  }

  openUpdateForm(updateFormContent, item) {
    this.site = item;
    this.modalService.open(updateFormContent, { size: 'lg' });
  }

  openDetailsForm(detailFormContent, item) {
    this.site = item;
    this.details = true;
    this.modalService.open(detailFormContent, { size: 'lg', scrollable: true });
  }

  addSite() {
    this.modalService.dismissAll();
    this.notificationService.notify(NotificationType.SUCCESS, "Site ajouté avec succès");
    this.getSite();
  }

  updateSite() {
    this.modalService.dismissAll();
    this.notificationService.notify(NotificationType.SUCCESS, "Site modifié avec succès");
    this.getSite();
  }

  rowSelected(article: Site, index: number) {
    this.currentIndex = index;
   this.site = article;
  }

  public get canListSite() {
    return this.userService.checkAuthority(SiteAuthorityEnum.SITE_LIST);
  }

  public get canAddSite() {
    return this.userService.checkAuthority(SiteAuthorityEnum.SITE_ADD);
  }

  public get canUpdateSite() {
    return this.userService.checkAuthority(SiteAuthorityEnum.SITE_UPDATE);
  }

 getCommunes(){
   this.subs.add(
     this.communeService.getAllCommune().subscribe(
       (response : Commune[]) =>{
         this.communes = response;         
       },
       (errorResponse : HttpErrorResponse) =>{
        this.notificationService.notify(NotificationType.ERROR, errorResponse.error.message);
       }

     )
   )
 }


}
