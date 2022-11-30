import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DciListComponent } from './dci/dci-list/dci-list.component';

const routes: Routes = [
  {path : 'dci', component : DciListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DrugRoutingModule { }
