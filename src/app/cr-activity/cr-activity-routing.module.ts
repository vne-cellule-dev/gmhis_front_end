import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CractivityListComponent } from './cractivity-list/cractivity-list.component';

const routes: Routes = [
  {path : 'list', component : CractivityListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrActivityRoutingModule { }
