import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamenRoutingModule } from './examen-routing.module';
import { ExamenListComponent } from './examen-list/examen-list.component';
import { ExamenFormComponent } from './examen-form/examen-form.component';
import { SharedModule } from '../shared/shared.module';
import { NbCheckboxModule } from '@nebular/theme';


@NgModule({
  declarations: [ExamenListComponent, ExamenFormComponent],
  imports: [
    CommonModule,
    ExamenRoutingModule,
    SharedModule,
    NbCheckboxModule

  ],
  exports: [
    ExamenListComponent
  ]
})
export class ExamenModule { }
