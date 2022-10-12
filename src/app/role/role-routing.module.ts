import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListRoleComponent } from './list-role/list-role.component';
import { PermissionComponent } from './permission/permission.component';

const routes: Routes = [
  {path : "list", component: ListRoleComponent},
  {path : "permission", component: PermissionComponent},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
