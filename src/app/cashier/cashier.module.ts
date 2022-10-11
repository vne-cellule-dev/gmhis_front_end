import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashierRoutingModule } from './cashier-routing.module';
import { CashierListComponent } from './cashier-list/cashier-list.component';
import { CashierFormComponent } from './cashier-form/cashier-form.component';


@NgModule({
  declarations: [CashierListComponent, CashierFormComponent],
  imports: [
    CommonModule,
    CashierRoutingModule
  ]
})
export class CashierModule { }
