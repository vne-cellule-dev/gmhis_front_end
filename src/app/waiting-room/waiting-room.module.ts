import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WaitingRoomRoutingModule } from './waiting-room-routing.module';
import { WaitingRoomListComponent } from './waiting-room-list/waiting-room-list.component';
import { WaitingRoomFormComponent } from './waiting-room-form/waiting-room-form.component';
import { SharedModule } from '../shared/shared.module';
import { PatientInWaitingRoomComponent } from './patient-in-waiting-room/patient-in-waiting-room.component';


@NgModule({
  declarations: [WaitingRoomListComponent, WaitingRoomFormComponent, PatientInWaitingRoomComponent],
  imports: [
    CommonModule,
    WaitingRoomRoutingModule,
    SharedModule
  ]
})
export class WaitingRoomModule { }
