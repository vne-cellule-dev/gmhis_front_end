import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrescriptionCollectComponent } from './prescription-collect/prescription-collect.component';

const routes: Routes = [
  {path : 'pharmacy', component : PrescriptionCollectComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrescriptionRoutingModule { }
