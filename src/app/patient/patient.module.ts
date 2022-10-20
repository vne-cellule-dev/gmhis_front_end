import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientListComponent } from './patient-list/patient-list.component';
import { SharedModule } from '../shared/shared.module';
import { PatientFormmComponent } from './patient-formm/patient-formm.component';

@NgModule({
  declarations: [PatientListComponent, PatientFormmComponent],
  imports: [CommonModule, PatientRoutingModule, SharedModule],
})
export class PatientModule {}
