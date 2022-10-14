import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AntecedentRoutingModule } from './antecedent-routing.module';
import { AntecedentListComponent } from './antecedent/antecedent-list/antecedent-list.component';
import { AntecedentFormComponent } from './antecedent/antecedent-form/antecedent-form.component';
import { AntecedentFamilyListComponent } from './family/antecedent-family-list/antecedent-family-list.component';
import { AntecedentFamilyFormComponent } from './family/antecedent-family-form/antecedent-family-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AntecedentListComponent,
    AntecedentFormComponent,
    AntecedentFamilyListComponent,
    AntecedentFamilyFormComponent,
  ],
  imports: [CommonModule, AntecedentRoutingModule, SharedModule],
})
export class AntecedentModule {}
