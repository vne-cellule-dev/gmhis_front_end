import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InsuranceListComponent } from './insurance-list/insurance-list.component';
import { SubscriberListComponent } from './subscriber-list/subscriber-list.component';

const routes: Routes = [
  {path : 'list', component : InsuranceListComponent},
  {path : 'subscriber-list', component : SubscriberListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceRoutingModule { }
