import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { UserProfileService } from '../services/user-profile.service';
import { ToastService } from '../../../services/toast.service';
import { AuthService } from '../../../services/auth.service';
import { EmployeeResponse } from '../models/EmployeeTable.models';
import { EmployeeData } from '../../dashboard/types/dashboard.model';

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
      name: ['', Validators.required],
      email: [this.authService.currentUser?.email, [Validators.required, Validators.email]],
      department: [{ value: '', viewValue: '' }, Validators.required],
      designation: ['', Validators.required],
      dob: ['', Validators.required],
      doj: ['', Validators.required],
      address: ['', Validators.required],
      mobileno: [null, Validators.required],
      userId: ['', Validators.required],
      employeeExperience: this.fb.array([
        this.fb.group({
          companyName: new FormControl<string | null>(null),
          domain: new FormControl<string | null>(null),
          yearsOfExp: new FormControl<number | null>(null)
        })
      ]),
      skillVsRating: this.fb.array([
        this.fb.group({
          skill: new FormControl<string | null>(null),
          rating: new FormControl<number | null>(null)
        })
      ])
    });

    this.fetchEmployeeDetailsList();
  }



  onSubmit() {

    let skillObj: any = {}
    console.log(this.employeeForm.get('skillVsRating')?.value)
    this.employeeForm.get('skillVsRating')?.value.forEach((skill: any) => {
      skillObj[skill.skill] = skill.rating;
    })
    

    if (this.employeeForm.valid) {
      console.log(this.employeeForm.value);
      const employeeData: EmployeeData = {
        empid: this.employeeForm.get('empid')?.value,
        name: this.employeeForm.get('name')?.value,
        email: this.employeeForm.get('email')?.value,
        department: this.employeeForm.get('department')?.value.value,
        designation: this.employeeForm.get('designation')?.value,
        dob: this.formatDate(this.employeeForm.get('dob')?.value),
        doj: this.formatDate(this.employeeForm.get('doj')?.value),
        address: this.employeeForm.get('address')?.value,
        mobileno: this.employeeForm.get('mobileno')?.value,
        userId: this.employeeForm.get('userId')?.value,
        employeeExperience: this.employeeForm.get('employeeExperience')?.value,
        skillVsRating: skillObj
      }

      console.log(employeeData);
      // Here you can submit the form data to your backend or perform any other actions
      this.userProfileService.saveEmployee(employeeData).subscribe({
        next: (response) => {
          console.log(response);


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


        if (this.oneEmployeeDEtails.employeeExperience.length >= 1) {
          this.removeEmployeeExperience(0);

          for (let i = 0; i < this.oneEmployeeDEtails.employeeExperience.length; i++) {
            this.employeeExperience.push(
              this.fb.group({
                companyName: new FormControl<string | null>(this.oneEmployeeDEtails.employeeExperience[i].companyName),
                domain: new FormControl<string | null>(this.oneEmployeeDEtails.employeeExperience[i].domain),
                yearsOfExp: new FormControl<number | null>(this.oneEmployeeDEtails.employeeExperience[i].yearsOfExp),
              })
            )
          }
        }

        if (this.oneEmployeeDEtails.skillVsRating) {
          this.remvoeSkillsRating(0);
          Object.keys(this.oneEmployeeDEtails.skillVsRating).forEach((key) => {
            this.skillsVsRating.push(
              this.fb.group({
                skill: new FormControl<string | null>(key),
                rating: new FormControl<number | null>(this.oneEmployeeDEtails.skillVsRating[key])
              })
            )
          })
        }
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


  get employeeExperience(): FormArray {
    return this.employeeForm.get("employeeExperience") as FormArray;
  }

  newEmployeeExperience() {
    this.employeeExperience.push(this.fb.group({
      companyName: new FormControl<string | null>(null),
      domain: new FormControl<string | null>(null),
      yearsOfExp: new FormControl<number | null>(null),
    }));
  }

  removeEmployeeExperience(index: number) {
    this.employeeExperience.removeAt(index);
  }

  get skillsVsRating(): FormArray {
    return this.employeeForm.get("skillVsRating") as FormArray;
  }

  newSkillsRating() {
    this.skillsVsRating.push(this.fb.group({
      skill: new FormControl<string | null>(null),
      rating: new FormControl<number | null>(null)
    }));
  }

  remvoeSkillsRating(index: number) {
    this.skillsVsRating.removeAt(index);
  }

}
