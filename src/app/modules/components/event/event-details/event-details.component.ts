import { Component, Input, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { AllEventsResponse } from '../models/event.models';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ToastService } from '../../../services/toast.service';


@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss',
  providers: [ConfirmationService]
})
export class EventDetailsComponent implements OnInit {

  loading: boolean = true;
  events !: AllEventsResponse[];

  constructor(private eventService: EventService, private router: Router, private confirmationService: ConfirmationService, private toastService: ToastService) { }

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

  onEditClick(id: string) {
    this.router.navigate(['event/eventRegistration', id]);
  }

  deleteProduct(product: AllEventsResponse) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.eventName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.events = this.events.filter((val) => val.id !== product.id);
        this.toastService.showSuccessToast('Event Deleted', 'Successfully');
      }
    });
  }


}
