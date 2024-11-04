import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../../Shared/header/header.component';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DataService } from '../../../Services/data-service.service';
import { HttpResponse } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalsComponent } from '../../../Shared/modals/modals.component';
import { RouterLink, RouterModule } from '@angular/router';
import moment from 'jalali-moment';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
@Component({
  selector: 'as-op-version',
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
    FormsModule,
    DropdownModule,
  ],
  templateUrl: './op-version.component.html',
  styleUrl: './op-version.component.css',
})
export class OpVersionComponent implements OnInit {
  showVersionForm = false;
  showVersionTable = false;
  displayedColumns: string[] = [
    'operationsystemversionid',
    'osName',
    'operationsystemversionname',
    'operationsystemversioncreatetime',
    'operationsystemversionupdatetime',
    'actions',
    'delete',
  ];

  versionDataSource!: MatTableDataSource<any>;
  osList: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Version form
  versionForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  showMessage = false;
  isEditing = false;
  operationsystemversionid: any;

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchVersion();
    this.showVersionTable = true;
    this.versionForm = this.fb.group({
      operationsystemversionname: ['', Validators.required],
      osId: ['', Validators.required],
    });
    this.fetchOsList();
  }

  toggleView(view: 'form' | 'table'): void {
    if (view === 'form') {
      this.isEditing = false;
      this.versionForm.reset();
      this.showVersionForm = true;
    } else if (view === 'table') {
      this.fetchVersion();
    }

    this.showVersionTable = true;
  }

  openVersionForm(): void {
    this.showVersionForm = true;
  }

  closeVersionForm(): void {
    this.showVersionForm = false;
    this.versionForm.reset();
  }
  fetchOsList(): void {
    const endpoint = 'asset/operation-system/';
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        this.osList = response.body;
      }
    });
  }
  convertDate(dateString: string): string {
    return moment(dateString, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
  }
  fetchVersion(): void {
    const endpoint = 'asset/operation-system/';
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        console.log(response.body);
        const flattenedData = response.body.flatMap(
          (item: { operationversions: any[]; operationsystemname: any }) =>
            item.operationversions.map(
              (version: {
                operationsystemversionid: any;
                operationsystemversionname: any;
                operationsystemversioncreatetime: any;
                operationsystemversionupdatetime: any;
              }) => ({
                operationsystemname: item.operationsystemname,
                operationsystemversionid: version.operationsystemversionid,
                operationsystemversionname: version.operationsystemversionname,
                operationsystemversioncreatetime:
                  version.operationsystemversioncreatetime,
                operationsystemversionupdatetime:
                  version.operationsystemversionupdatetime,
              })
            )
        );
        console.log('transformed dta', flattenedData);
        this.versionDataSource = new MatTableDataSource(flattenedData);
        this.versionDataSource.paginator = this.paginator;

        this.versionDataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'operationsystemversionid':
              return item.operationsystemversionid;

            case 'operationsystemversionname':
              return item.operationsystemversionname;
            case 'osName':
              return item.operationsystemname;

            default:
              return item[property];
          }
        };
        this.versionDataSource.sort = this.sort;
      }
    });
  }
  getOsNameById(osId: number): string {
    const os = this.osList.find((item) => item.osId === osId);
    return os ? os.operationsystemname : '';
  }
  onSubmitVersionForm(): void {
    if (this.versionForm.valid) {
      const formValue = this.versionForm.value;
      console.log('This is Form Value: ', formValue);
      let endpoint: string;
      let httpMethod: 'post' | 'put';
      if (this.isEditing) {
        endpoint = `asset/operation-system-version/${this.operationsystemversionid}/`; // Define your endpoint for editing
        httpMethod = 'put';
      } else {
        endpoint = 'asset/operation-system-version/'; // Define your endpoint for creation
        httpMethod = 'post';
      }

      this.dataService[httpMethod](endpoint, formValue)
        .pipe(
          tap({
            next: (response) => {
              if (response.status === 201 || response.status === 200) {
                this.successMessage = this.isEditing
                  ? 'ویرایش ورژن با موفقیت انجام شد '
                  : 'ایجاد ورژن با موفقیت انجام شد ';
                this.errorMessage = '';
                this.fetchVersion(); //
                this.versionForm.reset();
                if (this.isEditing) {
                  this.isEditing = false;
                }
              } else {
                this.errorMessage = this.isEditing
                  ? '.ویرایش ورژن موفقیت آمیز نبود،لطفا دوباره امتحان کنید'
                  : '.ایجاد ورژن موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
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

  editVersion(operationsystemversionid: number): void {
    this.isEditing = true;
    const endpoint = `asset/operation-system-version/${operationsystemversionid}/`;
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        const versionData = response.body;
        this.versionForm.patchValue({
          operationsystemversionname: versionData.operationsystemversionname,
          osId: versionData.operationsystemversionid,
        });

        this.showVersionForm = true;
        this.operationsystemversionid = versionData.operationsystemversionid;
      }
    });
  }
  deleteVersion(operationsystemversionid: number): void {
    const dialogRef = this.dialog.open(ModalsComponent, {
      width: '300px',
      data: { operationsystemversionid: operationsystemversionid },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'delete') {
        this.deleteVersionConfirmed(operationsystemversionid);
      }
    });
  }

  deleteVersionConfirmed(operationsystemversionid: number): void {
    const endpoint = `asset/operation-system-version/${operationsystemversionid}/`; // Define your endpoint
    this.dataService.delete(endpoint).subscribe((response: any) => {
      console.log(response);
      if (response.status === 204) {
        this.successMessage = 'حذف ورژن با موفقیت انجام شد';
        this.errorMessage = '';
        this.fetchVersion(); // Refresh the table after successful deletion
      } else {
        this.errorMessage = 'حذف ورژن موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
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
    this.versionDataSource.filter = filterValue.trim().toLowerCase();

    if (this.versionDataSource.paginator) {
      this.versionDataSource.paginator.firstPage();
    }
  }
}
