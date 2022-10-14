import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashRegisterRoutingModule } from './cash-register-routing.module';
import { CashRegisterListComponent } from './cash-register-list/cash-register-list.component';
import { CashRegisterFormComponent } from './cash-register-form/cash-register-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CashRegisterListComponent, CashRegisterFormComponent],
  imports: [CommonModule, CashRegisterRoutingModule, SharedModule],
})
export class CashRegisterModule {}
