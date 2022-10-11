import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCountryComponent } from './list-country/list-country.component';

const routes: Routes = [
  {path : "list", component: ListCountryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountryRoutingModule { }
