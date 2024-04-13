import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventDetailsRoutingModule } from './event-details-routing.module';
import { EventDetailsComponent } from './event-details.component';
import { NgprimeModule } from '../../../shared/ngprime/ngprime.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EventDetailsComponent
  ],
  imports: [
    CommonModule,
    EventDetailsRoutingModule,
    NgprimeModule,    
    FormsModule
  ]
})
export class EventDetailsModule { }
