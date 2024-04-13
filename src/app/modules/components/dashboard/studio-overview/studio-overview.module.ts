import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudioOverviewRoutingModule } from './studio-overview-routing.module';
import { StudioOverviewComponent } from './studio-overview.component';
import { NgprimeModule } from '../../../shared/ngprime/ngprime.module';


@NgModule({
  declarations: [
    StudioOverviewComponent
  ],
  imports: [
    CommonModule,
    StudioOverviewRoutingModule,
    NgprimeModule
  ]
})
export class StudioOverviewModule { }
