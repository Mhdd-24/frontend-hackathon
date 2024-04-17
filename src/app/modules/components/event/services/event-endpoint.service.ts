import { Injectable } from '@angular/core';
import { ConfigurationService } from '../../../services/configuration.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { EndpointBase } from '../../../services/endpoint-base.service';
import { Observable, catchError } from 'rxjs';
import { AllEventsResponse, EventRequest, EventUpdateBody, eventSaveResponse } from '../models/event.models';

@Injectable({
  providedIn: 'root'
})
export class EventEndpointService extends EndpointBase {

  get saveEventURL() { return this.configuration.baseUrl + '/event'; }
  get getAllEventsURL() { return this.configuration.baseUrl + '/events'; }
  get updateVolunteerURL() { return this.configuration.baseUrl + '/event/update'; }

  constructor(private configuration: ConfigurationService, http: HttpClient, authService: AuthService) {
    super(http, authService);
  }

  saveEvent(event: EventRequest): Observable<eventSaveResponse> {
    return this.http.post<eventSaveResponse>(this.saveEventURL, JSON.stringify(event), this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.saveEvent(event));
      }
      )
    )
  }

  getAllEvents(): Observable<AllEventsResponse[]> {
    return this.http.get<AllEventsResponse[]>(this.getAllEventsURL, this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.getAllEvents());
      }
      )
    )
  }

  getEventById(id: string): Observable<AllEventsResponse> {
    return this.http.get<AllEventsResponse>(`${this.saveEventURL}?id=${id}`, this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.getEventById(id));
      }
      )
    )
  }

  updateEvent(event: EventUpdateBody): Observable<eventSaveResponse> {
    return this.http.post<eventSaveResponse>(this.updateVolunteerURL, JSON.stringify(event), this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.updateEvent(event));
      }
      )
    )
  }
}
