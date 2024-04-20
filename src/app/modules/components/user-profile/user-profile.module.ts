import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './components/user-profile.component';
import { UserManagementComponent } from './components/user-management/user-management.component';


@NgModule({
  declarations: [
    UserProfileComponent,
    UserManagementComponent
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule
  ]
})
export class UserProfileModule { }
