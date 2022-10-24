import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WaitingRoomRoutingModule } from './waiting-room-routing.module';
import { WaitingRoomListComponent } from './waiting-room-list/waiting-room-list.component';
import { WaitingRoomFormComponent } from './waiting-room-form/waiting-room-form.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [WaitingRoomListComponent, WaitingRoomFormComponent],
  imports: [
    CommonModule,
    WaitingRoomRoutingModule,
    SharedModule
  ]
})
export class WaitingRoomModule { }
