import { Component, OnInit, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { DataService } from '../../../Services/data-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { ModalsComponent } from '../modals.component';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { tap } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { RouterLink, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'as-pc-user',
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
  ],
  templateUrl: './pc-user.component.html',
  styleUrl: './pc-user.component.css',
})
export class PcUserComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'computerpropertynumber',
    'userpersonalid',
    'user',
    'userRole',
    'building',
    'area',
    'actions',
    'delete',
  ];
  deliveredGoodsPcDataSource!: MatTableDataSource<any>;
  filteredData: any[] = [];
  successMessage: string = '';
  errorMessage: string = '';
  showMessage = false;
  userList: any[] = [];
  buildingList: any[] = [];
  areaList: any[] = [];
  userPcForm!: FormGroup;
  showUserPcForm = false;
  isEditing = false;
  userPcid: any;
  row: any;

  constructor(
    public dialogRef: MatDialogRef<PcUserComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      computerpropertynumber: number;
    },
    private dataservice: DataService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    const endpoint = `asset/computer/`;
    this.dataservice.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        this.filteredData = response.body.filter(
          (item: any) =>
            item.computerpropertynumber === this.data.computerpropertynumber
        );

        this.dataSource = new MatTableDataSource(this.filteredData);
      }
    });
    this.fetchUserList();
    this.userPcForm = this.fb.group({
      ownerUserId: ['', Validators.required],
      areaId: ['', Validators.required],
      buildingId: ['', Validators.required],
    });
  }
  toggleView(view: 'form' | 'table'): void {
    if (view === 'form') {
      this.userPcForm.reset();
      this.isEditing = false;
      this.showUserPcForm = true;
    } else if (view === 'table') {
      this.ngOnInit();
    }
  }
  openuserPcForm(): void {
    this.isEditing = false;
    this.showUserPcForm = true;
  }

  closeUserPcForm(): void {
    this.userPcForm.reset();
    this.showUserPcForm = false;
    this.isEditing = false;
  }
  showMessages(): void {
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 3000);
  }
  getUserRoleString(userRoleId: number): string {
    switch (userRoleId) {
      case 2:
        return 'پشتیبان';
      case 3:
        return 'کاربر عادی';
      default:
        return '';
    }
  }
  fetchUserList(): void {
    const endpoint = 'accounts/user/';
    this.dataservice.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        this.userList = response.body;
      }
    });
  }
  fetchUserWorkingLocations(ownerUserId: number): void {
    const endpoint = `accounts/subbuser/detail/working/locations/${ownerUserId}/`;
    this.dataservice.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        console.log(response.body);
        const workingLocations = response.body;
        workingLocations.forEach((location: any) => {
          this.fetchBuilding(location.buildingid);
          this.fetchArea(location.areaid);
        });
      }
    });
  }

  fetchBuilding(buildingId: number): void {
    const endpoint = `building/${buildingId}/`;
    this.dataservice.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        this.buildingList = [];
        this.buildingList.push(response.body);
      }
    });
  }
  fetchArea(areaId: number): void {
    const endpoint = `area/${areaId}/`;
    this.dataservice.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        this.areaList = [];
        this.areaList.push(response.body);
      }
    });
  }
  editUserPc(computerpropertynumber: number): void {
    this.showUserPcForm = true;
    this.userPcForm
      .get('ownerUserId')
      ?.valueChanges.subscribe((ownerUserId: number) => {
        if (ownerUserId) {
          this.fetchUserWorkingLocations(ownerUserId);
        }
      });
    this.userPcid = computerpropertynumber;
  }
  deleteUserPc(computerpropertynumber: number): void {
    const dialogRef = this.dialog.open(ModalsComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'delete') {
        this.deleteUserPcConfirmed(computerpropertynumber);
      }
    });
  }
  deleteUserPcConfirmed(computerpropertynumber: number): void {
    const endpoint = `asset/assign-computer-to-user/${computerpropertynumber}/`;
    this.dataservice.delete(endpoint).subscribe((response: any) => {
      if (response.status === 204) {
        this.successMessage = 'حذف کاربر با موفقیت انجام شد';
        this.errorMessage = '';
        this.ngOnInit();
      } else {
        this.errorMessage =
          'حذف کاربر موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
        this.successMessage = '';
      }
      this.showMessages();
    });
  }
  submitUserPc(): void {
    if (this.userPcForm.valid) {
      const formValue = this.userPcForm.value;

      formValue.ownerUserId = parseInt(formValue.ownerUserId, 10);
      formValue.areaId = parseInt(formValue.areaId, 10);
      formValue.buildingId = parseInt(formValue.buildingId, 10);
      console.log(formValue);
      let endpoint: string;
      let httpMethod: 'put';
      endpoint = `asset/assign-computer-to-user/${this.userPcid}/`;
      httpMethod = 'put';

      this.dataservice[httpMethod](endpoint, formValue)
        .pipe(
          tap({
            next: (response) => {
              if (response.status === 200) {
                this.successMessage = ' ویرایش  کاربر با موفقیت انجام شد ';
                this.errorMessage = '';
                this.ngOnInit();
                this.userPcForm.reset();
              } else {
                this.errorMessage =
                  '. ویرایش کاربر موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
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
  closeDialog(): void {
    this.dialogRef.close();
  }
}
