import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacilityRoutingModule } from './facility-routing.module';
import { FacilityFormComponent } from './facility-form/facility-form.component';
import { FacilityListComponent } from './facility-list/facility-list.component';


@NgModule({
  declarations: [FacilityFormComponent, FacilityListComponent],
  imports: [
    CommonModule,
    FacilityRoutingModule
  ]
})
export class FacilityModule { }
