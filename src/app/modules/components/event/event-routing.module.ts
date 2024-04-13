import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventRegistrationComponent } from './event-registration/event-registration.component';
import { EventVolunteerComponent } from './event-volunteer/event-volunteer.component';
import { SuggestEventComponent } from './suggest-event/suggest-event.component';


const routes: Routes = [
  { path: 'eventRegistration', loadChildren: () => import('./event-registration/event-registration.module').then(m => m.EventRegistrationModule) },
  { path: 'eventDetails', loadChildren: () => import('./event-details/event-details.module').then(m => m.EventDetailsModule) },
  { path: 'volunteerEvent', component: EventVolunteerComponent },
  { path: 'eventSuggestion', component: SuggestEventComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
