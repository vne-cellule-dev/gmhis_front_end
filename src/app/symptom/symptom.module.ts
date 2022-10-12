import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SymptomRoutingModule } from './symptom-routing.module';
import { SymptomListComponent } from './symptom-list/symptom-list.component';
import { SymptomFormComponent } from './symptom-form/symptom-form.component';


@NgModule({
  declarations: [SymptomListComponent, SymptomFormComponent],
  imports: [
    CommonModule,
    SymptomRoutingModule
  ]
})
export class SymptomModule { }
