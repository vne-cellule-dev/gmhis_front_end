import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { PageList } from 'src/app/_models/page-list.model';
import { NotificationService } from 'src/app/_services/notification.service';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';
import { SubSink } from 'subsink';
import { IPatient } from '../patient';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
})
export class PatientListComponent implements OnInit {
  private subs = new SubSink();

  public searchForm: FormGroup;

  public patient: IPatient;

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
    private patientService: PatientService,
    private notificationService: NotificationService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.initform();
    this.getPatient();
    const actGroup = {
      active: false,
      id: 0,
      name: 'PATIENT',
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

  // public getCashRegister() {
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
    this.getPatient();
  }

  public getPatient() {
    this.showloading = true;
    this.subs.add(
      this.patientService.findAll(this.searchForm.value).subscribe(
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
    this.getPatient();
  }

  onPageChange(event) {
    this.searchForm.get('page').setValue(event - 1);
    this.getPatient();
  }

  openAddForm(addFormContent) {
    this.modalService.open(addFormContent, { size: 'lg' });
  }

  openUpdateForm(updateFormContent, item?) {
    this.patient = item;
    console.log(this.patient);
    this.modalService.open(updateFormContent, { size: 'lg' });
  }

  addPatient() {
    this.modalService.dismissAll();
    this.notificationService.notify(
      NotificationType.SUCCESS,
      'Caisse ajoutée avec succès'
    );
    this.getPatient();
  }

  updatePatient() {
    this.modalService.dismissAll();
    this.notificationService.notify(
      NotificationType.SUCCESS,
      'Caisse modifiée avec succès'
    );
    this.getPatient();
  }

  rowSelected(patient: IPatient, index: number) {
    this.currentIndex = index;
    this.patient = patient;
  }
}
