import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/_services/notification.service';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';
import { SubSink } from 'subsink';
import { PatientConstantService } from '../service/patient-constant.service';

@Component({
  selector: 'app-constant-list',
  templateUrl: './constant-list.component.html',
  styleUrls: ['./constant-list.component.scss']
})
export class ConstantListComponent implements OnInit {

  private subs = new SubSink();

  public searchForm: FormGroup;

  public items: any;

  showloading: boolean = false;

  @Input()
  PatientconstantDomain: any;

  @Input()
  patientId : number;


  constructor(
    private patientConstantService: PatientConstantService,
    private notificationService: NotificationService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.initform();
    console.log(this.PatientconstantDomain);
    console.log(this.patientId);
    
    let dateConvert: string;
    dateConvert = this.datePipe.transform(new Date(this.PatientconstantDomain["takenAt"]), "yyyy-MM-dd HH:mm:ss");
    this.searchForm.get("takenAt").setValue(dateConvert);
    this.getPatientConstant();
  }

  initform() {
    this.searchForm = new FormGroup({
      patientId: new FormControl(this.patientId),
      takenAt: new FormControl(""),
    });
  }

  public getPatientConstant() {
    this.showloading = true;
    this.subs.add(
      this.patientConstantService.getPatientConstantListByDate(this.searchForm.value).subscribe(
        (response: any) => {
          this.showloading = false;
          this.items = response.items;
          console.log(this.items);
          this.items.forEach((el, i) => {
            if (el["constant"] == "Température") {
              if (el["value"] < 36 || el["value"] > 37) {
                el["badConstant"] = true;
                console.log(el);
              }
            } else if (el["constant"] == "TA droit" || el["constant"] == "TA gauche") {
              if (el["value"] == "15/10") {
                el["badConstant"] = true;
                console.log(el);
              }
            }else if (el["constant"] == "Glycémie") {
              if (el["value"] < 0.7 || el["value"] > 1.26) {
                el["badConstant"] = true;
                console.log(el);
              }
            }else if( el["constant"] == "FRÉQUENCE CARDIAQUE (FC)"){
              if (el["value"] < 60 || el["value"] > 80) {
                el["badConstant"] = true;
                console.log(el);
              }
            }


          });
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
