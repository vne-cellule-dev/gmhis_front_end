import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrugRoutingModule } from './drug-routing.module';
import { DrugListComponent } from './drug-list/drug-list.component';
import { DrugFormComponent } from './drug-form/drug-form.component';
import { DciListComponent } from './dci/dci-list/dci-list.component';
import { DciFormComponent } from './dci/dci-form/dci-form.component';
import { SharedModule } from '../shared/shared.module';
import { TherapeuticFormComponent } from './therapeuticClass/therapeutic-form/therapeutic-form.component';
import { TherapeuticListComponent } from './therapeuticClass/therapeutic-list/therapeutic-list.component';
import { PharmacologicalListComponent } from './pharmacologicalForm/pharmacological-list/pharmacological-list.component';
import { PharmacologicalFormComponent } from './pharmacologicalForm/pharmacological-form/pharmacological-form.component';


@NgModule({
  declarations: [DrugListComponent, DrugFormComponent, DciListComponent, DciFormComponent, TherapeuticFormComponent, TherapeuticListComponent, PharmacologicalListComponent, PharmacologicalFormComponent],
  imports: [
    CommonModule,
    DrugRoutingModule,
    SharedModule
  ]
})
export class DrugModule { }
