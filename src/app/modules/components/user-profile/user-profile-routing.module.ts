import { RaiseComplaintComponent } from './components/raise-complaint/raise-complaint.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './components/user-profile.component';
import { UserManagementComponent } from './components/user-management/user-management.component';

const routes: Routes = [
  { path: '', component: UserProfileComponent },
  { path: 'employeeDetails', component: UserManagementComponent },
  { path: 'raiseComplaint', component: RaiseComplaintComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
