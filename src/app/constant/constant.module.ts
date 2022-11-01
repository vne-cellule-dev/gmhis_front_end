import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConstantRoutingModule } from './constant-routing.module';
import { ConstantDomainListComponent } from './constantDomain/constant-domain-list/constant-domain-list.component';
import { ConstantDomainFormComponent } from './constantDomain/constant-domain-form/constant-domain-form.component';
import { ConstantTypeFormComponent } from './constantType/constant-type-form/constant-type-form.component';
import { ConstantTypeListComponent } from './constantType/constant-type-list/constant-type-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ConstantDomainListComponent,
    ConstantDomainFormComponent,
    ConstantTypeFormComponent,
    ConstantTypeListComponent,
  ],
  imports: [CommonModule, ConstantRoutingModule, SharedModule],
})
export class ConstantModule {}
