import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrescriptionRoutingModule } from './prescription-routing.module';
import { PrescriptionListComponent } from './prescription-list/prescription-list.component';
import { PrescriptionFormComponent } from './prescription-form/prescription-form.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [PrescriptionListComponent,PrescriptionFormComponent],
  imports: [
    CommonModule,
    PrescriptionRoutingModule,
    SharedModule
  ],
  exports: [
    PrescriptionListComponent
  ]
})
export class PrescriptionModule { }
