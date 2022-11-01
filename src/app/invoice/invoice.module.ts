import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';
import { SharedModule } from '../shared/shared.module';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';


@NgModule({
  declarations: [InvoiceListComponent, InvoiceFormComponent],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    SharedModule,
    NgxExtendedPdfViewerModule
  ],
  exports: [
    InvoiceFormComponent
  ]
})
export class InvoiceModule { }
