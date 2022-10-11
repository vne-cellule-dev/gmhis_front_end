import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentTypeRoutingModule } from './payment-type-routing.module';
import { PaymentTypeListComponent } from './payment-type-list/payment-type-list.component';
import { PaymentTypeFormComponent } from './payment-type-form/payment-type-form.component';


@NgModule({
  declarations: [PaymentTypeListComponent, PaymentTypeFormComponent],
  imports: [
    CommonModule,
    PaymentTypeRoutingModule
  ]
})
export class PaymentTypeModule { }
