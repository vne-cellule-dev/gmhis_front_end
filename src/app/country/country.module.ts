import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryRoutingModule } from './country-routing.module';
import { ListCountryComponent } from './list-country/list-country.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbCardModule, NbFormFieldModule, NbIconModule } from '@nebular/theme';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [ListCountryComponent],
  imports: [
    CommonModule,
    CountryRoutingModule,
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
export class CountryModule { }
