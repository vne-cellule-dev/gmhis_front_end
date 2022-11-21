import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbMenuItem, NbMenuService } from '@nebular/theme';
import { AdmissionService } from 'src/app/admission/service/admission.service';
import { PatientConstantService } from 'src/app/constant/patient-constant/service/patient-constant.service';
import { IPatient } from 'src/app/patient/patient';
import { PatientService } from 'src/app/patient/patient.service';
import { ExaminationService } from '../examination/services/examination.service';

@Component({
  selector: 'app-patient-folder',
  templateUrl: './patient-folder.component.html',
  styleUrls: ['./patient-folder.component.scss']
})
export class PatientFolderComponent implements OnInit {

  patient: IPatient;
  patientId: number;
  admissionId: number;
  showConsultationList : boolean;
  examinationNumber: number = 0;
  showConstantList: boolean;
  menuClick:string = 'Consultations';
  patientConstantNumber: any;
  constructor(
    private route : ActivatedRoute,
    private patientService : PatientService,
    private admissionService : AdmissionService,
    private examinationService : ExaminationService,
    private patientConstantService : PatientConstantService,
    private menuService : NbMenuService

    ) { }

  items2: NbMenuItem[] = [
  
    // {
    //   title: 'Antecedent et traitement',
    //   link: '/document/check-up',
    //   icon: 'minus-outline',
    // } ,
        // {
        //   title: 'Nouvelle consultation',
        //   icon: 'minus-outline',
         
        // } ,
     
        {
          title: 'Consultations',
          icon: 'minus-outline',
         
          badge: {
            text: "0",
            status: 'warning',
          }
        },
        {
          title: 'Constantes',
          icon: 'minus-outline',
          badge: {
            text: "0",
            status: 'warning',
          },
        },
        {
          title: 'Ordonances',
          icon: 'minus-outline',
          badge: {
            text: '0',
            status: 'warning',
          },
        },
        {
          title: 'Examens',
          icon: 'minus-outline',
          badge: {
            text: '0',
            status: 'warning',
          },
        }
  ];
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        const id = Number(params.get('id'));
        this.admissionId = id;
        this.admissionService.getAdmissionDetailById(id).subscribe(
          (response : any)=>{
            this.patientId = response["patientId"];
          this.patientService.getPatientDetail(this.patientId).subscribe(
          (response : any) => {
            this.patient = response;
            this.showConsultationList = true;
            this.showConstantList = true;
            // this.examinationService.getExaminationNumberByAdmissionId( this.patient.id).subscribe(
            //   (response : number) => {
            //     this.examinationNumber = response;
                
            //     this.items2[0]["badge"]["text"] = this.examinationNumber.toString();
            //   }
            // )
            this.updateExaminationNuber(this.patient.id);
            this.updatePattientConstantNumber(this.patient.id);
          }
        )
          }
        ) 
      }
      )
      
      this.menuService.onItemClick().subscribe(
        (res : any) => {
          this.menuClick = res['item']['title'];
        }
      )
  }

  updateExaminationNuber(patientId?:number){
    this.examinationService.getExaminationNumberByAdmissionId( this.patient.id).subscribe(
      (response : number) => {
        this.examinationNumber = response;
        this.items2[0]["badge"]["text"] = this.examinationNumber.toString();
      }
    )
  }

  updatePattientConstantNumber(patientId?:number){
    this.patientConstantService.getPatientConstantNumberByPatientId(this.patient.id).subscribe(
      (response : any) => {
        this.patientConstantNumber = response["PatientConstantNumber"];
        console.log( this.patientConstantNumber);
        
        this.items2[1]["badge"]["text"] = this.patientConstantNumber.toString();
      }
    )
  }


}
