import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrActivityRoutingModule } from './cr-activity-routing.module';
import { CractivityFormComponent } from './cractivity-form/cractivity-form.component';
import { CractivityListComponent } from './cractivity-list/cractivity-list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [CractivityFormComponent, CractivityListComponent],
  imports: [
    CommonModule,
    CrActivityRoutingModule,
    SharedModule
  ]
})
export class CrActivityModule { }
