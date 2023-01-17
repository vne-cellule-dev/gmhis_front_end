import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicalCertificatesRoutingModule } from './medical-certificates-routing.module';
import { MedicalCertificatesListComponent } from './medical-certificates-list/medical-certificates-list.component';


@NgModule({
  declarations: [MedicalCertificatesListComponent],
  imports: [
    CommonModule,
    MedicalCertificatesRoutingModule
  ],
  exports: [
    MedicalCertificatesListComponent
  ]
})
export class MedicalCertificatesModule { }
