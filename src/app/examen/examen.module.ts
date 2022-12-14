import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamenRoutingModule } from './examen-routing.module';
import { ExamenListComponent } from './examen-list/examen-list.component';
import { ExamenFormComponent } from './examen-form/examen-form.component';
import { SharedModule } from '../shared/shared.module';
import { NbAccordionModule, NbCheckboxModule } from '@nebular/theme';
import { LaboratoryExamenComponent } from './laboratory-examen/laboratory-examen.component';
import { AnalysisBulletinComponent } from './analysis-bulletin/analysis-bulletin.component';


@NgModule({
  declarations: [ExamenListComponent, ExamenFormComponent, LaboratoryExamenComponent, AnalysisBulletinComponent],
  imports: [
    CommonModule,
    ExamenRoutingModule,
    SharedModule,
    NbCheckboxModule,
    NbAccordionModule

  ],
  exports: [
    ExamenListComponent
  ]
})
export class ExamenModule { }
