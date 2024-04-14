import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { AllEventsResponse } from '../models/event.models';
import { from } from 'rxjs';


@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss'
})
export class EventDetailsComponent implements OnInit {
  loading: boolean = true;
  events !: AllEventsResponse[];

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.loading = true;
    from(this.eventService.getAllEvents()).subscribe({
      next: (events) => {
        this.events = events;
        console.log(events);
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
      }
    });

  }

  getSeverity(status: string) {
    switch (status) {
      case 'DONE':
        return 'success';
      case 'PENDING':
        return 'warning';
      case 'CANCELLED':
        return 'danger';
      default: return 'primary';
    }
  }

  getStatusSeverity(status: string) {
    switch (status) {
      case 'PENDING':
        return 'warning';
      case 'COMPLETED':
        return 'success';
      case 'CANCELLED':
        return 'danger'
      default: return 'primary';
    }
  }

}
