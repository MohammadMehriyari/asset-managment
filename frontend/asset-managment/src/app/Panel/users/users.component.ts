import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../Shared/header/header.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { DataService } from '../../Services/data-service.service';
import { CommonModule } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSort, MatSortModule } from '@angular/material/sort';

import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { first, tap } from 'rxjs';
import { RouterLink, RouterModule } from '@angular/router';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
import { UserDetailComponent } from '../../Shared/modals/user-detail/user-detail.component';
import { DialogConfig } from '@angular/cdk/dialog';
import { UsersPropertyComponent } from '../../Shared/modals/users-property/users-property.component';
import { DropdownModule } from 'primeng/dropdown';
@Component({
  selector: 'as-users',
  standalone: true,
  imports: [
    HeaderComponent,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatPaginatorModule,
    CommonModule,
    RouterLink,
    RouterModule,
    DropdownModule,
  ],
  providers: [provideAnimations()],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  currentStep = 1;
  changePasswordForm!: FormGroup;
  showChangePasswordForm = false;
  isSupporter = false;
  isAdmin = false;
  isEditing = false;
  supporter_id = '';
  submittedSupporterId: any;
  editingUserRoleid: any;
  UserPersonalId!: any;
  private fetchedBuildings: Set<number> = new Set();
  private fetchedAreas: Set<number> = new Set();
  firstStepForm!: FormGroup;
  editingProfileForm!: FormGroup;
  secondStepForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  showMessage = false;
  showUsersForm = false;
  showUsersTable = false;
  showMultiStepForm = false;
  buildingList: any[] = [];
  areaList: any[] = [];
  displayedColumns: string[] = [
    'userid',
    'user',
    'is_active',
    'viewDetail',
    'viewProperty',
    'toggle',
    'userpass',
    'actions',
    'workActions',
  ];
  usersDataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userAuth();
    this.DisplayedColumns();
    this.fetchUsers();
    this.showUsersTable = true;
    this.firstStepForm = this.fb.group({
      userpersonalid: ['', Validators.required],
      username: ['', Validators.required],
      userlastname: ['', Validators.required],
      userphonenumber: ['', Validators.required],
      userlandlinephonenumber: [''],
      userroleid: [''],
      supporterid: [''],
    });

    this.secondStepForm = this.fb.group({
      userpersonalid: [''],
      areaId: ['', Validators.required],
      buildingId: ['', Validators.required],
      userofficial: ['', Validators.required],
      roomnumber: ['', Validators.required],
    });
    this.changePasswordForm = this.fb.group({
      userpersonalid: ['', Validators.required],
      new_password: ['', Validators.required],
    });
  }
  DisplayedColumns(): void {
    if (!this.isAdmin) {
      this.displayedColumns.splice(11, 2);
      this.displayedColumns.splice(6, 1);
    } else {
      this.displayedColumns;
    }
  }
  handleUserRoleChange(role: number): void {
    if (role === 2) {
      this.fetchBuildingList();
      this.fetchAreaList();
    } else {
      this.findSupporterID(this.UserPersonalId);
      const supporterID = this.findSupporterID(this.UserPersonalId);
      if (supporterID !== null) {
        this.ftchSubUsersBuildingArea(supporterID);
      }
    }
  }
  handleUserRoleChangeOnCreate(role: number): void {
    if (role === 2) {
      this.fetchBuildingList();
      this.fetchAreaList();
    } else {
      if (this.UserPersonalId !== null) {
        this.ftchSubUsersBuildingArea(this.UserPersonalId);
      }
    }
  }
  ftchSubUsersBuildingArea(supporterId: number) {
    this.ngOnDestroy();
    const endpoint = `accounts/subbuser/detail/working/locations/${supporterId}/`;
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        const workingLocations = response.body;

        workingLocations.forEach((location: any) => {
          const buildingId = location.buildingid;
          const areaId = location.areaid;

          if (!this.fetchedBuildings.has(buildingId)) {
            this.fetchBuilding(buildingId);
            this.fetchedBuildings.add(buildingId);
          }

          if (!this.fetchedAreas.has(areaId)) {
            this.fetchArea(areaId);
            this.fetchedAreas.add(areaId);
          }
        });
      }
    });
  }
  ngOnDestroy() {
    this.fetchedBuildings.clear();
    this.fetchedAreas.clear();
  }

  toggleView(view: 'form' | 'table'): void {
    if (view === 'form') {
      this.showUsersForm = true;
    } else if (view === 'table') {
      this.fetchUsers();
    }

    this.showUsersTable = true;
  }
  openUsersForm(): void {
    this.showUsersForm = true;
  }

  closeUsersForm(): void {
    this.firstStepForm.reset();
    this.secondStepForm.reset();
    this.showUsersForm = false;
    this.currentStep = 1;
    this.ngOnDestroy();
  }
  fetchUsers(): void {
    const endpoint = 'accounts/user/';
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        // Filter duplicates based on userpersonalid
        const filteredUsers = response.body.filter(
          (value: { userpersonalid: any }, index: any, self: any[]) =>
            self.findIndex(
              (v: { userpersonalid: any }) =>
                v.userpersonalid === value.userpersonalid
            ) === index
        );
        this.usersDataSource = new MatTableDataSource(filteredUsers);
        this.usersDataSource.paginator = this.paginator;
        this.usersDataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'userid':
              return item.userid;
            case 'userpersonalid':
              return item.userpersonalid;

            default:
              return item[property];
          }
        };
        this.usersDataSource.sort = this.sort;
      }
    });
  }

  onSubmitFirstStep(): void {
    console.log(this.firstStepForm.value);
    if (!this.firstStepForm.valid) {
      Object.keys(this.firstStepForm.controls).forEach((field) => {
        const control = this.firstStepForm.get(field);
        if (control?.invalid) {
          console.error(`${field} is invalid`);
          console.log(this.firstStepForm.value[field]);
        }
      });
    }

    if (this.firstStepForm.valid) {
      const formValue = this.firstStepForm.value;
      if (this.isEditing) {
        formValue.userpersonalid = parseInt(formValue.userpersonalid, 10);
      } else {
        formValue.userpersonalid = parseInt(formValue.userpersonalid, 10);
        formValue.userroleid = parseInt(formValue.userroleid, 10);
      }

      let endpoint: string;
      let httpMethod: 'post' | 'put';
      if (this.isEditing) {
        endpoint = `accounts/change/subuser/profile/`;
        httpMethod = 'put';
      } else {
        endpoint = 'accounts/user/';
        httpMethod = 'post';
      }
      const filteredFormValue = Object.fromEntries(
        Object.entries(formValue)
          .map(([key, value]) => [key, value ?? ''])
          .filter(([key, value]) => {
            return (
              !(key === 'userroleid' || key === 'supporterid') || value !== ''
            );
          })
      );
      console.log(filteredFormValue);
      this.dataService[httpMethod](endpoint, filteredFormValue)
        .pipe(
          tap({
            next: (response) => {
              if (response.status === 201) {
                this.successMessage = 'مرحله اول با موفقیت انجام شد ';
                this.errorMessage = '';
                this.currentStep = 2;
                this.secondStepForm.patchValue({
                  userpersonalid: formValue.userpersonalid,
                });
                // Capture userroleid and supporterid after submission
                const submittedUserRoleid = parseInt(formValue.userroleid, 10);
                this.submittedSupporterId = formValue.supporterid
                  ? parseInt(formValue.supporterid, 10)
                  : null;
                if (this.isAdmin) {
                  this.UserPersonalId = this.submittedSupporterId;
                  this.handleUserRoleChangeOnCreate(submittedUserRoleid);
                } else if (this.isSupporter) {
                  this.fetchUserWorkingLocations();
                  this.firstStepForm.patchValue({
                    supporterid: this.supporter_id,
                  });
                }

                this.firstStepForm.reset();
              } else if (response.status === 200) {
                this.successMessage = 'ویرایش حساب کاربر با موفقیت انجام شد ';
                this.errorMessage = '';
                this.showUsersForm = false;
                this.isEditing = false;
                this.firstStepForm.reset();
                this.fetchUsers();
              } else {
                this.errorMessage =
                  '.عملیات موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
                this.successMessage = '';
              }

              this.showMessages();
            },

            error: (error) => {
              console.error('Error submitting first step:', error);

              switch (true) {
                case formValue.userroleid === 3 &&
                  (formValue.supporterid == null ||
                    formValue.supporterid.trim() === ''):
                  this.errorMessage =
                    ' .هنگام ایجاد کاربر عادی ، باید کد پشتیبان مربوطه را وارد نمایید';
                  break;
                case formValue.userroleid === null:
                  this.errorMessage = ' سطح کاربری را انتخاب کنید';
                  break;
                default:
                  this.errorMessage =
                    '.مشکلی در ارسال اطلاعات به وجود آمد ، لطفا دوباره امتحان کنید';
              }

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

  onSubmitSecondStep(): void {
    console.log(this.secondStepForm.value);
    if (!this.secondStepForm.valid) {
      Object.keys(this.secondStepForm.controls).forEach((field) => {
        const control = this.secondStepForm.get(field);
        if (control?.invalid) {
          console.error(`${field} is invalid`);
          console.log(this.secondStepForm.value[field]);
        }
      });
    }
    if (this.secondStepForm.valid) {
      const secondFormValue = this.secondStepForm.value;

      secondFormValue.areaId = parseInt(secondFormValue.areaId, 10);
      secondFormValue.buildingId = parseInt(secondFormValue.buildingId, 10);
      secondFormValue.roomnumber = parseInt(secondFormValue.roomnumber, 10);

      console.log(secondFormValue);
      let endpoint: string;
      let httpMethod: 'post' | 'put';
      if (this.isEditing) {
        endpoint = `accounts/user/working/locations/`;
        httpMethod = 'put';
      } else {
        endpoint = 'accounts/user/working/locations/';
        httpMethod = 'post';
      }

      this.dataService[httpMethod](endpoint, secondFormValue)
        .pipe(
          tap({
            next: (response) => {
              if (response.status === 201) {
                this.successMessage = 'ایجاد کاربر با موفقیت انجام شد ';
                this.errorMessage = '';
                this.showMessages();
                this.fetchUsers();
              } else if (response.status === 200) {
                this.successMessage = 'ویرایش بخش کاری با موفقیت انجام شد ';
                this.errorMessage = '';
                this.showMessages();
                this.showUsersForm = false;
                this.isEditing = false;
                this.firstStepForm.reset();
                this.secondStepForm.reset();
                this.currentStep = 1;
                this.fetchUsers();
              } else {
                this.secondStepForm.reset();
                this.errorMessage =
                  'عملیات موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
                this.successMessage = '';
                this.showMessages();
              }
            },
            error: (error) => {
              console.error('Error submitting second step:', error);
              this.errorMessage =
                'مشکلی در ارسال اطلاعات به وجود آمد ، لطفا دوباره امتحان کنید';
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

  fetchUserWorkingLocations(): void {
    const endpoint = 'accounts/user/working/locations/';
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        const workingLocations = response.body;
        workingLocations.forEach((location: any) => {
          this.fetchBuilding(location.buildingid);
          this.fetchArea(location.areaid);
          if (location.userid) {
            this.supporter_id = location.userid;
          }
        });
      }
    });
  }

  fetchBuilding(buildingId: number): void {
    this.buildingList = [];
    const endpoint = `building/${buildingId}/`;
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        this.buildingList.push(response.body);
        console.log(this.buildingList);
      }
    });
  }
  fetchArea(areaId: number): void {
    this.areaList = [];
    const endpoint = `area/${areaId}/`;
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        this.areaList.push(response.body);
        console.log(this.areaList);
      }
    });
  }
  fetchBuildingList(): void {
    this.buildingList = [];
    const endpoint = 'building/create/';
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        this.buildingList = response.body;
      }
    });
  }
  fetchAreaList(): void {
    this.areaList = [];
    const endpoint = 'area/';
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        this.areaList = response.body;
        console.log(this.areaList);
      }
    });
  }
  showMessages(): void {
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 5000);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.usersDataSource.filter = filterValue.trim().toLowerCase();

    if (this.usersDataSource.paginator) {
      this.usersDataSource.paginator.firstPage();
    }
  }
  openMultiStepForm(): void {
    this.showUsersForm = true;
  }

  closeForm(): void {
    this.showUsersForm = false;
    this.isEditing = false;
    this.currentStep = 1;
    this.firstStepForm.reset();
    this.secondStepForm.reset();
  }

  getIsActiveString(isActive: number): string {
    return isActive === 1 ? 'فعال' : 'غیر فعال';
  }

  getUserRoleString(userRoleId: number): string {
    switch (userRoleId) {
      case 2:
        return 'پشتیبان';
      case 3:
        return 'کاربر عادی';
      default:
        return 'کاربر';
    }
  }
  findSupporterID(userPersonalID: number): number | null {
    const user = this.usersDataSource.data.find(
      (u) => u.userpersonalid === userPersonalID
    );

    if (user) {
      return user.usersupportid;
    } else {
      return null;
    }
  }

  editUser(userData: any): void {
    this.isEditing = true;
    this.firstStepForm.patchValue({
      userpersonalid: userData.userpersonalid,
      username: userData.username,
      userlastname: userData.userlastname,
      userphonenumber: userData.userphonenumber,
      userlandlinephonenumber: userData.userlandlinephonenumber,
    });

    this.showUsersForm = true;
  }
  editWorkUser(userData: any): void {
    this.isEditing = true;
    this.currentStep = 2;
    console.log(userData);
    this.secondStepForm.patchValue({
      userpersonalid: userData.userpersonalid,
      areaId: userData.areaid,
      buildingId: userData.buildingid,
      userofficial: userData.userofficial,
      roomnumber: userData.roomnumber,
    });
    this.UserPersonalId = userData.userpersonalid;
    this.editingUserRoleid = userData.userroleid;
    if (this.isAdmin) {
      this.handleUserRoleChange(this.editingUserRoleid);
    } else if (this.isSupporter) {
      this.fetchUserWorkingLocations();
      this.firstStepForm.patchValue({
        supporterid: this.supporter_id,
      });
    }
    this.showUsersForm = true;
  }
  resetFormFields() {
    this.isEditing = false;
    const newUserpersonalid = this.secondStepForm.get('userpersonalid')?.value;
    this.secondStepForm.reset();
    this.secondStepForm.patchValue({ userpersonalid: newUserpersonalid });
  }
  toggleUserStatus(userPersonalId: number, isActive: boolean): void {
    const endpoint = '/accounts/user/';
    const method = isActive ? 'delete' : 'put';
    const data = {
      userpersonalid: userPersonalId,
    };

    this.dataService[method](endpoint, data).subscribe({
      next: (response) => {
        if (response.status === 200 || response.status === 201) {
          this.fetchUsers();
          const index = this.usersDataSource.data.findIndex(
            (u) => u.userpersonalid === userPersonalId
          );
          if (index !== -1) {
            this.usersDataSource.data[index].is_active = !isActive;
            this.usersDataSource._updateChangeSubscription();
          }
          this.successMessage = 'عملیات با موفقیت انجام شد.';
          this.errorMessage = '';
        } else {
          this.errorMessage = 'خطا در انجام عملیات. لطفاً دوباره امتحان کنید.';
          this.successMessage = '';
        }
        this.showMessages();
      },
      error: (error) => {
        console.error('Error toggling user status:', error);
        this.errorMessage = 'خطا در ارسال درخواست. لطفاً دوباره امتحان کنید.';
        this.successMessage = '';
        this.showMessages();
      },
    });
  }
  userAuth(): void {
    const userRole = this.authService.getUserRole();
    this.isSupporter = userRole === 'supporter';
    this.isAdmin = userRole === 'admin';
  }
  openChangePasswordForm(user: any): void {
    this.changePasswordForm.patchValue({
      userpersonalid: user.userpersonalid,
    });
    this.showChangePasswordForm = true;
  }
  closeChangePasswordForm(): void {
    this.changePasswordForm.reset();
    this.showChangePasswordForm = false;
  }

  onSubmitChangePassword(): void {
    if (this.changePasswordForm.valid) {
      const formValue = this.changePasswordForm.value;
      const endpoint = '/accounts/change/subuser/password/';

      this.dataService
        .put(endpoint, formValue)
        .pipe(
          tap({
            next: (response) => {
              if (response.status === 200) {
                this.successMessage = 'تغییر رمز عبور با موفقیت انجام شد';
                this.errorMessage = '';
                this.showMessages();
                this.closeChangePasswordForm();
              } else {
                this.errorMessage =
                  'عملیات موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
                this.successMessage = '';
                this.showMessages();
              }
            },
            error: (error) => {
              console.error('Error changing password:', error);
              this.errorMessage =
                'مشکلی در ارسال اطلاعات به وجود آمد ، لطفا دوباره امتحان کنید';
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
  viewDetail(userid: number): void {
    const config: MatDialogConfig = {
      data: { userid },
      disableClose: true,
    };
    const dialogRef = this.dialog.open(UserDetailComponent, config);

    dialogRef.afterClosed().subscribe((result) => {});
  }
  viewProperty(userpersonalid: number): void {
    const config: MatDialogConfig = {
      data: { userpersonalid },
      disableClose: true,
    };
    const dialogRef = this.dialog.open(UsersPropertyComponent, config);

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
