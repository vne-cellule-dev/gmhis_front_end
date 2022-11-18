import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';
import { SharedModule } from '../shared/shared.module';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PaymentComponent } from './payment/payment.component';
import { InsuranceBillComponent } from './insurance-bill/insurance-bill.component';


@NgModule({
  declarations: [InvoiceListComponent, InvoiceFormComponent, PaymentComponent, InsuranceBillComponent],
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
