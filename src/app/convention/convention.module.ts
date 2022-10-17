import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConventionRoutingModule } from './convention-routing.module';
import { ConventionListComponent } from './convention-list/convention-list.component';
import { ConventionFormComponent } from './convention-form/convention-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ConventionListComponent, ConventionFormComponent],
  imports: [CommonModule, ConventionRoutingModule, SharedModule],
})
export class ConventionModule {}
