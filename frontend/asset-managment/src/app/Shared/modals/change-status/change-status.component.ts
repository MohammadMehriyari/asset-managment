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
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'as-change-status',
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
  templateUrl: './change-status.component.html',
  styleUrl: './change-status.component.css',
})
export class ChangeStatusComponent implements OnInit {
  showTicketForm = false;
  ticketForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  showMessage = false;
  userRole: any;
  ticketId!: any;
  role!: string;
  statusList: any;
  constructor(
    public dialogRef: MatDialogRef<ChangeStatusComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      ticketid: number | undefined;
      ticketStatusName: string | void;
    },
    private dataService: DataService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private authservice: AuthService
  ) {}

  ngOnInit(): void {
    this.getRole();
    this.fetchStatus();
    this.ticketId = this.data.ticketid;
    this.ticketForm = this.fb.group({
      ticket_status_id: ['', Validators.required],
    });
  }

  fetchStatus(): void {
    const endpoint = 'ticket/status/';
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        this.statusList = response.body;
        console.log(this.statusList);
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
      const formValue = this.ticketForm.value;
      const ticketStatusId = parseInt(formValue.ticket_status_id, 10);
      const ticketId = this.data.ticketid;

      const endpoint = `ticket/change-status/${ticketId}/?ticket_status_id=${ticketStatusId}`;

      this.dataService
        .put(endpoint, {})
        .pipe(
          tap({
            next: (response) => {
              if (response.status === 200) {
                this.successMessage = ' عملیات با موفقیت انجام شد ';
                this.errorMessage = '';
                this.ticketForm.reset();
                this.closeDialog();
              } else {
                this.errorMessage =
                  '. عملیات موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
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
  getRole(): void {
    this.role = this.authservice.getUserRole();
  }
}
