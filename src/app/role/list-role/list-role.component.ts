import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PageList } from 'src/app/_models/page-list.model';
import { Role } from 'src/app/_models/role.model';
import { NotificationService } from 'src/app/_services/notification.service';
import { RoleService } from 'src/app/_services/role.service';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/_services/user.service';
import { RoleAuthorityEnum } from 'src/app/_enum/roleAuthorityEnum';

import { SubSink } from 'subsink';

@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.scss'],
  // add NgbModalConfig and NgbModal to the component providers
  providers: [NgbModalConfig, NgbModal]
})


export class ListRoleComponent implements OnInit, OnDestroy {

  private subs = new SubSink();

  faSort = faSort;

  /*   
   collection of roles
  */
  public items: Role[];

  /**
   * the role
   */
  public role: Role;

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
    * define isActive options
  */
  isActive = [
    { id: true, value: "Rôles actifs" },
    { id: false, value: "Rôle mis en sommeil" },
  ];

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

  /**
    * selected row index
    */
  currentIndex: number;

  /* 
   handle the spinner
 */
  showloading: boolean = true;

  constructor(
    private notificationService: NotificationService,
    private roleService: RoleService,
    private userService: UserService,
    config: NgbModalConfig,
    private modalService: NgbModal,

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
    this.getRoles();
  }

  /**
   * init form
   */
  initform() {
    this.searchForm = new FormGroup({
      name: new FormControl(""),
      isActive: new FormControl(null),
      page: new FormControl(0),
      size: new FormControl(50),
      sort: new FormControl("id,desc"),
    })
  }

  /*
    method to fetch all users
  */
  public getRoles() {
    this.showloading = true;
    this.subs.add(
      this.roleService.findAll(this.searchForm.value).subscribe(
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
          console.log(errorResponse);
          
          this.notificationService.notify(NotificationType.ERROR, errorResponse.error.message);
        }
      ));
  }

  onPageChange(event) {
    this.searchForm.get("page").setValue(event - 1);
    this.getRoles();
  }

  onTableSizeChange(): void {
    this.getRoles();
  }

  onIsActiveChange(): void {
    this.getRoles();
  }

  onKeyUp(): void {
    this.getRoles();
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
    this.getRoles();
  }

  selectItem(item) {
    this.role = item;
  }

  openPermissionForm(permissionFomrContent, item) {
    this.role = item;
    this.modalService.open(permissionFomrContent, { size: 'xl', scrollable: true });
  }

  openAddForm(addFormContent) {
    this.modalService.open(addFormContent);
  }

  openUpdateForm(updateFormContent, item) {
    this.role = item;
    this.modalService.open(updateFormContent);
  }

  addRole() {
    this.modalService.dismissAll();
    this.notificationService.notify(NotificationType.SUCCESS, "Role ajouter avec succès");
    this.getRoles();
  }

  updateRole() {
    this.modalService.dismissAll();
    this.notificationService.notify(NotificationType.SUCCESS, "Role modifié avec succès");
    this.getRoles();
  }

  setAuthority() {
    this.modalService.dismissAll();
    this.notificationService.notify(NotificationType.SUCCESS, "Permissions modifiés avec succès");

  }

  rowSelected(role: Role, index: number) {
    this.currentIndex = index;
    this.role = role;
  }

  public get canListRole() {
    return this.userService.checkAuthority(RoleAuthorityEnum.ROLE_LIST);
  }

  public get canAddRole() {
    return this.userService.checkAuthority(RoleAuthorityEnum.ROLE_ADD);
  }

  public get canUpdateRole() {
    return this.userService.checkAuthority(RoleAuthorityEnum.ROLE_UPDATE);
  }

  public get canAddRolePermission() {
    return this.userService.checkAuthority(RoleAuthorityEnum.ROLE_SET_PERMISSION);
  }

}
