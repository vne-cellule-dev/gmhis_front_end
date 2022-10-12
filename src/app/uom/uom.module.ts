import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UomRoutingModule } from './uom-routing.module';
import { UomListComponent } from './uom-list/uom-list.component';
import { UomFormComponent } from './uom-form/uom-form.component';


@NgModule({
  declarations: [UomListComponent, UomFormComponent],
  imports: [
    CommonModule,
    UomRoutingModule
  ]
})
export class UomModule { }
