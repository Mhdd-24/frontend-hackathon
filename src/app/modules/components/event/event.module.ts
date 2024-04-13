import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { EventVolunteerComponent } from './event-volunteer/event-volunteer.component';
import { NgprimeModule } from '../../shared/ngprime/ngprime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuggestEventComponent } from './suggest-event/suggest-event.component';


@NgModule({
  declarations: [

    EventVolunteerComponent,
    SuggestEventComponent
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
    NgprimeModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EventModule { }
