import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConstantWaitingRoomComponent } from './constant-waiting-room/constant-waiting-room.component';
import { PatientInWaitingRoomComponent } from './patient-in-waiting-room/patient-in-waiting-room.component';
import { WaitingRoomListComponent } from './waiting-room-list/waiting-room-list.component';

const routes: Routes = [
  {path : 'list', component: WaitingRoomListComponent},
  {path : 'waitingRoom', component : PatientInWaitingRoomComponent},
  {path : 'constantWaitingRoom', 
  component : ConstantWaitingRoomComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaitingRoomRoutingModule { }
