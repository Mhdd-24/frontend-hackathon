import { Injectable } from '@angular/core';
import { EndpointBase } from '../../../services/endpoint-base.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { ConfigurationService } from '../../../services/configuration.service';
import { Observable } from 'rxjs';
import { DashboardResponse } from '../types/dashboard.model';
import { AllEventsResponse } from '../../event/models/event.models';

@Injectable({
  providedIn: 'root'
})
export class DashboardEndpointService extends EndpointBase {

  get dashboardURL() { return this.configuration.baseUrl + '/getDashboardDetails'; }
  get eventsTodayURL() { return this.configuration.baseUrl + '/getTodayEvents'; }

  constructor(private configuration: ConfigurationService, http: HttpClient, authService: AuthService) {
    super(http, authService);
  }

  getDashboardDetailsEndpoint(): Observable<DashboardResponse> {
    return this.http.get<DashboardResponse>(this.dashboardURL);
  }

  getEventsTodayEndpoint(): Observable<AllEventsResponse[]> {
    return this.http.get<AllEventsResponse[]>(this.eventsTodayURL);
  }

}
