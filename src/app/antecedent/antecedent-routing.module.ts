import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AntecedentListComponent } from './antecedent/antecedent-list/antecedent-list.component';
import { AntecedentFamilyListComponent } from './family/antecedent-family-list/antecedent-family-list.component';

const routes: Routes = [
  {path : 'list', component : AntecedentListComponent},
  {path : 'family', component: AntecedentFamilyListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AntecedentRoutingModule { }
