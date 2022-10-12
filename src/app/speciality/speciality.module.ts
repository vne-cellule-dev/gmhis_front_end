import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialityRoutingModule } from './speciality-routing.module';
import { SpecialityFormComponent } from './speciality-form/speciality-form.component';
import { SpecialityListComponent } from './speciality-list/speciality-list.component';


@NgModule({
  declarations: [SpecialityFormComponent, SpecialityListComponent],
  imports: [
    CommonModule,
    SpecialityRoutingModule
  ]
})
export class SpecialityModule { }
