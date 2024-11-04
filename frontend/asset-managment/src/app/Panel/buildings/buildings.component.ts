import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../Shared/header/header.component';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { DataService } from '../../Services/data-service.service';
import { HttpResponse } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { tap } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalsComponent } from '../../Shared/modals/modals.component';
import { RouterLink, RouterModule } from '@angular/router';
import moment from 'jalali-moment';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
@Component({
  selector: 'app-buildings',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    RouterLink,
    RouterModule,
    DropdownModule,
  ],
  templateUrl: './buildings.component.html',
  styleUrl: './buildings.component.css',
})
export class BuildingsComponent implements OnInit {
  showBuildingForm = false;
  showBuildingsTable = false;
  chooseSupporterForm!: FormGroup;
  showChooseSupporterForm = false;
  displayedColumns: string[] = [
    'buildingid',
    'buildingname',
    'buildingabbrivationname',
    'buildingfloorcount',
    'buildingroomcount',
    'buildingcreatetime',
    'buildingupdatetime',
    'actions',
    'delete',
    'selectSupporter',
  ];
  buildingsDataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Building form
  buildingForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  showMessage = false;
  isEditing = false;
  buildingId: any;
  userList: any[] = [];
  userOptions: any[] = [];
  floorOptions: number[] = [];
  supporterList: any[] = [];
  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {} // Inject DataService and FormBuilder

  ngOnInit(): void {
    this.fetchBuildings();
    this.fetchUsers();
    this.showBuildingsTable = true;
    this.buildingForm = this.fb.group({
      buildingname: ['', Validators.required],
      buildingabbrivationname: ['', Validators.required],
      buildingfloorcount: ['', Validators.required],
      buildingroomcount: ['', Validators.required],
    });

    this.chooseSupporterForm = this.fb.group({
      userpersonalid: ['', Validators.required],
      buildingid: ['', Validators.required],
      floor: ['', Validators.required],
    });
  }

  toggleView(view: 'form' | 'table'): void {
    if (view === 'form') {
      this.isEditing = false;
      this.buildingForm.reset();
      this.showBuildingForm = true;
    } else if (view === 'table') {
      this.fetchBuildings();
    }

    this.showBuildingsTable = true;
  }

  openBuildingForm(): void {
    this.showBuildingForm = true;
  }

  closeBuildingForm(): void {
    this.showBuildingForm = false;
    this.buildingForm.reset();
  }

