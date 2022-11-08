import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UniteMesureListComponent } from './unite-mesure-list/unite-mesure-list.component';

const routes: Routes = [{ path: 'list', component: UniteMesureListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UniteMesureRoutingModule {}
