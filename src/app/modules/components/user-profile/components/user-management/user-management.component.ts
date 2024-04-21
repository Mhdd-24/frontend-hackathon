import { Table } from 'primeng/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeResponse } from '../../models/EmployeeTable.models';
import { UserProfileService } from '../../services/user-profile.service';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  loading: boolean = false;
  employee!: EmployeeResponse;
  allEmployeeDetails: EmployeeResponse[] = [];
  @ViewChild('dt') dt!: Table;


  constructor(
    private userProfileService: UserProfileService
  ) { }

  ngOnInit() {
    this.fetchEmployeeDetailsList();
  }

  fetchEmployeeDetailsList() {
    this.userProfileService.getEmployeeDetailsList().subscribe({
      next: (employee: EmployeeResponse[]) => {
        this.loading = false;
        console.log("data", employee);
        this.allEmployeeDetails = employee;
      },
      error: (error: any) => {
        console.log(error);
        this.loading = false;
      }
    });
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
}
