import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LaboratoryExamenComponent } from './laboratory-examen/laboratory-examen.component';

const routes: Routes = [
  {path : "exam-list", component : LaboratoryExamenComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamenRoutingModule { }
