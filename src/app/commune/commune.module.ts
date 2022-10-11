import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommuneRoutingModule } from './commune-routing.module';
import { CommuneComponent } from './commune.component';
import { CommuneFormComponent } from './commune-form/commune-form.component';
import { CommuneListComponent } from './commune-list/commune-list.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbCardModule, NbContextMenuModule, NbDatepickerModule, NbFormFieldModule, NbIconModule, NbTabsetModule } from '@nebular/theme';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbCarouselModule, NgbDropdownModule, NgbPopoverModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { NgxCurrencyModule } from 'ngx-currency';


@NgModule({
  declarations: [CommuneComponent,CommuneFormComponent,CommuneListComponent],
  imports: [
    CommonModule,
    CommuneRoutingModule,
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
export class CommuneModule { }
