import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActRoutingModule } from './act-routing.module';
import { ActCategoryListComponent } from './category/act-category-list/act-category-list.component';
import { ActCategoryFormComponent } from './category/act-category-form/act-category-form.component';
import { ActFamilyListComponent } from './family/act-family-list/act-family-list.component';
import { ActFamilyFormComponent } from './family/act-family-form/act-family-form.component';
import { ActCodeFormComponent } from './code/act-code-form/act-code-form.component';
import { ActCodeListComponent } from './code/act-code-list/act-code-list.component';
import { ActListComponent } from './act/act-list/act-list.component';
import { ActFormComponent } from './act/act-form/act-form.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ActCategoryListComponent, ActCategoryFormComponent, ActFamilyListComponent, ActFamilyFormComponent, ActCodeFormComponent, ActCodeListComponent, ActListComponent, ActFormComponent],
  imports: [
    CommonModule,
    ActRoutingModule,
    SharedModule
  ]
})
export class ActModule { }
