import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../Shared/header/header.component';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DataService } from '../../Services/data-service.service';
import { HttpResponse } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { tap } from 'rxjs';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
import { ModalsComponent } from '../../Shared/modals/modals.component';
import { RouterLink, RouterModule } from '@angular/router';
import { PcUserComponent } from '../../Shared/modals/pc-user/pc-user.component';
import { UsersComputerDetailComponent } from '../../Shared/modals/users-computer-detail/users-computer-detail.component';
import { ComputerDetailComponent } from '../../Shared/modals/computer-detail/computer-detail.component';
import { DropdownModule } from 'primeng/dropdown';
@Component({
  selector: 'as-computer',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    RouterModule,
    DropdownModule,
  ],
  templateUrl: './computer.component.html',
  styleUrl: './computer.component.css',
})
export class ComputerComponent implements OnInit {
  showComputerForm = false;
  showComputerTable = false;
  displayedColumns: string[] = [
    'computerpropertynumber',
    'computersealling',
    'viewDetail',
    'userPc',
    'viewUser',
    'actions',
    'delete',
  ];
  ComputerDataSource!: MatTableDataSource<any>;
  osList: any[] = [];
  userList: any[] = [];
  buildingList: any[] = [];
  areaList: any[] = [];
  selectedOsVersions: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Computer form
  computerForm!: FormGroup;
  userPcForm!: FormGroup;
  showUserPcForm = false;
  successMessage: string = '';
  errorMessage: string = '';
  showMessage = false;
  isEditing = false;
  computerpropertynumber: any;
  userPcid: any;
  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchComputer();
    this.fetchUserList();

