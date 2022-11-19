import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrescriptionRoutingModule } from './prescription-routing.module';
import { PrescriptionListComponent } from './prescription-list/prescription-list.component';
import { PrescriptionFormComponent } from './prescription-form/prescription-form.component';


@NgModule({
  declarations: [PrescriptionListComponent,PrescriptionFormComponent],
  imports: [
    CommonModule,
    PrescriptionRoutingModule
  ],
  exports: [
    PrescriptionListComponent
  ]
})
export class PrescriptionModule { }
