import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CashRegisterListComponent } from './cash-register-list/cash-register-list.component';

const routes: Routes = [
  {path : 'list', component : CashRegisterListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashRegisterRoutingModule { }
