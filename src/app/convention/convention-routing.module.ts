import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConventionListComponent } from './convention-list/convention-list.component';
// import { ConventionListComponent } from './convention-list/convention-list.component';

const routes: Routes = [{ path: 'list', component: ConventionListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConventionRoutingModule {}
