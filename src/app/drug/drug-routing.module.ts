import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DciListComponent } from './dci/dci-list/dci-list.component';
import { DrugListComponent } from './drug-list/drug-list.component';
import { PharmacologicalListComponent } from './pharmacologicalForm/pharmacological-list/pharmacological-list.component';
import { TherapeuticListComponent } from './therapeuticClass/therapeutic-list/therapeutic-list.component';

const routes: Routes = [
  {path : 'dci', component : DciListComponent },
  {path : 'therapeuticClass', component : TherapeuticListComponent},
  {path : 'pharmacologicalForm', component : PharmacologicalListComponent },
  {path : 'list', component : DrugListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DrugRoutingModule { }
