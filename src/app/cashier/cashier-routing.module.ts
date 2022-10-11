import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CashierListComponent } from './cashier-list/cashier-list.component';

const routes: Routes = [
  {path : 'list', component : CashierListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashierRoutingModule { }
