import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrugRoutingModule } from './drug-routing.module';
import { DrugListComponent } from './drug-list/drug-list.component';
import { DrugFormComponent } from './drug-form/drug-form.component';


@NgModule({
  declarations: [DrugListComponent, DrugFormComponent],
  imports: [
    CommonModule,
    DrugRoutingModule
  ]
})
export class DrugModule { }
