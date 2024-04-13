import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRegistrationRoutingModule } from './event-registration-routing.module';
import { EventRegistrationComponent } from './event-registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgprimeModule } from '../../../shared/ngprime/ngprime.module';


@NgModule({
  declarations: [
    EventRegistrationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgprimeModule,
    EventRegistrationRoutingModule
  ]
})
export class EventRegistrationModule { }
