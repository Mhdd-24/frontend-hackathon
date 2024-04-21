import { Injectable } from '@angular/core';

import { EndpointBase } from '../../../services/endpoint-base.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { ConfigurationService } from '../../../services/configuration.service';
import { Employee } from '../../leave-roster/models/leaveRoster.model';
import { Observable, catchError } from 'rxjs';
import { SaveEmployeeResponse } from '../../../models/login-response.model';
import { EmployeeResponse } from '../models/EmployeeTable.models';

@Injectable({
  providedIn: 'root'
})
export class UserProfileEndpointService extends EndpointBase {
   saveEmployeeURL() { return this.configuration.baseUrl + '/employees'; }
   employeeDetailsURL() { return this.configuration.baseUrl + '/employees' }

  constructor(private configuration: ConfigurationService, http: HttpClient, authService: AuthService) {
    super(http, authService);
  }

  saveEmployeeEndpoint(employee: Employee): Observable<SaveEmployeeResponse> {
    return this.http.post<SaveEmployeeResponse>(this.saveEmployeeURL(), JSON.stringify(employee), this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.saveEmployeeEndpoint(employee));
      }
      )
    )
  }

  getEmployeeDetailsEndPoint(): Observable<EmployeeResponse[]>{
    return this.http.get<EmployeeResponse[]>(this.employeeDetailsURL());
  }
}
