import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../Shared/header/header.component';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
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

@Component({
  selector: 'as-zones',
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
  templateUrl: './zones.component.html',
  styleUrl: './zones.component.css',
})
export class ZonesComponent implements OnInit {
  showAreaForm = false;
  showAreaTable = false;
  displayedColumns: string[] = [
    'areaid',
    'areaname',
    'areacreatetime',
    'areaupdatetime',
    'actions',
    'delete',
  ];

  areaDataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Area form
  areaForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  showMessage = false;
  isEditing = false;
  areaId: any;

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchArea();
    this.showAreaTable = true;
    this.areaForm = this.fb.group({
      areaname: ['', Validators.required],
    });
  }

  toggleView(view: 'form' | 'table'): void {
    if (view === 'form') {
      this.isEditing = false;
      this.areaForm.reset();
      this.showAreaForm = true;
    } else if (view === 'table') {
      this.fetchArea();
    }

    this.showAreaTable = true;
  }

  openAreaForm(): void {
    this.showAreaForm = true;
  }

  closeAreaForm(): void {
    this.showAreaForm = false;
    this.areaForm.reset();
  }

  fetchArea(): void {
    const endpoint = 'area/';
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        this.areaDataSource = new MatTableDataSource(response.body);
        this.areaDataSource.paginator = this.paginator;
        this.areaDataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'areaid':
              return item.areaid;
            case 'areaname':
              return item.areaname;
            default:
              return item[property];
          }
        };
        this.areaDataSource.sort = this.sort;
      }
    });
  }
  convertDate(dateString: string): string {
    return moment(dateString, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
  }
  onSubmitAreaForm(): void {
    if (this.areaForm.valid) {
      const formValue = this.areaForm.value;
      console.log('This is Form Value: ', formValue);
      let endpoint: string;
      let httpMethod: 'post' | 'put';
      if (this.isEditing) {
        endpoint = `area/${this.areaId}/`; // Define your endpoint for editing
        httpMethod = 'put';
      } else {
        endpoint = 'area/'; // Define your endpoint for creation
        httpMethod = 'post';
      }

      this.dataService[httpMethod](endpoint, formValue)
        .pipe(
          tap({
            next: (response) => {
              if (response.status === 201 || response.status === 200) {
                this.successMessage = this.isEditing
                  ? 'ویرایش حوزه با موفقیت انجام شد '
                  : 'ایجاد حوزه با موفقیت انجام شد ';
                this.errorMessage = '';
                this.fetchArea(); //
                this.areaForm.reset();
                if (this.isEditing) {
                  this.isEditing = false;
                }
              } else {
                this.errorMessage = this.isEditing
                  ? '.ویرایش حوزه موفقیت آمیز نبود،لطفا دوباره امتحان کنید'
                  : '.ایجاد حوزه موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
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

  editArea(areaId: number): void {
    this.isEditing = true;
    const endpoint = `area/${areaId}/`; // Define your endpoint
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        const areaData = response.body;
        this.areaForm.patchValue({
          areaid: areaData.areaid,
          areaname: areaData.areaname,
        });
        this.showAreaForm = true;
        this.areaId = areaData.areaid;
      }
    });
  }

  deleteArea(areaId: number): void {
    const dialogRef = this.dialog.open(ModalsComponent, {
      width: '300px',
      data: { areaId: areaId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'delete') {
        this.deleteAreaConfirmed(areaId);
      }
    });
  }

  deleteAreaConfirmed(areaId: number): void {
    const endpoint = `area/${areaId}/`; // Define your endpoint
    this.dataService.delete(endpoint).subscribe((response: any) => {
      if (response.status === 204) {
        this.successMessage = 'حذف حوزه با موفقیت انجام شد';
        this.errorMessage = '';
        this.fetchArea(); // Refresh the table after successful deletion
      } else {
        this.errorMessage = 'حذف حوزه موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
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
    this.areaDataSource.filter = filterValue.trim().toLowerCase();

    if (this.areaDataSource.paginator) {
      this.areaDataSource.paginator.firstPage();
    }
  }
}
