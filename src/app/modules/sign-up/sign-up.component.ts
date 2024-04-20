import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LayoutService } from '../services/layout.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  password!: string;
  loading = false;
  loginForm !: FormGroup;

  constructor(public layoutService: LayoutService, private formBuilder: FormBuilder, private authService: AuthService, private messageService: ToastService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: new FormControl<string>('jaeson.karter@bajajfinserv.in', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(50)]),
      password: new FormControl<string>('Pass@123', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      passwordConfirm: new FormControl<string>('Pass@123', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      rememberMe: new FormControl<boolean>(false)
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  checkError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName) && this.loginForm.controls[controlName].dirty;
  }

  resetForm(): void {
    this.loginForm.reset();
  }

  onSignUp(): void {
    this.loading = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.signupWithPassword(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value, this.loginForm.get('rememberMe')?.value).subscribe({
      next: (response) => {
        if (response.status === "SUCCESS") {
          this.loading = false;
          this.resetForm();
          if (response.role?.toLowerCase() === 'admin') {
            this.messageService.showSuccessToast('Success', `${response.message} as ${response.role}`);
          } else {
            this.messageService.showSuccessToast('Success', `${response.message}`);
          }
        }
        else {
          this.loading = false;
          this.messageService.showErrorToast('Error', response.message);
        }
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
      }
    })
  }
}
