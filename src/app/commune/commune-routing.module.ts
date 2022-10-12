import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommuneListComponent } from './commune-list/commune-list.component';

const routes: Routes = [
  {path : 'list', component : CommuneListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommuneRoutingModule { }
