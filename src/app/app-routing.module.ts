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
        path: 'document',
        loadChildren: () =>
          import('./document-type/document-type.module').then(
            (m) => m.DocumentTypeModule
          ),
      },
      {
        path: 'patient',
        loadChildren: () =>
          import('./patient/patient.module').then((m) => m.PatientModule),
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
