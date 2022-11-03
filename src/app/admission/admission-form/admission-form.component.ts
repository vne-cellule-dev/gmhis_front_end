import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActService } from 'src/app/act/act/service/act.service';
import { ActCategoryService } from 'src/app/act/category/service/act-category.service';
import { IPatient } from 'src/app/patient/patient';
import { PracticianService } from 'src/app/practician/practician.service';
import { ServiceService } from 'src/app/service/service/service.service';
import { INameAndId } from 'src/app/shared/models/name-and-id';
import { NotificationService } from 'src/app/_services/notification.service';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';
import { SubSink } from 'subsink';
import { IAdmission } from '../model/admission';
import { IAdmissionDto } from '../model/admission-dto';
import { AdmissionService } from '../service/admission.service';

@Component({
  selector: 'app-admission-form',
  templateUrl: './admission-form.component.html',
  styleUrls: ['./admission-form.component.scss']
})
export class AdmissionFormComponent implements OnInit {
  private subs = new SubSink();

  @Output('addAdmission') addAdmission: EventEmitter<any> = new EventEmitter();
  @Output('updateAdmission') updateAdmission: EventEmitter<any> = new EventEmitter();

@Input()
patient : IPatient

@Input()
admission : IAdmission;

admissionDto : IAdmissionDto;

  public admissionForm: FormGroup;

  public invalidFom = false;



   /**
    * check if the form is submitted
    */
   public formSubmitted = false;

   /**
   * handle the spinner
   */
    showloading: boolean = false;
  actsNameAndId: any;
  servicesNameAndId: any;
  actCategories: any;
  practicians: INameAndId[];
  constructor(private serviceService : ServiceService,
               private actService : ActService,
               private admissionService : AdmissionService,
               private actCategorieService : ActCategoryService,
               private notificationService : NotificationService,
               private practicianService : PracticianService,
              
               ) { }

  ngOnInit(): void {
    console.log(this.patient);
    console.log(this.admission);
    this.initForm();
    if (this.admission) {      
      this.admissionService.getAdmissionDetail(this.admission).subscribe(
        (response : any) => {
          console.log(response);
          this.admissionForm.get('id').setValue(response.id);
          this.admissionForm.get('patient').setValue(response.patientId);
          this.admissionForm.get('patientName').setValue(response.patientName );
          this.admissionForm.get('patientExternalId').setValue(response.patientExternalId);
          this.admissionForm.get('createdAt').setValue(new Date(response.admissionDate));
          this.admissionForm.get('act').setValue(response.act);
          this.admissionForm.get('service').setValue(response.service);
          this.admissionForm.get('practician').setValue(response.practician);
        }
      )
    }
    if (this.patient) {
      console.log(this.patient);
      this.admissionForm.get('patient').setValue(this.patient.id);
    this.admissionForm.get('patientName').setValue(this.patient.firstName +" " + this.patient.lastName);
    this.admissionForm.get('patientExternalId').setValue(this.patient.patientExternalId)
    }
  

    // this.findActiveActNameAndId();
    this.findActiveServiceNameAndId();
    this.findActCategorieNameAndId();
    this.findActPracticiainNameAndId();
  }

  initForm() {
    this.admissionForm = new FormGroup({
      id: new FormControl(null),
      patientExternalId : new FormControl({ value: '', disabled: true }),
      patientName : new FormControl({ value: '', disabled: true }),
      createdAt: new FormControl('', [Validators.required]),
      patient: new FormControl(true),
      service: new FormControl(null),
      act: new FormControl(null),
      practician: new FormControl(null),
    });
  }

  save():void {
    this.invalidFom = !this.admissionForm.valid;
    this.formSubmitted = true;
    if (this.admissionForm.valid) {
      this.showloading = true;
      this.admissionDto = this.admissionForm.value;
      console.log(this.admissionDto);
      
      if (this.admissionDto.id) {
        this.subs.add(
          this.admissionService.updateAdmission(this.admissionDto).subscribe(
            (response: IAdmission) => {
              this.showloading = false;
              this.updateAdmission.emit();
            },
            (errorResponse: HttpErrorResponse) => {
              this.showloading = false;
              this.notificationService.notify(
                NotificationType.ERROR,
                errorResponse.error
              );
            }
          )
        );
      } else {
        this.subs.add(
          this.admissionService.createAdmission(this.admissionDto).subscribe(
            (response: IPatient) => {
              this.showloading = false;
              this.addAdmission.emit();
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
    }
  }

  private findActiveActNameAndId(){
    this.actService.getListOfActiveAct().subscribe(
      (response : any) => {
        this.actsNameAndId = response;
        console.log("actNameAndId",this.actsNameAndId);
        
      },
      (errorResponse : HttpErrorResponse) => {
        this.showloading = false;
        this.notificationService.notify(
          NotificationType.ERROR,
          errorResponse.error.message
        ); 
      }
    )
  }

  findActiveActByActCategoryId(categoryId : number){
    console.log(categoryId);
    this.actService.getActsByActCategoryId(categoryId).subscribe(
      (res : any)=> {
        this.actsNameAndId = res; 
        console.log("this.actsNameAndId", this.actsNameAndId);
        
      }
    )
  }

  private findActiveServiceNameAndId(){
    this.serviceService.findActiveServiceNameAndId().subscribe(
      (response : any) => {
        this.servicesNameAndId = response;
        console.log("serviceNameAndId",this.servicesNameAndId);
        
      },
      (errorResponse : HttpErrorResponse) => {
        this.showloading = false;
        this.notificationService.notify(
          NotificationType.ERROR,
          errorResponse.error.message
        ); 
      }
    )
  }

  private findActCategorieNameAndId(){
    this.actCategorieService.findActiveActCategoryNameAndId().subscribe(
      (response : INameAndId[])=> {
        this.actCategories = response;
        console.log("this.actCategories", this.actCategories);
        
      }
    )
  }


  private findActPracticiainNameAndId(){
    this.practicianService.findPracticianSimpleList().subscribe(
      (response : INameAndId[])=> {
        this.practicians = response;
        console.log(this.practicians);
        
      }
    )
  }
}
