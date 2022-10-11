import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteRoutingModule } from './site-routing.module';
import { SiteFormComponent } from './site-form/site-form.component';
import { SiteListComponent } from './site-list/site-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbCardModule, NbContextMenuModule, NbDatepickerModule, NbFormFieldModule, NbIconModule, NbTabsetModule } from '@nebular/theme';
import { NgbCarouselModule, NgbDropdownModule, NgbPopoverModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxCurrencyModule } from 'ngx-currency';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [SiteFormComponent, SiteListComponent],
  imports: [
    CommonModule,
    SiteRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NbCardModule,
    NbIconModule,
    NbFormFieldModule,
    NgSelectModule,
    NgxPaginationModule,
    FontAwesomeModule,
    NgbTooltipModule,
    NgxDropzoneModule,
    NbTabsetModule,
    NbContextMenuModule,
    NgxExtendedPdfViewerModule,
    NgbPopoverModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgxCurrencyModule,
    NbDatepickerModule,
    NgbCarouselModule
  ]
})
export class SiteModule { }
