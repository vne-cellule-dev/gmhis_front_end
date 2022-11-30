import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrescriptionRoutingModule } from './prescription-routing.module';
import { PrescriptionListComponent } from './prescription-list/prescription-list.component';
import { PrescriptionFormComponent } from './prescription-form/prescription-form.component';
import { SharedModule } from '../shared/shared.module';
import { PrescriptionCollectComponent } from './prescription-collect/prescription-collect.component';
import { NbCheckboxModule } from '@nebular/theme';


@NgModule({
  declarations: [PrescriptionListComponent,PrescriptionFormComponent, PrescriptionCollectComponent],
  imports: [
    CommonModule,
    PrescriptionRoutingModule,
    SharedModule,
    NbCheckboxModule
  ],
  exports: [
    PrescriptionListComponent,
    PrescriptionFormComponent
  ]
})
export class PrescriptionModule { }
