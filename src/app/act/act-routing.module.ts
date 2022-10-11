import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActListComponent } from './act/act-list/act-list.component';
import { ActCategoryListComponent } from './category/act-category-list/act-category-list.component';
import { ActCodeListComponent } from './code/act-code-list/act-code-list.component';
import { ActFamilyListComponent } from './family/act-family-list/act-family-list.component';

const routes: Routes = [
  {path : 'list', component : ActListComponent},
  {path : 'category', component : ActCategoryListComponent},
  {path : 'family', component : ActFamilyListComponent},
  {path : 'code', component : ActCodeListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActRoutingModule { }
