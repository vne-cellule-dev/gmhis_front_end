import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NbAccordionModule, NbActionsModule, NbBadgeComponent, NbBadgeModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbIconModule, NbLayoutModule, NbMenuModule, NbSearchModule, NbSidebarModule, NbUserModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { RouterModule } from '@angular/router';
import { Sidebar2Component } from './sidebar2/sidebar2.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FooterComponent, HeaderComponent, SidebarComponent, MainLayoutComponent, Sidebar2Component],
  imports: [
    RouterModule,
    CommonModule,
    LayoutRoutingModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbSearchModule,
    NbUserModule,
    NbActionsModule,
    NbCardModule,
    NbIconModule,
    NbSidebarModule.forRoot(),  // <---------
    NbMenuModule.forRoot(), 
    NbButtonModule,
    NgbDropdownModule,
    NgSelectModule,
    NbDatepickerModule.forRoot(),
    NbAccordionModule,
    NbBadgeModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
],
  exports:[
    FooterComponent,
    HeaderComponent,
    SidebarComponent
  ],
  //providers:[{provide: LOCALE_ID, useValue: 'fr-FR' }]
})
export class LayoutModule { }
