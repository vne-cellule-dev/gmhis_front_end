import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PharmacyRoutingModule } from './pharmacy-routing.module';
import { DrugListComponent } from './drug/drug-list/drug-list.component';
import { DrugFormComponent } from './drug/drug-form/drug-form.component';
import { DciFormComponent } from './dci/dci-form/dci-form.component';
import { DciListComponent } from './dci/dci-list/dci-list.component';
import { TherapeuticClassListComponent } from './therapeuticClass/therapeutic-class-list/therapeutic-class-list.component';
import { TherapeuticClassFormComponent } from './therapeuticClass/therapeutic-class-form/therapeutic-class-form.component';
import { PharmacologicformFormComponent } from './pharmacologicForm/pharmacologicform-form/pharmacologicform-form.component';
import { PharmacologicformListComponent } from './pharmacologicForm/pharmacologicform-list/pharmacologicform-list.component';
import { LaboratyListComponent } from './laboraty/laboraty-list/laboraty-list.component';
import { LaboratyFormComponent } from './laboraty/laboraty-form/laboraty-form.component';
import { DcuListComponent } from './dcu/dcu-list/dcu-list.component';
import { DcuFormComponent } from './dcu/dcu-form/dcu-form.component';


@NgModule({
  declarations: [DrugListComponent, DrugFormComponent, DciFormComponent, DciListComponent, TherapeuticClassListComponent, TherapeuticClassFormComponent, PharmacologicformFormComponent, PharmacologicformListComponent, LaboratyListComponent, LaboratyFormComponent, DcuListComponent, DcuFormComponent],
  imports: [
    CommonModule,
    PharmacyRoutingModule
  ]
})
export class PharmacyModule { }
