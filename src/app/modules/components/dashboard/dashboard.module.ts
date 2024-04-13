import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgprimeModule } from '../../shared/ngprime/ngprime.module';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgprimeModule
  ]
})
export class DashboardModule { }
