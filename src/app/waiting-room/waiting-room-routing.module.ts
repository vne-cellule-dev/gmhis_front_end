import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WaitingRoomListComponent } from './waiting-room-list/waiting-room-list.component';

const routes: Routes = [
  {path : 'list', component: WaitingRoomListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaitingRoomRoutingModule { }
