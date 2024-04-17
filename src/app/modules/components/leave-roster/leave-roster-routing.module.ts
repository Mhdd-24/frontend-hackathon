import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaveRosterComponent } from './leave-roster/leave-roster.component';


const routes: Routes = [{ path: 'uploadLeaves', component: LeaveRosterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveRosterRoutingModule { }
