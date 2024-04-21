import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../shared/app-layout/services/layout.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [AuthService],
})
export class LoginComponent implements OnInit {
  password!: string;
  loading = false;
  loginForm !: FormGroup;

  constructor(public layoutService: LayoutService, private formBuilder: FormBuilder, private authService: AuthService, private messageService: ToastService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: new FormControl<string>('jaeson.karter@bajajfinserv.in', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(50)]),
      password: new FormControl<string>('Pass@123', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
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

  onSignIn(): void {
    this.loading = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.loginWithPassword(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value, this.loginForm.get('rememberMe')?.value).subscribe({
      next: (response) => {
        console.log(response);
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

  onSignUpClick(): void {
    this.router.navigate(['/signUp']);
  }

}
