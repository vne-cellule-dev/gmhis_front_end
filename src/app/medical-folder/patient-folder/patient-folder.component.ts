import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbMenuItem, NbMenuService } from '@nebular/theme';
import { AdmissionService } from 'src/app/admission/service/admission.service';
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
  constructor(
    private route : ActivatedRoute,
    private patientService : PatientService,
    private admissionService : AdmissionService,
    private examinationService : ExaminationService,
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
          title: 'Suivi des constantes',
          icon: 'minus-outline',
          badge: {
            text: "0",
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
        } ,
        {
          title: 'Ordonances',
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
        console.log(this.admissionId);
        
       
        console.log(id);
        this.admissionService.getAdmissionDetailById(id).subscribe(
          (response : any)=>{
            console.log(response);
            this.patientId = response["patientId"];
            console.log(this.patientId);
          this.patientService.getPatientDetail(this.patientId).subscribe(
          (response : any) => {
            this.patient = response;
            this.showConsultationList = true;
            this.showConstantList = true;
            this.examinationService.getExaminationNumberByAdmissionId( this.patient.id).subscribe(
              (response : number) => {
                this.examinationNumber = response;
                console.log(this.examinationNumber);
                
                this.items2[0]["badge"]["text"] = this.examinationNumber.toString();
                console.log(this.examinationNumber);
              }
            )

          }
        )
          }
        )
        // this.searchForm.get("patientId").setValue(id);
    /* Subscribing to the patientService.getPatientDetail(id) method. */
   
      }
      ) 
  }

  updateExaminationNuber(){
    this.examinationService.getExaminationNumberByAdmissionId( this.patient.id).subscribe(
      (response : number) => {
        this.examinationNumber = response;
        console.log(this.examinationNumber);
        
        this.items2[0]["badge"]["text"] = this.examinationNumber.toString();
        console.log(this.examinationNumber);
      }
    )
  }

  menuClick(){
    this.menuService.onItemClick().subscribe((data) => {
      console.log(data);
      if (data.item.link === undefined) {
        const item = data.item as any;
        item.click();
      }
    });
  }


}
