import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TerritorialSubdivisionRoutingModule } from './territorial-subdivision-routing.module';
import { CityComponent } from './city/city.component';
import { CountryComponent } from './country/country.component';
import { RegionComponent } from './region/region.component';
import { DistrictComponent } from './district/district.component';
import { LocalityComponent } from './locality/locality.component';


@NgModule({
  declarations: [CityComponent, CountryComponent, RegionComponent, DistrictComponent, LocalityComponent],
  imports: [
    CommonModule,
    TerritorialSubdivisionRoutingModule
  ]
})
export class TerritorialSubdivisionModule { }
