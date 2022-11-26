import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DciListComponent } from './dci/dci-list/dci-list.component';
import { TherapeuticListComponent } from './therapeuticClass/therapeutic-list/therapeutic-list.component';

const routes: Routes = [
  {path : 'dci', component : DciListComponent },
  {path : 'therapeuticClass', component : TherapeuticListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DrugRoutingModule { }
