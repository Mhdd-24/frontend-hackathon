import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './components/user-profile.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgprimeModule } from '../../shared/ngprime/ngprime.module';


@NgModule({
  declarations: [
    UserProfileComponent,
    UserManagementComponent
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    ReactiveFormsModule,
    NgprimeModule,
    FormsModule
  ]
})
export class UserProfileModule { }
