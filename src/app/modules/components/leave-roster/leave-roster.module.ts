import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveRosterRoutingModule } from './leave-roster-routing.module';
import { LeaveRosterComponent } from './leave-roster/leave-roster.component';
import { NgprimeModule } from '../../shared/ngprime/ngprime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LeaveRosterComponent
 
  ],
  imports: [
    CommonModule,
    LeaveRosterRoutingModule,
    NgprimeModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class LeaveRosterModule { }
