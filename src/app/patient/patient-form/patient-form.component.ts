import { HttpErrorResponse } from '@angular/common/http';
import {Component,ElementRef, EventEmitter, Input,OnInit,Output,ViewChildren } from '@angular/core';
import {FormArray,FormControl,FormControlName,FormGroup,Validators } from '@angular/forms';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { InsuranceService } from 'src/app/insurance/insurance.service';
import { SubscriberService } from 'src/app/insurance/subscriber.service';
import { GlobalGenerateValidator } from 'src/app/shared/validators/global-generic.validator';
import { NotificationService } from 'src/app/_services/notification.service';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';
import { SubSink } from 'subsink';
import { IPatient } from '../patient';
import { PatientService } from '../patient.service';
@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent implements OnInit {

  ngOnInit(): void {
      
  }

}
