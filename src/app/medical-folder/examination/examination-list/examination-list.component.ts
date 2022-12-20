import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { IPatient } from 'src/app/patient/patient';
import { PageList } from 'src/app/_models/page-list.model';
import { NotificationService } from 'src/app/_services/notification.service';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';
import { SubSink } from 'subsink';
import { ExaminationService } from '../services/examination.service';

@Component({
  selector: 'app-examination-list',
  templateUrl: './examination-list.component.html',
  styleUrls: ['./examination-list.component.scss']
})
export class ExaminationListComponent implements OnInit {

  private subs = new SubSink();

  public searchForm: FormGroup;

  public examination: Object;

  public examinationId: number;


  @Input()
  patientId : number;

  @Input()
  admissionId : number;

  @Output('updateExaminationNuber') updateExaminationNuber: EventEmitter<any> =
  new EventEmitter();

  @Output('updatePatientPrescriptionNumber') updatePatientPrescriptionNumber: EventEmitter<any> =
  new EventEmitter();
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
    private examinationService: ExaminationService,
    private notificationService: NotificationService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.initform();
    this.getConvention();
  }

  initform() {
    this.searchForm = new FormGroup({
      patient: new FormControl(this.patientId),
      page: new FormControl(0),
      size: new FormControl(10),
      sort: new FormControl('id,desc'),
    });
  }

  onSearchValueChange(): void {
    this.getConvention();
  }

  public getConvention() {
    this.showloading = true;
    this.subs.add(
      this.examinationService.getPatientExamination(this.searchForm.value).subscribe(
        (response: PageList) => {
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
    this.getConvention();
  }

  onPageChange(event) {
    this.searchForm.get('page').setValue(event - 1);
    this.getConvention();
  }

  openAddForm(addFormContent) {
    this.modalService.open(addFormContent, { size: 'xl' });
  }

  openUpdateForm(updateFormContent, item?) {
    this.examination = item;
    this.modalService.open(updateFormContent, { size: 'xl' });
  }

  openPrescriptionForm(prescriptionFormContent, item?) {
    this.examinationId = item.id;
    this.modalService.open(prescriptionFormContent, { size: 'xl' });
  }

  addExamination() {
    this.modalService.dismissAll();
    this.notificationService.notify(
      NotificationType.SUCCESS,
      "Consultation ajoutée avec succès"
    );
    this.updateExaminationNuber.emit();
    this.getConvention();
  }

  updateConvention() {
    this.modalService.dismissAll();
    this.notificationService.notify(
      NotificationType.SUCCESS,
      "Consultation modifiée avec succès"
    );
    this.getConvention();
  }

  addPrescription() {
    this.modalService.dismissAll();
    this.notificationService.notify(
      NotificationType.SUCCESS,
      "Ordonnance crée avec succès"
    );
    this.updatePatientPrescriptionNumber.emit();
  }

}
