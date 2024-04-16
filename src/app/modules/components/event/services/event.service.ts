import { Injectable } from '@angular/core';
import { EventEndpointService } from './event-endpoint.service';
import { Observable, map } from 'rxjs';
import { AllEventsResponse, EventRequest, eventSaveResponse } from '../models/event.models';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private eventEndPointService: EventEndpointService) { }

  saveEvent(event: EventRequest): Observable<eventSaveResponse> {
    return this.eventEndPointService.saveEvent(event).pipe<eventSaveResponse>(map(res => {
      return res;
    }))
  }

  getAllEvents(): Observable<AllEventsResponse[]> {
    return this.eventEndPointService.getAllEvents().pipe<AllEventsResponse[]>(map(res => {
      return res;
    }))
  }

  getEventById (id: string): Observable<AllEventsResponse> {
    return this.eventEndPointService.getEventById(id).pipe<AllEventsResponse>(map(res => {
      return res;
    }))
  }
}
