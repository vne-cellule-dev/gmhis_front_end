import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CertificatTypeListComponent } from './certificateType/certificat-type-list/certificat-type-list.component';
import { CheckUpListComponent } from './check-up/check-up-list/check-up-list.component';
import { CroFamilyListComponent } from './cro-family/cro-family-list/cro-family-list.component';
import { CroTypeListComponent } from './cro-type/cro-type-list/cro-type-list.component';
import { MailTypeListComponent } from './mailType/mail-type-list/mail-type-list.component';
import { PrescriptionListComponent } from './prescription-type/prescription-list/prescription-list.component';

const routes: Routes = [
  {path : 'check-up', component : CheckUpListComponent},
  {path : 'certificat', component : CertificatTypeListComponent},
  {path : 'mail', component : MailTypeListComponent},
  {path : 'prescription', component : PrescriptionListComponent},
  {path : 'cro', component : CroTypeListComponent},
  {path : 'cro-family', component : CroFamilyListComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentTypeRoutingModule { }
