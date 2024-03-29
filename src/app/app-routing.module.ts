import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LoginComponent } from './login/login.component';
import { PasswordResetComponent } from './login/password-reset/password-reset.component';
import { AuthenticationGuard } from './_guard/authentication.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  }, // redirect to home

  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: 'home', component: DashboardComponent },
      {
        path: 'act',
        loadChildren: () => import('./act/act.module').then((m) => m.ActModule),
      },
      {
        path: 'admission',
        loadChildren: () =>
          import('./admission/admission.module').then(
            (m) => m.AdmissionModule
          ),
      },
      {
        path: 'antecedent',
        loadChildren: () =>
          import('./antecedent/antecedent.module').then(
            (m) => m.AntecedentModule
          ),
      },
      {
        path: 'insurance',
        loadChildren: () =>
          import('./insurance/insurance.module').then((m) => m.InsuranceModule),
      },
      {
        path: 'cash-register',
        loadChildren: () =>
          import('./cash-register/cash-register.module').then(
            (m) => m.CashRegisterModule
          ),
      },
      {
        path: 'cashier',
        loadChildren: () =>
          import('./cashier/cashier.module').then((m) => m.CashierModule),
      },
      {
        path: 'cr-activity',
        loadChildren: () =>
          import('./cr-activity/cr-activity.module').then( (m) => m.CrActivityModule),
      },
      {
        path: 'constant', 
        loadChildren: () =>
          import('./constant/constant.module').then((m) => m.ConstantModule),
      },
      {
        path: 'convention',
        loadChildren: () =>
          import('./convention/convention.module').then(
            (m) => m.ConventionModule
          ),
      },
      {
        path: 'document',
        loadChildren: () =>
          import('./document-type/document-type.module').then(
            (m) => m.DocumentTypeModule
          ),
      },
      {
        path: 'examen',
        loadChildren: () =>
          import('./examen/examen.module').then(
            (m) => m.ExamenModule
          ),
      },
      {
        path: 'drug',
        loadChildren: () =>
          import('./drug/drug.module').then(
            (m) => m.DrugModule
          ),
      },
        {
        path: 'facility',
        loadChildren: () =>
          import('./facility/facility.module').then(
            (m) => m.FacilityModule
          ),
      },
      {
        path: 'invoice',
        loadChildren: () =>
          import('./invoice/invoice.module').then(
            (m) => m.InvoiceModule
          ),
      },
      {
        path: 'patient',
        loadChildren: () =>
          import('./patient/patient.module').then((m) => m.PatientModule),
      },
      {
        path: 'prescription',
        loadChildren: () =>
          import('./prescription/prescription.module').then((m) => m.PrescriptionModule),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'role',
        loadChildren: () =>
          import('./role/role.module').then((m) => m.RoleModule),
      },
      {
        path : 'medical-folder',
        loadChildren: () =>
          import('./medical-folder/medical-folder.module').then((m) => m.MedicalFolderModule)
      },
      {
        path: 'waiting-room',
        loadChildren: () =>
          import('./waiting-room/waiting-room.module').then((m) => m.WaitingRoomModule),
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'reset-password',
    component: PasswordResetComponent,
    canActivate: [AuthenticationGuard],
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthenticationGuard],
})
export class AppRoutingModule {}
