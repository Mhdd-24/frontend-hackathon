import { Component, Input, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { AuthService } from '../../../services/auth.service';
import { EventUpdateBody } from '../models/event.models';
import { ToastService } from '../../../services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-attendance',
  templateUrl: './event-attendance.component.html',
  styleUrl: './event-attendance.component.scss'
})
export class EventAttendanceComponent implements OnInit {

  @Input() eventId !: string;
  feedBack !: string;
  rating !: number;
  alreadyGaveFeedback: boolean = false;

  constructor(private eventService: EventService, private authService: AuthService, private toasterService: ToastService, private router : Router) {
  
  }

  ngOnInit(): void {
    console.log(this.eventId);
    this.eventService.getEventById(this.eventId).subscribe({
      next: (response) => {
        console.log(response);
        const attendee = response.attendance.find((attendee) => attendee.employee.email === this.authService.currentUser?.email);
        if (attendee) {
          this.alreadyGaveFeedback = attendee.category === "Feedback";
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onSendFeedback() {
    console.log(this.feedBack, this.rating);
    const body: EventUpdateBody = {
      eventId: this.eventId,
      employeeMail: this.authService.currentUser?.email as string,
      category: "Feedback",
      type: "",
      feedback: this.feedBack,
      isAttending: true,
      isPresent: true,
      rating: this.rating.toString()
    }
    console.log(body);

    this.eventService.upDateEvent(body).subscribe({
      next: (response) => {
        console.log(response);
        this.toasterService.showSuccessToast("Feedback sent successfully", "Success");
        this.router.navigate(['event/eventDetails']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


}
