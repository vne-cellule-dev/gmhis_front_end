import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConventionRoutingModule } from './convention-routing.module';
import { ConventionListComponent } from './convention-list/convention-list.component';
import { ConventionFormComponent } from './convention-form/convention-form.component';


@NgModule({
  declarations: [ConventionListComponent, ConventionFormComponent],
  imports: [
    CommonModule,
    ConventionRoutingModule
  ]
})
export class ConventionModule { }
