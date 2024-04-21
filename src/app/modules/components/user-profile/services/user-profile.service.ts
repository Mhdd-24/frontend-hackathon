import { Injectable } from '@angular/core';
import { UserProfileEndpointService } from './user-profile-endpoint.service';
import { Observable, map } from 'rxjs';
import { Employee } from '../../leave-roster/models/leaveRoster.model';
import { SaveEmployeeResponse } from '../../../models/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private userProfileEndPointService: UserProfileEndpointService) { }


  saveEmployee(employee: Employee): Observable<SaveEmployeeResponse> {
    return this.userProfileEndPointService.saveEmployeeEndpoint(employee).pipe<SaveEmployeeResponse>(map(res => {
      return res;
    }));
  }
}
