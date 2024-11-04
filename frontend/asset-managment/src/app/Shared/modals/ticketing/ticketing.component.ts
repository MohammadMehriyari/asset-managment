import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterLink, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { UsersDeliveredProductComponent } from '../../../Panel/users/users-delivered-product/users-delivered-product.component';
import { UsersPcComponent } from '../../../Panel/users/users-pc/users-pc.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DataService } from '../../../Services/data-service.service';
import { tap } from 'rxjs';

@Component({
  selector: 'as-ticketing',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    RouterLink,
    RouterModule,
    MatTabsModule,
  ],
  templateUrl: './ticketing.component.html',
  styleUrl: './ticketing.component.css',
})
export class TicketingComponent implements OnInit {
  subjectList: any[] = [];
  showTicketForm = false;
  ticketForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  showMessage = false;
  userRole: any;
  constructor(
    public dialogRef: MatDialogRef<UsersPcComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      computerpropertynumber: number | undefined;
      computername: string | undefined;
      deliveredgoodsid: number | undefined;
      deliverygoodsname: string | undefined;
    },
    private dataService: DataService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.fetchSubject();

    this.ticketForm = this.fb.group({
      TicketSubjectId: ['', Validators.required],
      DeliveredGoodsiId: [''],
      ComputerPropertyNumber: [''],
      ticketdescription: [''],
    });
  }

  fetchSubject(): void {
    this.subjectList = [];
    const endpoint = 'ticket/subject/';
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        // Filter subjects based on whether you have computerpropertynumber or delliverygoodsid
        let filteredSubjects = response.body;
        if (this.data.computerpropertynumber) {
          // Filter for subjects relevant to computerpropertynumber
          filteredSubjects = response.body.filter(
            (subject: { ticketsubjectname: string }) =>
              ['جابجایی', 'اسقاط', 'عملیات نصب'].includes(
                subject.ticketsubjectname
              )
          );
        } else if (this.data.deliveredgoodsid) {
          // Filter for subjects relevant to delliverygoodsid
          filteredSubjects = response.body.filter(
            (subject: { ticketsubjectname: string }) =>
              [
                'جابجایی',
                'اسقاط',
                'بروزرسانی',
                'تعمیر داخلی',
                'سند ارسال به بیرون',
              ].includes(subject.ticketsubjectname)
          );
        }
        this.subjectList = filteredSubjects;
      }
    });
  }
  onSubmitTicketForm(): void {
    if (!this.ticketForm.valid) {
      Object.keys(this.ticketForm.controls).forEach((field) => {
        const control = this.ticketForm.get(field);
        if (control?.invalid) {
          console.error(`${field} is invalid`);
          console.log(this.ticketForm.value[field]);
        }
      });
    }

    if (this.ticketForm.valid) {
      let formValue = { ...this.ticketForm.value };
      console.log(formValue);
      if (this.data.deliveredgoodsid === undefined) {
        delete formValue.DeliveredGoodsiId;
        formValue.TicketSubjectId = parseInt(formValue.TicketSubjectId, 10);
        formValue.ComputerPropertyNumber = parseInt(
          formValue.ComputerPropertyNumber,
          10
        );
      } else if (this.data.computerpropertynumber === undefined) {
        delete formValue.ComputerPropertyNumber;
        formValue.TicketSubjectId = parseInt(formValue.TicketSubjectId, 10);
        formValue.DeliveredGoodsiId = parseInt(formValue.DeliveredGoodsiId, 10);
      }
      console.log(formValue);

      console.log('This is Form Value: ', formValue);
      let endpoint: string;
      let httpMethod: 'post';
      endpoint = 'ticket/submit/';
      httpMethod = 'post';

      this.dataService[httpMethod](endpoint, formValue)
        .pipe(
          tap({
            next: (response) => {
              if (response.status === 201 || response.status === 200) {
                this.successMessage = 'ثبت تیکت با موفقیت انجام شد ';
                this.errorMessage = '';
                this.ticketForm.reset();
              } else {
                this.errorMessage =
                  '. ثبت تیکت موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
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
    }, 3000);
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  ticketReset(): void {
    this.ticketForm.reset();
  }
}
