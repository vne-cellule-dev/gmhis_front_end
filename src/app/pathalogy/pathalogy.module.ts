import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PathalogyRoutingModule } from './pathalogy-routing.module';
import { PathologyFormComponent } from './pathology-form/pathology-form.component';
import { PathologyListComponent } from './pathology-list/pathology-list.component';


@NgModule({
  declarations: [PathologyFormComponent, PathologyListComponent],
  imports: [
    CommonModule,
    PathalogyRoutingModule
  ]
})
export class PathalogyModule { }
