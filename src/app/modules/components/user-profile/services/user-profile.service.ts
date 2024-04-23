import { Injectable } from '@angular/core';

import { UserProfileEndpointService } from './user-profile-endpoint.service';
import { Observable, map } from 'rxjs';
import { Employee } from '../../leave-roster/models/leaveRoster.model';
import { SaveEmployeeResponse } from '../../../models/login-response.model';
import { EmployeeResponse } from '../models/EmployeeTable.models';
import { EmployeeData } from '../../dashboard/types/dashboard.model';


@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private userProfileEndPointService: UserProfileEndpointService) { }



  saveEmployee(employee: EmployeeData): Observable<SaveEmployeeResponse> {
    return this.userProfileEndPointService.saveEmployeeEndpoint(employee).pipe<SaveEmployeeResponse>(map(res => {
      return res;
    }));
  }


  
  getEmployeeDetailsList(): Observable<EmployeeResponse[]>{
    return this.userProfileEndPointService.getEmployeeDetailsEndPoint().pipe<EmployeeResponse[]>(map((res : EmployeeResponse[]) => {
      console.log(res);
      return res;
    }))
  }

  

}