    this.showComputerTable = true;
    this.computerForm = this.fb.group({
      computerpropertynumber: ['', Validators.required],
      computername: [''],
      computermodel: ['', Validators.required],
      computerip: ['', Validators.required],
      computermacaddress: ['', Validators.required],
      computerispersonal: ['', Validators.required],
      osName: ['', Validators.required],
      osVersionId: ['', Validators.required],
    });
    this.fetchOsList();
    this.userPcForm = this.fb.group({
      ownerUserId: ['', Validators.required],
      areaId: ['', Validators.required],
      buildingId: ['', Validators.required],
    });
  }

  toggleView(view: 'form' | 'table'): void {
    if (view === 'form') {
      this.computerForm.reset();
      this.isEditing = false;
      this.showComputerForm = true;
    } else if (view === 'table') {
      this.fetchComputer();
    }

    this.showComputerTable = true;
  }

  openComputerForm(): void {
    this.isEditing = false;
    this.showComputerForm = true;
  }

  closeComputerForm(): void {
    this.computerForm.reset();
    this.showComputerForm = false;
  }
  fetchOsList(): void {
    const endpoint = 'asset/operation-system/';
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        this.osList = response.body;
      }
    });
  }

  fetchComputer(): void {
    const endpoint = 'asset/computer/';
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        console.log(response.body);
        this.ComputerDataSource = new MatTableDataSource(response.body);
        this.ComputerDataSource.paginator = this.paginator;
        this.ComputerDataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'computerpropertynumber':
              return item.computerpropertynumber;
            case 'computername':
              return item.computername;
            case 'computermodel':
              return item.computermodel;
            case 'computerip':
              return item.computerip;
            case 'computermacaddress':
              return item.computermacaddress;
            case 'computerispersonal':
              return this.getPersonalStatus(item.computerispersonal);
            case 'osName':
              return item.operationsystemversionid.operationsystemname;
            case 'osVersionId':
              return item.operationsystemversionid.operationsystemversionname;
            default:
              return item[property];
          }
        };
        this.ComputerDataSource.sort = this.sort;
      }
    });
  }

  getPersonalStatus(isPersonal: number): string {
    return isPersonal ? 'شخصی نیست' : 'شخصی است';
  }

  onSubmitComputerForm(): void {
    if (!this.computerForm.valid) {
      Object.keys(this.computerForm.controls).forEach((field) => {
        const control = this.computerForm.get(field);
        if (control?.invalid) {
          console.error(`${field} is invalid`);
          console.log(this.computerForm.value[field]);
        }
      });
    }
    if (this.computerForm.valid) {
      const formValue = this.computerForm.value;
      console.log('This is Form Value: ', formValue);
      let endpoint: string;
      let httpMethod: 'post' | 'put';
      if (this.isEditing) {
        endpoint = `asset/computer/${this.computerpropertynumber}/`;
        httpMethod = 'put';
      } else {
        endpoint = 'asset/computer/';
        httpMethod = 'post';
      }
      formValue.computerpropertynumber = parseInt(
        formValue.computerpropertynumber,
        10
      );
      formValue.computerispersonal = parseInt(formValue.computerispersonal, 10);
      formValue.operationsystemversionid = parseInt(
        formValue.operationsystemversionid,
        10
      );
      this.dataService[httpMethod](endpoint, formValue)
        .pipe(
          tap({
            next: (response) => {
              if (response.status === 201 || response.status === 200) {
                this.successMessage = this.isEditing
                  ? 'ویرایش کامپیوتر با موفقیت انجام شد '
                  : 'ایجاد کامپیوتر با موفقیت انجام شد ';
                this.errorMessage = '';
                this.fetchComputer();
                this.computerForm.reset();
                this.showComputerForm = false;
                if (this.isEditing) {
                  this.computerForm.reset();
                  this.showComputerForm = false;
                  this.isEditing = false;
                }
              } else {
                this.errorMessage = this.isEditing
                  ? '.ویرایش کامپیوتر موفقیت آمیز نبود،لطفا دوباره امتحان کنید'
                  : '.ایجاد کامپیوتر موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
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
        .subscribe(); // Empty subscribe to execute the pipe
    } else {
      this.errorMessage = '.لطفا همه فیلد ها را پر کنید';
      this.successMessage = '';
      this.showMessages();
    }
  }
  editComputer(computerpropertynumber: number): void {
    this.isEditing = true;
    const endpoint = `asset/computer/${computerpropertynumber}/`;
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        const computerData = response.body;
        this.computerForm.patchValue({
          computerpropertynumber: computerData.computerpropertynumber,
          computername: computerData.computername,
          computermodel: computerData.computermodel,
          computerip: computerData.computerip,
          computermacaddress: computerData.computermacaddress,
          computerispersonal: computerData.computerispersonal,
          osName: computerData.operationsystemversionid.operationsystemid,
          osVersionId:
            computerData.operationsystemversionid.operationsystemversionid,
        });
        this.onOsNameChange({
          target: {
            value: computerData.operationsystemversionid.operationsystemid,
          },
        } as unknown as Event);
        this.showComputerForm = true;
        this.computerpropertynumber = computerData.computerpropertynumber;
      }
    });
  }
  deleteComputer(computerpropertynumber: number): void {
    const dialogRef = this.dialog.open(ModalsComponent, {
      width: '300px',
      data: { computerpropertynumber: computerpropertynumber },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'delete') {
        this.deleteComputerConfirmed(computerpropertynumber);
      }
    });
  }
  deleteComputerConfirmed(computerpropertynumber: number): void {
    const endpoint = `asset/computer/${computerpropertynumber}/`; // Define your endpoint
    this.dataService.delete(endpoint).subscribe((response: any) => {
      if (response.status === 204) {
        this.successMessage = 'حذف کامپیوتر با موفقیت انجام شد';
        this.errorMessage = '';
        this.fetchComputer(); // Refresh the table after successful deletion
      } else {
        this.errorMessage =
          'حذف کامپیوتر موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
        this.successMessage = '';
      }
      this.showMessages();
    });
  }
  showMessages(): void {
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 3000);
  }
  onOsNameChange(event: any) {
    const selectedOsId = event.value;
    const selectedOs = this.osList.find(
      (os) => os.operationsystemid === selectedOsId
    );
    if (selectedOs && selectedOs.operationversions) {
      this.selectedOsVersions = selectedOs.operationversions;
    } else {
      this.selectedOsVersions = [];
    }
  }

  // updateOsVersions(osId: number): void {
  //   const selectedOs = this.osList.find((os) => os.operationsystemid === osId);
  //   if (selectedOs && selectedOs.operationversions) {
  //     this.selectedOsVersions = selectedOs.operationversions;
  //   } else {
  //     this.selectedOsVersions = [];
  //   }
  // }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.ComputerDataSource.filter = filterValue.trim().toLowerCase();

    if (this.ComputerDataSource.paginator) {
      this.ComputerDataSource.paginator.firstPage();
    }
  }
  fetchUserList(): void {
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
        this.userList = filteredUsers;
      }
    });
  }
  fetchUserWorkingLocations(ownerUserId: number): void {
    const endpoint = `accounts/subbuser/detail/working/locations/${ownerUserId}/`;
    this.dataService.get(endpoint).subscribe((response: any) => {
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
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (
        response &&
        response.body &&
        !this.buildingList.some(
          (b) => b.buildingid === response.body.buildingid
        )
      ) {
        this.buildingList.push(response.body);
      }
    });
  }
  fetchArea(areaId: number): void {
    const endpoint = `area/${areaId}/`;
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (
        response &&
        response.body &&
        !this.areaList.some((a) => a.areaid === response.body.areaid)
      ) {
        this.areaList.push(response.body);
      }
    });
  }
  openUserPcForm(
    computerpropertynumber: number,
    computerseallingnumber: any | null
  ): void {
    this.buildingList = [];
    this.areaList = [];
    if (computerseallingnumber === null) {
      this.errorMessage = ' شما اجازه تحویل کامپیوتر غیر پلمپ را ندارید';
      this.successMessage = '';
      this.showMessages();
    } else {
      this.showUserPcForm = true;
      this.userPcForm
        .get('ownerUserId')
        ?.valueChanges.subscribe((ownerUserId: number) => {
          if (ownerUserId) {
            this.buildingList = [];
            this.areaList = [];
            this.fetchUserWorkingLocations(ownerUserId);
          }
        });
      this.userPcid = computerpropertynumber;
    }
  }

  closeUserPcForm(): void {
    this.buildingList = [];
    this.areaList = [];
    this.userPcForm.reset();
    this.showUserPcForm = false;
    this.isEditing = false;
  }

  submitUserPc(): void {
    if (this.userPcForm.valid) {
      const formValue = this.userPcForm.value;

      formValue.ownerUserId = parseInt(formValue.ownerUserId, 10);
      formValue.areaId = parseInt(formValue.areaId, 10);
      formValue.buildingId = parseInt(formValue.buildingId, 10);
      console.log(formValue);
      let endpoint: string;
      let httpMethod: 'patch';
      endpoint = `asset/assign-computer-to-user/${this.userPcid}/`;
      httpMethod = 'patch';

      this.dataService[httpMethod](endpoint, formValue)
        .pipe(
          tap({
            next: (response) => {
              if (response.status === 200) {
                this.successMessage = ' تحویل  کامپیوتر با موفقیت انجام شد ';
                this.errorMessage = '';
                this.fetchComputer();
                this.userPcForm.reset();
                this.showUserPcForm = false;
              } else {
                this.errorMessage =
                  '. تحویل کامپیوتر موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
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

  viewUser(computerpropertynumber: number): void {
    const config: MatDialogConfig = {
      data: { computerpropertynumber: computerpropertynumber },
      height: '55%',
      disableClose: true,
    };
    const dialogRef = this.dialog.open(PcUserComponent, config);

    dialogRef.afterClosed().subscribe((result) => {});
  }
  viewDetail(computerpropertynumber: number): void {
    const config: MatDialogConfig = {
      data: { computerpropertynumber },
      height: '55%',
      disableClose: true,
    };
    const dialogRef = this.dialog.open(ComputerDetailComponent, config);

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
