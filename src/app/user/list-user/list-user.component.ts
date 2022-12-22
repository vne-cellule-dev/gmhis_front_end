import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PageList } from 'src/app/_models/page-list.model';
import { User } from 'src/app/_models/user.model';
import { NotificationService } from 'src/app/_services/notification.service';
import { UserService } from 'src/app/_services/user.service';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Depot } from 'src/app/_models/depot.model';
import { Role } from 'src/app/_models/role.model';
import { UserAuthority } from 'src/app/_enum/userAuthority.enum';
import { DepotService } from 'src/app/_services/depot.service';
import Swal from 'sweetalert2';


import { SubSink } from 'subsink';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class ListUserComponent implements OnInit, OnDestroy, AfterViewInit {

  faSort = faSort;

  private subs = new SubSink();

  /* 
    handle the spinner
  */
  showloading: boolean = true;
  /* 
  collection of Users
  */

  public items: User[];

  depots: Depot[];

  roles: Role[];

  public user: User;

  public sortDirection = "desc";

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

  constructor(
    private notificationService: NotificationService,
    private userService: UserService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private depotService: DepotService
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
    this.getUsers();
  }

  ngAfterViewInit() { }

  initform() {
    this.searchForm = new FormGroup({
      firstName: new FormControl(""),
      lastName: new FormControl(""),
      tel: new FormControl(""),
      depot: new FormControl(null),
      page: new FormControl(0),
      size: new FormControl(50),
      sort: new FormControl("id,desc"),
    })
  }

  /*
   method to fetch all users
 */
  public getUsers() {
    this.showloading = true;
    this.subs.add(
      this.userService.findAll(this.searchForm.value).subscribe(
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
    this.getUsers();
  }

  onTableSizeChange(): void {
    this.getUsers();
  }

  onIsActiveChange(): void {
    this.getUsers();
  }

  onKeyUp(): void {
    this.getUsers();
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
    this.getUsers();
  }

  selectItem(item) {
    this.user = item;
  }

  openAddForm(addFormContent) {
    this.modalService.open(addFormContent, { size: 'lg' });
  }

  openUpdateForm(updateFormContent, item) {
    this.user = item;
    this.modalService.open(updateFormContent, { size: 'lg' });
  }

  resetAndSendNewPassword(item) {
    this.user = item;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        title: 'sweetAlert',
      }
    })

    swalWithBootstrapButtons.fire({
      title: '<h5> Changer le mot de passe de : ' + this.user.firstName + " " + this.user.lastName + ' ? </h5>',
      text: "Cette action est irreversible",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#14a2b8',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, changer!',
      cancelButtonText: 'Non, annuler!',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      // reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        Swal.fire({
          title: '<h5> En Cours! </h5>',
          html: 'processus en cours ...',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
          // timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            this.subs.add(
              this.userService.resetAndSendPassword(this.user.username).subscribe(
                (response: HttpResponse<string>) => {
                  if (response['httpStatusCode'] == 200 && response["httpStatus"] == "OK") {
                    Swal.close();
                    swalWithBootstrapButtons.fire(
                      'Changé!',
                      "un email avec le NOUVEAU mot de passe a été envoyer à : " + this.user.email,
                      'success'
                    )
                  }
                },
                (errorResponse: HttpErrorResponse) => {
                  this.showloading = false;
                  this.notificationService.notify(NotificationType.ERROR, errorResponse.error.message);
                  Swal.close();
                }
              ));
          },

        })

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Annulé',
          'le mot de passe n\'a pas été changer',
          'error'
        )
      }
    })
  }

  addUser() {
    this.modalService.dismissAll();
    this.notificationService.notify(NotificationType.SUCCESS, "Utilisateur ajouter avec succès");
    this.getUsers();
  }

  updateUser() {
    this.modalService.dismissAll();
    this.notificationService.notify(NotificationType.SUCCESS, "Utilisateur  modifié avec succès");
    this.getUsers();
  }


  resetPassword() {
    this.modalService.dismissAll();
    this.notificationService.notify(NotificationType.SUCCESS, "E-mail envoyé avec succès");
    this.getUsers();
  }

  rowSelected(user: User, index: number) {
    this.currentIndex = index;
    this.user = user;
  }

  public get canListUser() {
    return this.userService.checkAuthority(UserAuthority.USER_LIST);
  }

  public get canAddUser() {
    return this.userService.checkAuthority(UserAuthority.USER_ADD);
  }

  public get canUpdateUser() {
    return this.userService.checkAuthority(UserAuthority.USER_UPDATE);
  }

  public get canResetPassword() {
    return this.userService.checkAuthority(UserAuthority.USER_RESET_PASSWORD);
  }

}
