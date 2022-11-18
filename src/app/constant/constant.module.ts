import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConstantRoutingModule } from './constant-routing.module';
import { ConstantDomainListComponent } from './constantDomain/constant-domain-list/constant-domain-list.component';
import { ConstantDomainFormComponent } from './constantDomain/constant-domain-form/constant-domain-form.component';
import { ConstantTypeFormComponent } from './constantType/constant-type-form/constant-type-form.component';
import { ConstantTypeListComponent } from './constantType/constant-type-list/constant-type-list.component';
import { SharedModule } from '../shared/shared.module';
import { PatientConstantComponent } from './patient-constant/patient-constant.component';
import { PatientConstantFormComponent } from './patient-constant/patient-constant-form/patient-constant-form.component';
import { ConstantListComponent } from './patient-constant/constant-list/constant-list.component';

@NgModule({
  declarations: [
    ConstantDomainListComponent,
    ConstantDomainFormComponent,
    ConstantTypeFormComponent,
    ConstantTypeListComponent,
    PatientConstantComponent,
    PatientConstantFormComponent,
    ConstantListComponent,
  ],
  imports: [CommonModule, ConstantRoutingModule, SharedModule],
  exports: [PatientConstantComponent,
  ]
})
export class ConstantModule {}
