import { Injectable } from '@angular/core';
import { DashboardEndpointService } from './dashboard-endpoint.service';
import { Observable, map } from 'rxjs';
import { DashboardResponse } from '../types/dashboard.model';
import { AllEventsResponse } from '../../event/models/event.models';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private dashboardEndpointService: DashboardEndpointService) { }


  getDashboardDetails(): Observable<DashboardResponse> {
    return this.dashboardEndpointService.getDashboardDetailsEndpoint().pipe(map(res => {
      return res;
    }));
  }

  getEventsToday(): Observable<AllEventsResponse[]> {
    return this.dashboardEndpointService.getEventsTodayEndpoint().pipe<AllEventsResponse[]>(map(res => {
      return res;
    }));
  }
}
