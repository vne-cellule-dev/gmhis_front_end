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
          import('./admission/admission.module').then((m) => m.AdmissionModule),
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
        path: 'invoice',
        loadChildren: () =>
          import('./invoice/invoice.module').then((m) => m.InvoiceModule),
      },
      {
        path: 'patient',
        loadChildren: () =>
          import('./patient/patient.module').then((m) => m.PatientModule),
      },
      {
        path: 'waiting-room',
        loadChildren: () =>
          import('./waiting-room/waiting-room.module').then(
            (m) => m.WaitingRoomModule
          ),
      },
      {
        path: 'unite-mesure',
        loadChildren: () =>
          import('./unite-mesure/unite-mesure.module').then(
            (m) => m.UniteMesureModule
          ),
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
