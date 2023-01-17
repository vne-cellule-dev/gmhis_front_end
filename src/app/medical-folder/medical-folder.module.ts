import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicalFolderRoutingModule } from './medical-folder-routing.module';
import { NewExaminationComponent } from './examination/new-examination/new-examination.component';
import { SharedModule } from '../shared/shared.module';
import { PatientFolderComponent } from './patient-folder/patient-folder.component';
import { NbMenuModule } from '@nebular/theme';
import { ExaminationListComponent } from './examination/examination-list/examination-list.component';
import { ConstantModule } from '../constant/constant.module';
import { ExamenModule } from '../examen/examen.module';
import { PrescriptionModule } from '../prescription/prescription.module';
import { MedicalCertificatesModule } from '../medical-certificates/medical-certificates.module';


@NgModule({
  declarations: [NewExaminationComponent, PatientFolderComponent,ExaminationListComponent],
  imports: [
    CommonModule,
    MedicalFolderRoutingModule,
    SharedModule,
    NbMenuModule.forRoot(), 
    ConstantModule,
    ExamenModule,
    PrescriptionModule,
    MedicalCertificatesModule
  ]
})
export class MedicalFolderModule { }
