import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { ListRoleComponent } from './list-role/list-role.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbCardModule, NbFormFieldModule, NbIconModule } from '@nebular/theme';
import { PermissionComponent } from './permission/permission.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { RoleFormComponent } from './role-form/role-form.component';


@NgModule({
  declarations: [ListRoleComponent, PermissionComponent, RoleFormComponent],
  imports: [
    CommonModule,
    RoleRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NbCardModule,
    NbIconModule,
    NbFormFieldModule,
    NgSelectModule,
    NgxPaginationModule,
    FontAwesomeModule,
    NgbTooltipModule
  ]
})
export class RoleModule { }
