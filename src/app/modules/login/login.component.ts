import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../shared/app-layout/services/layout.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [AuthService, MessageService],
})
export class LoginComponent implements OnInit {
  password!: string;
  loading = false;
  loginForm !: FormGroup;

  constructor(public layoutService: LayoutService, private formBuilder: FormBuilder, private authService: AuthService, private messageService : MessageService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: new FormControl<string>('jaeson.karter@bajajfinserv.in', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(50)]),
      password: new FormControl<string>('Pass@123', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
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
        if (response.status === "SUCCESS") {
          this.loading = false;
          this.resetForm();
        }
        else{
          this.loading = false;
          this.messageService.add({severity:'error', summary: 'Error', detail: response.message});
        }
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
      }
    })
  }

}
