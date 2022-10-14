import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsuranceRoutingModule } from './insurance-routing.module';
import { InsuranceListComponent } from './insurance-list/insurance-list.component';
import { InsuranceFormComponent } from './insurance-form/insurance-form.component';
import { SubscriberListComponent } from './subscriber-list/subscriber-list.component';
import { SubscriberFormComponent } from './subscriber-form/subscriber-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    InsuranceListComponent,
    InsuranceFormComponent,
    SubscriberListComponent,
    SubscriberFormComponent,
  ],
  imports: [CommonModule, InsuranceRoutingModule, SharedModule],
})
export class InsuranceModule {}
