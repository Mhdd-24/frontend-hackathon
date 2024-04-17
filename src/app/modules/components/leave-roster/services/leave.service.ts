import { Injectable } from '@angular/core';
import { LeaveRosterEndPointService } from './leave-endpoint.service';
import { Observable, map } from 'rxjs';
import { ApiResponse } from '../../../services/response';
import { LeaveResponse } from '../models/leaveRoster.model';


@Injectable({
    providedIn: 'root'
})
export class LeaveService {

    constructor(private leaveService: LeaveRosterEndPointService) { }

    uploadFile(formData: FormData): Observable<LeaveResponse> {

        return this.leaveService.uploadFile(formData).pipe<LeaveResponse>(map(res => {
            return res;
        }
        ))
    }

    getLeaveData(formData: FormData): Observable<LeaveResponse> {
        return this.leaveService.getLeaveData(formData).pipe<LeaveResponse>(map(res => {
            return res;
        }
        ))
    }
}
