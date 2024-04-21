import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { UserProfileService } from '../services/user-profile.service';
import { ToastService } from '../../../services/toast.service';
import { AuthService } from '../../../services/auth.service';

interface Department {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  employeeForm !: FormGroup;

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

  constructor(private fb: FormBuilder, private userProfileService: UserProfileService, private toasterService: ToastService, private authService: AuthService) { }

  ngOnInit(): void {
    console.log(this.authService.currentUser);
    this.employeeForm = this.fb.group({
      empid: ['2024', Validators.required],
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
      this.userProfileService.saveEmployee({ ...this.employeeForm.value, mobileno: this.employeeForm.get('mobileno')?.value.toString(), department:this.employeeForm.get('department')?.value.value  }).subscribe({
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

  get skills(): FormArray {
    return this.employeeForm.get("checkLists") as FormArray
  }
}
