import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniteMesureRoutingModule } from './unite-mesure-routing.module';
import { UniteMesureListComponent } from './unite-mesure-list/unite-mesure-list.component';
import { UniteMesureFormComponent } from './unite-mesure-form/unite-mesure-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [UniteMesureListComponent, UniteMesureFormComponent],
  imports: [CommonModule, UniteMesureRoutingModule, SharedModule],
})
export class UniteMesureModule {}
