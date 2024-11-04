import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../../Shared/header/header.component';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { DataService } from '../../../Services/data-service.service';
import { HttpResponse } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { tap } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalsComponent } from '../../../Shared/modals/modals.component';
import { RouterLink, RouterModule } from '@angular/router';
import moment from 'jalali-moment';

@Component({
  selector: 'as-software',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
    RouterLink,
    RouterModule,
  ],
  templateUrl: './software.component.html',
  styleUrl: './software.component.css',
})
export class SoftwareComponent implements OnInit {
  showSoftwareForm = false;
  showSoftwareTable = false;
  displayedColumns: string[] = [
    'softwareid',
    'softwarename',
    'softwarecreatetime',
    'softwareupdatetime',
    'actions',
    'delete',
  ];

  softwareDataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Area form
  softwareForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  showMessage = false;
  isEditing = false;
  softwareId: any;

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchSoftware();
    this.showSoftwareTable = true;
    this.softwareForm = this.fb.group({
      softwarename: ['', Validators.required],
    });
  }

  toggleView(view: 'form' | 'table'): void {
    if (view === 'form') {
      this.isEditing = false;
      this.softwareForm.reset();
      this.showSoftwareForm = true;
    } else if (view === 'table') {
      this.fetchSoftware();
    }

    this.showSoftwareTable = true;
  }

  openSoftwareForm(): void {
    this.isEditing = false;
    this.showSoftwareForm = true;
  }

  closeSoftwareForm(): void {
    this.showSoftwareForm = false;
    this.softwareForm.reset();
  }

  fetchSoftware(): void {
    const endpoint = 'software/';
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        this.softwareDataSource = new MatTableDataSource(response.body);
        this.softwareDataSource.paginator = this.paginator;
        this.softwareDataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'softwareid':
              return item.softwareid;
            case 'softwarename':
              return item.softwarename;
            default:
              return item[property];
          }
        };
        this.softwareDataSource.sort = this.sort;
      }
    });
  }
  convertDate(dateString: string): string {
    return moment(dateString, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
  }
  onSubmitSoftwareForm(): void {
    if (this.softwareForm.valid) {
      const formValue = this.softwareForm.value;
      console.log('This is Form Value: ', formValue);
      let endpoint: string;
      let httpMethod: 'post' | 'put';
      if (this.isEditing) {
        endpoint = `software/${this.softwareId}/`;
        httpMethod = 'put';
      } else {
        endpoint = 'software/';
        httpMethod = 'post';
      }

      this.dataService[httpMethod](endpoint, formValue)
        .pipe(
          tap({
            next: (response) => {
              if (response.status === 201 || response.status === 200) {
                this.successMessage = this.isEditing
                  ? 'ویرایش نرم افزار با موفقیت انجام شد '
                  : 'ایجاد نرم افزار با موفقیت انجام شد ';
                this.errorMessage = '';
                this.fetchSoftware();
                this.softwareForm.reset();
                if (this.isEditing) {
                  this.isEditing = false;
                }
              } else {
                this.errorMessage = this.isEditing
                  ? '.ویرایش نرم افزار موفقیت آمیز نبود،لطفا دوباره امتحان کنید'
                  : '.ایجاد نرم افزار موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
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

  editSoftware(softwareId: number): void {
    this.isEditing = true;
    const endpoint = `software/${softwareId}/`;
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        const softwareData = response.body;
        this.softwareForm.patchValue({
          softwarename: softwareData.softwarename,
        });
        this.showSoftwareForm = true;
        this.softwareId = softwareData.softwareid;
      }
    });
  }

  deleteSoftware(softwareId: number): void {
    const dialogRef = this.dialog.open(ModalsComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'delete') {
        this.deleteSoftwareConfirmed(softwareId);
      }
    });
  }

  deleteSoftwareConfirmed(softwareId: number): void {
    const endpoint = `software/${softwareId}/`;
    this.dataService.delete(endpoint).subscribe((response: any) => {
      if (response.status === 204) {
        this.successMessage = 'حذف نرم افزار با موفقیت انجام شد';
        this.errorMessage = '';
        this.fetchSoftware();
      } else {
        this.errorMessage =
          'حذف نرم افزار موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.softwareDataSource.filter = filterValue.trim().toLowerCase();

    if (this.softwareDataSource.paginator) {
      this.softwareDataSource.paginator.firstPage();
    }
  }
}
