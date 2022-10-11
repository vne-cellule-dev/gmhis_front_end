import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsuranceRoutingModule } from './insurance-routing.module';
import { InsuranceListComponent } from './insurance-list/insurance-list.component';
import { InsuranceFormComponent } from './insurance-form/insurance-form.component';
import { SubscriberListComponent } from './subscriber-list/subscriber-list.component';
import { SubscriberFormComponent } from './subscriber-form/subscriber-form.component';


@NgModule({
  declarations: [InsuranceListComponent, InsuranceFormComponent, SubscriberListComponent, SubscriberFormComponent],
  imports: [
    CommonModule,
    InsuranceRoutingModule
  ]
})
export class InsuranceModule { }
