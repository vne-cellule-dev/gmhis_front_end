import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacilityListComponent } from './facility-list/facility-list.component';

const routes: Routes = [
  {path : 'list', component : FacilityListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacilityRoutingModule { }
