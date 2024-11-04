import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../../Shared/header/header.component';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { DataService } from '../../../Services/data-service.service';
import { HttpResponse } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'as-building-supporters',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterLink,
    RouterModule,
  ],
  templateUrl: './building-supporters.component.html',
  styleUrl: './building-supporters.component.css',
})
export class BuildingSupportersComponent implements OnInit {
  displayedColumns: string[] = [
    'userid',
    'userpersonalid',
    'username',
    'userlastname',
    'buildingname',
    'buildingid',
    'availablefloor',
    'actions',
    'delete',
  ];
  supportersDataSource!: MatTableDataSource<any>;
  showChooseSupporterForm = false;
  isEditing = false;
  successMessage: string = '';
  errorMessage: string = '';
  showMessage = false;
  buildingId: any;
  userList: any[] = [];
  buildingList: any[] = [];
  selectedBuilding!: { buildingid: number; buildingname: string };
  floorOptions: number[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  editSupporterForm!: FormGroup;
  supporterList: any[] = [];

  constructor(private dataService: DataService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.fetchBuilding();
    this.fetchSupporters();
    this.fetchUsers();
    this.editSupporterForm = this.fb.group({
      old_supporterpersonalId: ['', Validators.required],
      old_supportername: [''],
      new_supporterpersobalId: ['', Validators.required],
      buildingid: ['', Validators.required],
      floor: ['', Validators.required],
    });
  }

  fetchSupporters(): void {
    const endpoint = 'accounts/supporter/';
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        this.supportersDataSource = new MatTableDataSource(response.body);
        this.supportersDataSource.paginator = this.paginator;
        this.supportersDataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'userid':
              return item.userid;
            case 'userpersonalid':
              return item.userpersonalid;
            case 'username':
              return item.username;
            case 'userlastname':
              return item.userlastname;

            case 'buildingname':
              return item.buildingname;
            case 'buildingid':
              return this.getBuildingId(item.buildingname);
            case 'availablefloor':
              return item.availablefloor;

            default:
              return item[property];
          }
        };
        this.supportersDataSource.sort = this.sort;
      }
    });
  }

  showMessages(): void {
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 3000);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.supportersDataSource.filter = filterValue.trim().toLowerCase();

    if (this.supportersDataSource.paginator) {
      this.supportersDataSource.paginator.firstPage();
    }
  }
  fetchBuilding(): void {
    const endpoint = 'building/create/';
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        this.buildingList = response.body;
      }
    });
  }
  getBuildingId(buildingName: string): number {
    const buildingId = this.buildingList.find(
      (b) => b.buildingname.toLowerCase() === buildingName.toLowerCase()
    )?.buildingid;
    return buildingId;
  }

  fetchUsers(): void {
    const endpoint = 'accounts/user/';
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        const filteredUsers = response.body.filter(
          (user: any) => user.userroleid === 2
        );
        this.userList.push(filteredUsers);
      }
    });
  }

  fetchSupporter(): void {
    // Fetch supporter list from API
    const endpoint = 'accounts/supporter/';
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        this.supporterList = response.body;
      }
    });
  }
  editSupporter(supporterData: any): void {
    this.isEditing = true;

    this.selectedBuilding = this.buildingList.find(
      (b) => b.buildingname === supporterData.buildingname
    );

    this.editSupporterForm.patchValue({
      old_supporterpersonalId: supporterData.userpersonalid,
      old_supportername: `${supporterData.username} ${supporterData.userlastname}`,
      buildingid: this.selectedBuilding.buildingid,
      floor: supporterData.availablefloor,
    });

    (this.buildingId = this.getBuildingId(supporterData.buildingname)),
      (this.showChooseSupporterForm = true);
  }
  closeForm(): void {
    this.showChooseSupporterForm = false;
  }

  onSubmitChooseSupporter(): void {
    if (!this.editSupporterForm.valid) {
      Object.keys(this.editSupporterForm.controls).forEach((field) => {
        const control = this.editSupporterForm.get(field);
        if (control?.invalid) {
          console.error(`${field} is invalid`);
        }
      });
    }
    if (this.editSupporterForm.valid) {
      const formValue = this.editSupporterForm.value;
      delete formValue.old_supportername;
      formValue.new_supporterpersobalId = parseInt(
        formValue.new_supporterpersobalId,
        10
      );
      formValue.buildingid = parseInt(formValue.buildingid, 10);
      // Fetch supporter list from API
      const endpoint = 'accounts/supporter/';
      this.dataService.get(endpoint).subscribe((response: any) => {
        if (response && response.body) {
          this.supporterList = response.body;
          // Send API request

          this.sendSupporterSelectionToApi(formValue);
          this.closeForm();
        }
      });
    } else {
      this.errorMessage = '.لطفا همه فیلد ها را پر کنید';
      this.successMessage = '';
      this.showMessages();
    }
  }
  sendSupporterSelectionToApi(formValue: any): void {
    const endpoint = 'accounts/supporter/';

    this.dataService.put(endpoint, formValue).subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.successMessage = 'تغییر پشتیبان با موفقیت انجام شد';
          this.errorMessage = '';
          this.fetchSupporters();
        } else {
          this.errorMessage = 'عملیات موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
          this.successMessage = '';
        }
        this.showMessages();
      },
      (error) => {
        console.error('Error submitting form:', error);
        this.errorMessage =
          'مشکلی در ارسال اطلاعات به وجود آمد ، لطفا دوباره امتحان کنید';
        this.successMessage = '';
        this.showMessages();
      }
    );
  }
  deleteSupporter(supporterData: {
    userpersonalid: number;
    buildingname: string;
    availablefloor: number;
  }): void {
    const data = {
      userpersonalid: supporterData.userpersonalid,
      buildingid: this.getBuildingId(supporterData.buildingname),
      floor: supporterData.availablefloor,
    };
    const endpoint = `accounts/supporter/`; // Define your endpoint
    this.dataService.delete(endpoint, data).subscribe({
      next: (response) => {
        if (response.status === 204) {
          this.fetchSupporter();
          const index = this.supportersDataSource.data.findIndex(
            (item) =>
              item.userpersonalid === supporterData.userpersonalid &&
              item.buildingname === supporterData.buildingname &&
              item.availablefloor === supporterData.availablefloor
          );
          if (index !== -1) {
            this.supportersDataSource.data.splice(index, 1);
          }
          this.supportersDataSource._updateChangeSubscription();

          this.successMessage = 'حذف پشتیبان با موفقیت انجام شد.';
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
}
