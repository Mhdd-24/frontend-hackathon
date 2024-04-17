import { Injectable } from '@angular/core';
import { ConfigurationService } from '../../../services/configuration.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { EndpointBase } from '../../../services/endpoint-base.service';
import { Observable, catchError } from 'rxjs';
import { LeaveResponse } from '../models/leaveRoster.model';


@Injectable({
    providedIn: 'root'
})
export class LeaveRosterEndPointService {

    get uploadFileURL() { return this.configuration.baseUrl + '/upload'; }
    get leaveDataURL() { return this.configuration.baseUrl + '/employeesOnLeave'; }

    constructor(private configuration: ConfigurationService, private http: HttpClient, authService: AuthService) {

    }

    //MultiForm Dara to upload excel sheet http post call
    uploadFile(formData: FormData): Observable<LeaveResponse> {

        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');

        console.log(formData);

        return this.http.post<LeaveResponse>(this.uploadFileURL, formData, { headers: headers });

    }

    // getLeaveData
    getLeaveData(fromData: FormData): Observable<LeaveResponse> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        return this.http.post<LeaveResponse>(this.leaveDataURL, fromData, { headers: headers });
    }




}
