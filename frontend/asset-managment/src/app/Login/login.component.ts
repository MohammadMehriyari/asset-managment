import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  FormBuilder,
  FormControl,
  FormGroup,
  MaxLengthValidator,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { HttpResponse } from '@angular/common/http';
@Component({
  selector: 'as-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;
  userpersonalid: string = '';
  userpasword: string = '';

  showPassword!: FormControl;
  errorMessage: string = '';
  @ViewChild('myDiv') myDiv!: ElementRef;
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private renderer: Renderer2
  ) {}
  ngOnInit() {
    this.loginForm = this.fb.group({
      userpersonalid: ['', Validators.required, this.validateNumber],
      userpasword: ['', Validators.required],
      showPassword: [false],
    });
    this.showPassword = this.loginForm.get('showPassword') as FormControl;
  }
  validateNumber(control: FormControl) {
    return new Promise((resolve) => {
      if (control.value !== '' && isNaN(parseInt(control.value, 10))) {
        resolve({ invalidNumber: true });
      } else {
        resolve(null);
      }
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const userpersonalid = parseInt(
        this.loginForm.get('userpersonalid')?.value,
        10
      );
      const userpasword = this.loginForm.get('userpasword')?.value;

      if (!isNaN(userpersonalid)) {
        this.authService.login({ userpersonalid, userpasword }).subscribe(
          (response: HttpResponse<any>) => {
            if (response.status === 200) {
              this.router.navigate(['/panel']);
            }
          },
          (error) => {
            console.error('Login failed:', error);
            this.errorMessage = '.کد کاربری یا رمز عبور اشتباه است';
          }
        );
      }
    }
  }
}
