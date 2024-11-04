import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HeaderComponent } from '../../Shared/header/header.component';
import { DataService } from '../../Services/data-service.service';
import { tap } from 'rxjs';

@Component({
  selector: 'as-profile',
  standalone: true,
  imports: [HeaderComponent, RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  router = inject(Router);

  successMessage: string = '';
  errorMessage: string = '';
  showMessage = false;
  passForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.passForm = this.fb.group({
      old_password: ['', Validators.required],
      new_password: ['', Validators.required],
      repeated_new_password: ['', Validators.required],
    });
  }
  onSubmitPass(): void {
    if (this.passForm.valid) {
      const formValue = this.passForm.value;
      console.log('This is Form Value: ', formValue);

      this.dataService
        .put('accounts/change/password/', formValue)
        .pipe(
          tap({
            next: (response) => {
              if (response.status === 200) {
                this.successMessage = 'ویرایش رمز عبور  با موفقیت انجام شد ';
                this.errorMessage = '';

                this.passForm.reset();
              } else {
                this.errorMessage =
                  '.ویرایش رمز عبور موفقیت آمیز نبود،لطفا دوباره امتحان کنید';

                this.successMessage = '';
              }
              this.showMessages();
            },
            error: (error) => {
              console.error('Error submitting form :', error);
              this.errorMessage =
                '.مشکلی در ارسال اطلاعات به وجود آمد ، لطفا دوباره امتحان کنید';
              this.successMessage = '';
              this.showMessages();
            },
          })
        )
        .subscribe();
    } else {
      this.errorMessage = '.لطفا همه فیلد ها را پر کنید';
      this.successMessage = '';
      this.showMessages();
    }
  }
  showMessages(): void {
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 10000); // Hide message after 1minute
  }
}
