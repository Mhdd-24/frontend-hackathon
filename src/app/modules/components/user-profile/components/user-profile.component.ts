import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { UserProfileService } from '../services/user-profile.service';
import { ToastService } from '../../../services/toast.service';
import { AuthService } from '../../../services/auth.service';
import { EmployeeResponse } from '../models/EmployeeTable.models';

interface Department {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  employeeForm !: FormGroup;
  allEmployeeDetails: EmployeeResponse[] = [];
  oneEmployeeDEtails !: EmployeeResponse;

  departments: Department[] = [
    { value: 'HR', viewValue: 'HR' },
    { value: 'IT', viewValue: 'IT' },
    { value: 'Finance', viewValue: 'Finance' },
    { value: 'Web Portals', viewValue: 'Web Portals' },
    { value: 'Mobility', viewValue: 'Mobility' },
    { value: 'Data', viewValue: 'Data' },
    { value: 'Martech', viewValue: 'Martech' },
    { value: 'SFDC', viewValue: 'SFDC' }
  ];

  constructor(private fb: FormBuilder, private userProfileService: UserProfileService, private toasterService: ToastService, private authService: AuthService) {

  }

  ngOnInit(): void {
    console.log(this.authService.currentUser);
    this.employeeForm = this.fb.group({
      empid: [''],
      name: ['Jaeson Karter', Validators.required],
      email: [this.authService.currentUser?.email, [Validators.required, Validators.email]],
      department: [{ value: 'IT', viewValue: 'IT' }, Validators.required],
      designation: ['Software Engineer', Validators.required],
      dob: ['06/15/1990', Validators.required],
      doj: ['04/04/2022', Validators.required],
      address: ['Juliee Illam, Ragine Gandhi Lane, Maradu, Kochi, 682393', Validators.required],
      mobileno: [9946655526, Validators.required],
      userId: ['jaeson.karter', Validators.required],
    });

    this.fetchEmployeeDetailsList();
  }


  addSkill() {
    this.skills.push(this.fb.group({
      skill: ['', Validators.required],
      rating: ['', Validators.required]
    }));
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.value);
      // Here you can submit the form data to your backend or perform any other actions
      this.userProfileService.saveEmployee({ ...this.employeeForm.value, mobileno: this.employeeForm.get('mobileno')?.value.toString(), department: this.employeeForm.get('department')?.value.value, dob: this.formatDate(this.employeeForm.get('dob')?.value), doj: this.formatDate(this.employeeForm.get('doj')?.value), empid: (this.employeeForm.get('empid')?.value) }).subscribe({
        next: (response) => {
          console.log(response);
          this.fetchEmployeeDetailsList();

          this.toasterService.showSuccessToast("Updated Successfully", response.message);
        },
        error: (error) => {
          console.log(error);
        }
      })
    } else {
      console.log('Form is invalid');
    }
  }

  get skills(): FormArray {
    return this.employeeForm.get("checkLists") as FormArray
  }


  formatDate(inputDate: string): string {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  fetchEmployeeDetailsList() {
    this.userProfileService.getEmployeeDetailsList().subscribe({
      next: (employee: EmployeeResponse[]) => {

        console.log("data", employee);
        this.allEmployeeDetails = employee;
        this.oneEmployeeDEtails = employee.find((emp) => emp.email === this.authService.currentUser?.email)!;
        console.log("oneEmployeeDEtails", this.oneEmployeeDEtails);
        this.employeeForm.patchValue({
          empid: this.oneEmployeeDEtails.empid,
          name: this.oneEmployeeDEtails.name,
          email: this.oneEmployeeDEtails.email,
          department: { value: this.oneEmployeeDEtails.department, viewValue: this.oneEmployeeDEtails.department },
          designation: this.oneEmployeeDEtails.designation,
          dob: this.convertToDate(this.oneEmployeeDEtails.dob),
          doj: this.convertToDate(this.oneEmployeeDEtails.doj),
          address: this.oneEmployeeDEtails.address,
          mobileno: this.oneEmployeeDEtails.mobileno,
          userId: this.oneEmployeeDEtails.userId
        });
      },
      error: (error: any) => {
        console.log(error);

      }
    });
  }

  convertToDate(date: string) {
    const dateString = date;
    const [day, month, year] = dateString.split('/').map(Number);
    const dateObject = new Date(year, month - 1, day);
    return dateObject;

  }

}