  fetchBuildings(): void {
    const endpoint = 'building/create/'; // Define your endpoint
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        this.buildingsDataSource = new MatTableDataSource(response.body);
        this.buildingsDataSource.paginator = this.paginator;
        this.buildingsDataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'buildingid':
              return item.buildingid;
            case 'buildingname':
              return item.buildingname;
            case 'buildingabbrivationname':
              return item.buildingabbrivationname;
            case 'buildingfloorcount':
              return item.buildingfloorcount;

            case 'buildingroomcount':
              return item.buildingroomcount;
            default:
              return item[property];
          }
        };
        this.buildingsDataSource.sort = this.sort;
      }
    });
  }
  convertDate(dateString: string): string {
    return moment(dateString, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
  }
  onSubmitBuildingForm(): void {
    if (this.buildingForm.valid) {
      const formValue = this.buildingForm.value;
      // Convert userid and userLevel to integers
      formValue.buildingfloorcount = parseInt(formValue.buildingfloorcount, 10);
      formValue.buildingroomcount = parseInt(formValue.buildingroomcount, 10);
      console.log(formValue);
      let endpoint: string;
      let httpMethod: 'post' | 'put';
      if (this.isEditing) {
        endpoint = `building/${this.buildingId}/`; // Define your endpoint for editing
        httpMethod = 'put';
      } else {
        endpoint = 'building/create/'; // Define your endpoint for creation
        httpMethod = 'post';
      }

      this.dataService[httpMethod](endpoint, formValue)
        .pipe(
          tap({
            next: (response) => {
              if (response.status === 201 || response.status === 200) {
                this.successMessage = this.isEditing
                  ? 'ویرایش ساختمان با موفقیت انجام شد '
                  : 'ایجاد ساختمان با موفقیت انجام شد ';
                this.errorMessage = '';
                this.fetchBuildings(); //
                this.buildingForm.reset();
                if (this.isEditing) {
                  this.isEditing = false;
                }
              } else {
                this.errorMessage = this.isEditing
                  ? '.ویرایش ساحتمان موفقیت آمیز نبود،لطفا دوباره امتحان کنید'
                  : '.ایجاد ساحتمان موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
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
  editBuilding(buildingId: number): void {
    this.isEditing = true;
    const endpoint = `building/${buildingId}/`;
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        const buildingData = response.body;
        this.buildingForm.patchValue({
          buildingid: buildingData.buildingid,
          buildingname: buildingData.buildingname,
          buildingabbrivationname: buildingData.buildingabbrivationname,
          buildingfloorcount: buildingData.buildingfloorcount,
          buildingroomcount: buildingData.buildingroomcount,
        });
        this.showBuildingForm = true;
        this.buildingId = buildingData.buildingid;
      }
    });
  }
  deleteBuilding(buildingId: number): void {
    const dialogRef = this.dialog.open(ModalsComponent, {
      width: '300px',
      data: { buildingId: buildingId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'delete') {
        this.deleteBuildingConfirmed(buildingId);
      }
    });
  }
  deleteBuildingConfirmed(buildingId: number): void {
    const endpoint = `building/${buildingId}/`; // Define your endpoint
    this.dataService.delete(endpoint).subscribe((response: any) => {
      if (response.status === 204) {
        this.successMessage = 'حذف ساختمان با موفقیت انجام شد';
        this.errorMessage = '';
        this.fetchBuildings(); // Refresh the table after successful deletion
      } else {
        this.errorMessage =
          'حذف ساختمان موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
        this.successMessage = '';
      }
      this.showMessages();
    });
  }
  showMessages(): void {
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 3000); // Hide message after 1minute
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.buildingsDataSource.filter = filterValue.trim().toLowerCase();

    if (this.buildingsDataSource.paginator) {
      this.buildingsDataSource.paginator.firstPage();
    }
  }
  fetchUsers(): void {
    const endpoint = 'accounts/user/';
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        const filteredUser = response.body.filter(
          (user: any) => user.userroleid === 2
        );
        // Filter duplicates based on userpersonalid
        const filteredUsers = filteredUser.filter(
          (value: { userpersonalid: any }, index: any, self: any[]) =>
            self.findIndex(
              (v: { userpersonalid: any }) =>
                v.userpersonalid === value.userpersonalid
            ) === index
        );
        // Map users to dropdown options
        this.userOptions = filteredUsers.map(
          (user: {
            username: any;
            userlastname: any;
            userpersonalid: any;
          }) => ({
            label: `${user.username} ${user.userlastname}`,
            value: user.userpersonalid,
          })
        );
        console.log('Filtered Users:', this.userOptions);
      }
    });
  }
  fetchFloorOptions(buildingId: number): void {
    const buildingData = this.buildingsDataSource.data.find(
      (building: any) => building.buildingid === buildingId
    );
    if (buildingData) {
      const floorCount = buildingData.buildingfloorcount;
      console.log(floorCount);
      this.floorOptions = Array.from({ length: floorCount }, (_, i) => i + 1);
      console.log('Updated floor options:', this.floorOptions); // Debug log
    }
  }
  openChooseSupporterForm(buildingid: any): void {
    this.fetchFloorOptions(buildingid);
    this.chooseSupporterForm.patchValue({
      buildingid: buildingid,
    });
    console.log(this.floorOptions);
    this.showChooseSupporterForm = true;
  }
  closeChooseSupporterForm(): void {
    this.chooseSupporterForm.reset();
    this.showChooseSupporterForm = false;
  }

  fetchSupporter(): void {
    // Fetch supporter list from API
    const endpoint = 'accounts/supporter/';
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        this.supporterList = response.body;
        console.log(this.supporterList);
      }
    });
  }
  onSubmitChooseSupporter(): void {
    if (this.chooseSupporterForm.valid) {
      const formValue = this.chooseSupporterForm.value;
      formValue.userpersonalid = parseInt(formValue.userpersonalid, 10);
      formValue.buildingid = parseInt(formValue.buildingid, 10);

      let selectedFloors = formValue.floor;

      console.log('Selected floors:', selectedFloors);

      // Fetch supporter list from API
      const endpoint = 'accounts/supporter/';
      this.dataService.get(endpoint).subscribe((response: any) => {
        if (response && response.body) {
          this.supporterList = response.body;

          // Check if the floor is taken
          const isFloorTaken = selectedFloors.includes('all')
            ? this.supporterList.some(
                (supporter) => supporter.availablefloor === 'all'
              )
            : this.supporterList.some(
                (supporter) =>
                  supporter.availablefloor === parseInt(selectedFloors[0])
              );

          if (isFloorTaken) {
            const floorNumber = selectedFloors.includes('all')
              ? 'همه'
              : selectedFloors[0];
            this.errorMessage = `طبقه ${floorNumber}   دارای پشتیبان است`;
            this.successMessage = '';
            this.showMessages();
          } else {
            // Send API request

            if (selectedFloors.includes('all')) {
              // If 'all' is selected, get all floors
              selectedFloors = this.floorOptions;
            }

            selectedFloors.forEach((floor: any) => {
              const apiPayload = { ...formValue, floor: floor };
              this.sendSupporterSelectionToApi(apiPayload);
            });

            this.closeChooseSupporterForm();
          }
        }
      });
    } else {
      this.errorMessage = '.لطفا همه فیلد ها را پر کنید';
      this.successMessage = '';
      this.showMessages();
    }
  }
  sendSupporterSelectionToApi(payload: any): void {
    const endpoint = 'accounts/supporter/';
    console.log(payload);
    this.dataService.post(endpoint, payload).subscribe(
      (response: any) => {
        if (response.status === 201) {
          this.successMessage = 'انتخاب پشتیبان با موفقیت انجام شد';
          this.errorMessage = '';
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
}
