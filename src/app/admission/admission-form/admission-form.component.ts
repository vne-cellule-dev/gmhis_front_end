import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActService } from 'src/app/act/act/service/act.service';
import { IPatient } from 'src/app/patient/patient';
import { ServiceService } from 'src/app/service/service/service.service';
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
  constructor(private serviceService : ServiceService,
               private actService : ActService,
               private admissionService : AdmissionService,
               private notificationService : NotificationService
               ) { }

  ngOnInit(): void {
    console.log(this.patient);
    this.initForm();
    this.admissionForm.get('patient').setValue(this.patient.id);
    this.admissionForm.get('patientName').setValue(this.patient.firstName);
    this.admissionForm.get('patientExternalId').setValue(this.patient.patientExternalId);

    this.findActiveActNameAndId();
    this.findActiveServiceNameAndId()
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
      practician: new FormControl(1),
    });
  }

  save():void {
    this.invalidFom = !this.admissionForm.valid;
    this.formSubmitted = true;
    if (this.admissionForm.valid) {
      this.showloading = true;
      this.admissionDto = this.admissionForm.value;
      if (this.admissionDto.id) {
        this.subs.add(
          this.admissionService.updateAdmission(this.admissionDto).subscribe(
            (response: IAdmission) => {
              this.showloading = false;
              // this.updateAdmission.emit();
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
}
