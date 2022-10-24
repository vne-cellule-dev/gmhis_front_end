import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ListUserComponent } from './list-user/list-user.component';
import {  NbCardModule, NbIconModule, NbWindowModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDropzoneModule } from 'ngx-dropzone';


@NgModule({
  declarations: [ListUserComponent,UserFormComponent],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    UserRoutingModule,
    NbCardModule,
    NbIconModule,
    NbWindowModule.forChild(),
    NgxPaginationModule,
    FontAwesomeModule,
    NgbTooltipModule,
    NgxDropzoneModule,

  ]
})
export class UserModule { }
