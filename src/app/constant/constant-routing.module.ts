import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConstantDomainListComponent } from './constantDomain/constant-domain-list/constant-domain-list.component';
import { ConstantTypeListComponent } from './constantType/constant-type-list/constant-type-list.component';
import { PatientConstantComponent } from './patient-constant/patient-constant.component';

const routes: Routes = [
  {path : 'domain', component: ConstantDomainListComponent},
  {path : 'type', component : ConstantTypeListComponent},
  {path : 'patient-constant/:patientId', component : PatientConstantComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConstantRoutingModule { }
