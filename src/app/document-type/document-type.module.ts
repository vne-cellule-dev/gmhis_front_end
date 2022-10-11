import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentTypeRoutingModule } from './document-type-routing.module';
import { CheckUpListComponent } from './check-up/check-up-list/check-up-list.component';
import { CheckUpFormComponent } from './check-up/check-up-form/check-up-form.component';
import { CertificatTypeFormComponent } from './certificateType/certificat-type-form/certificat-type-form.component';
import { CertificatTypeListComponent } from './certificateType/certificat-type-list/certificat-type-list.component';
import { MailTypeFormComponent } from './mailType/mail-type-form/mail-type-form.component';
import { MailTypeListComponent } from './mailType/mail-type-list/mail-type-list.component';
import { CroTypeListComponent } from './cro-type/cro-type-list/cro-type-list.component';
import { CroTypeFormComponent } from './cro-type/cro-type-form/cro-type-form.component';
import { CroFamilyFormComponent } from './cro-family/cro-family-form/cro-family-form.component';
import { CroFamilyListComponent } from './cro-family/cro-family-list/cro-family-list.component';
import { PrescriptionFormComponent } from './prescription-type/prescription-form/prescription-form.component';
import { PrescriptionListComponent } from './prescription-type/prescription-list/prescription-list.component';


@NgModule({
  declarations: [CheckUpListComponent, CheckUpFormComponent, CertificatTypeFormComponent, CertificatTypeListComponent, MailTypeFormComponent, MailTypeListComponent, PrescriptionListComponent, PrescriptionFormComponent, CroTypeListComponent, CroTypeFormComponent, CroFamilyFormComponent, CroFamilyListComponent],
  imports: [
    CommonModule,
    DocumentTypeRoutingModule
  ]
})
export class DocumentTypeModule { }
