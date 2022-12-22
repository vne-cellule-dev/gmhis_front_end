import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgxDropzoneModule } from 'ngx-dropzone';
import { LOCALE_ID } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbIconModule, NbSearchModule, NbSidebarModule, NbMenuModule, NbCardModule, NbDatepickerModule, NbTimepickerModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { LayoutModule } from './layout/layout.module';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginModule } from './login/login.module';
import { AuthenticationGuard } from './_guard/authentication.guard';
import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';
import { AuthInterceptor } from './_interceptor/auth.interceptor';
import { NotificationModule } from './_utilities/notification/notification.module';
import { NotificationService } from './_services/notification.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import {CurrencyPipe, registerLocaleData} from '@angular/common'
import localFr from '@angular/common/locales/fr';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

registerLocaleData(localFr, 'fr');

@NgModule({
 
  declarations: [
    AppComponent,
    DashboardComponent
  ],  
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),   
    AppRoutingModule,
    HttpClientModule,
    NotificationModule,
    LoginModule,
    LayoutModule,
    BrowserAnimationsModule,
    NbIconModule,               // <---------
    NbSidebarModule.forRoot(),  // <---------
    NbMenuModule.forRoot(),     // <---------
    NbThemeModule.forRoot({name: 'default'}),
    NbLayoutModule,
    NbEvaIconsModule,
    NbSearchModule,
    NbCardModule,
    NgbModule,
    FontAwesomeModule,
    NgxDropzoneModule,
    NbDatepickerModule.forRoot(),
    NbTimepickerModule.forRoot(),
    NbDateFnsDateModule.forRoot({format: 'dd/MM/yyyy' }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    
    ],
  providers: [NotificationService,AuthenticationGuard, AuthenticationService, UserService,
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, {provide: LOCALE_ID, useValue: 'fr'},
 ],
  bootstrap: [AppComponent]
})
export class AppModule { }
