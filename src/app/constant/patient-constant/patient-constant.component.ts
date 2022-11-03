import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { IPatient } from 'src/app/patient/patient';
import { PatientService } from 'src/app/patient/patient.service';
import { PageList } from 'src/app/_models/page-list.model';
import { NotificationService } from 'src/app/_services/notification.service';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';
import { SubSink } from 'subsink';
import { IPatientConstant } from './models/patient-constant';
import { PatientConstantService } from './service/patient-constant.service';

@Component({
  selector: 'app-patient-constant',
  templateUrl: './patient-constant.component.html',
  styleUrls: ['./patient-constant.component.scss']
})
export class PatientConstantComponent implements OnInit {

  private subs = new SubSink();

  public searchForm: FormGroup;

  // public constantDomain: IConstant;

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
  ];


  showloading: boolean = false;
  currentIndex: number;
  PatientconstantDomain: any;
  patient: IPatient;
  constructor(
    private route : ActivatedRoute,
    private patientConstantService : PatientConstantService,
    private notificationService: NotificationService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private patientService : PatientService

    ) { }

  ngOnInit(): void {
    this.initform();
    this.route.paramMap.subscribe(
      params => {
        const id = Number(params.get('patientId'));
        console.log(id);
        this.searchForm.get("patientId").setValue(id);
        this.getPatientConstant();
        this.patientService.getPatientDetail(id).subscribe(
          (response : any) => {
            this.patient = response;
            console.log(this.patient);
            
          }
        )
      }
      ) 

    
  }

  initform() {
    this.searchForm = new FormGroup({
      patientId: new FormControl(null),
      date: new FormControl(""),
      page: new FormControl(0),
      size: new FormControl(10),
      sort: new FormControl('id,desc'),
    });
  }

  onSearchValueChange(): void {
    this.getPatientConstant();
  }

  public getPatientConstant() {
    this.showloading = true;
    this.subs.add(
      this.patientConstantService.findAll(this.searchForm.value).subscribe(
        (response: PageList) => {
          this.showloading = false;
          this.currentPage = response.currentPage + 1;
          this.empty = response.empty;
          this.firstPage = response.firstPage;
          this.items = response.items;
          this.items.forEach(el => {
              el.values = JSON.parse(el.values);
              el.constant = Object.keys(el.values);
              el.value = Object.values(el.values);
              console.log(el.constant);
          });
          console.log(this.items);
          
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
    this.getPatientConstant();
  }

  onPageChange(event) {
    this.searchForm.get('page').setValue(event - 1);
    this.getPatientConstant();
  }

  openAddForm(addFormContent) {
    this.modalService.open(addFormContent, { size: 'lg' });
  }

  openUpdateForm(updateFormContent, item?) {
    this.PatientconstantDomain = item;
    console.log(this.PatientconstantDomain);
    this.modalService.open(updateFormContent, { size: 'lg' });
  }

  addConstantDomain() {
    this.modalService.dismissAll();
    this.notificationService.notify(
      NotificationType.SUCCESS,
      'Constante ajoutée avec succès'
    );
    this.getPatientConstant();
  }

  updateConstantDomain() {
    this.modalService.dismissAll();
    this.notificationService.notify(
      NotificationType.SUCCESS,
      'Constante modifieé avec succès'
    );
    this.getPatientConstant();
  }

  rowSelected(constant: IPatientConstant, index: number) {
    this.currentIndex = index;
    this.PatientconstantDomain = constant;
  }

}
