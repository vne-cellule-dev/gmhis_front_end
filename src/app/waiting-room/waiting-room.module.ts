import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WaitingRoomRoutingModule } from './waiting-room-routing.module';
import { WaitingRoomListComponent } from './waiting-room-list/waiting-room-list.component';
import { WaitingRoomFormComponent } from './waiting-room-form/waiting-room-form.component';
import { SharedModule } from '../shared/shared.module';
import { PatientInWaitingRoomComponent } from './patient-in-waiting-room/patient-in-waiting-room.component';
import { ConstantWaitingRoomComponent } from './constant-waiting-room/constant-waiting-room.component';
import { InvoiceModule } from '../invoice/invoice.module';


@NgModule({
  declarations: [WaitingRoomListComponent, WaitingRoomFormComponent, PatientInWaitingRoomComponent, ConstantWaitingRoomComponent],
  imports: [
    CommonModule,
    WaitingRoomRoutingModule,
    SharedModule,
    InvoiceModule
  ]
})
export class WaitingRoomModule { }
