import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  employeeForm !: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      empid: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      designation: ['', Validators.required],
      dob: ['', Validators.required],
      doj: ['', Validators.required],
      address: ['', Validators.required],
      mobileno: ['', Validators.required],
      userId: ['', Validators.required],
      employeeExperience: this.fb.group({
        companyName: [''],
        domain: [''],
        yearsOfExp: ['']
      }),
      skillVsRating: this.fb.group({
        java: ['']
      }),
      skills: this.fb.array([])
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
    } else {
      console.log('Form is invalid');
    }
  }

  get skills(): FormArray {
    return this.employeeForm.get("checkLists") as FormArray
  }
}
