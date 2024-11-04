import { HeaderComponent } from '../../Shared/header/header.component';
import { Component, OnInit, ViewChild } from '@angular/core';

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
@Component({
  selector: 'as-feature-set',
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
  ],
  templateUrl: './feature-set.component.html',
  styleUrl: './feature-set.component.css',
})
export class FeatureSetComponent implements OnInit {
  showFeatureForm = false;
  showFeaturesTable = false;
  attributecategoryid: any;
  displayedColumns: string[] = [
    'attributecategoryid',
    'attributecategoryname',
    'attributecategorycreatetime',
    'attributecategoryupdatetime',
    'actions',
    'delete',
  ];
  featuresDataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  featureForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  showMessage = false;
  isEditing = false;
  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchFeatures();
    this.showFeaturesTable = true;
    this.featureForm = this.fb.group({
      attributecategoryname: ['', Validators.required],
    });
  }
  toggleView(view: 'form' | 'table'): void {
    if (view === 'form') {
      this.isEditing = false;
      this.featureForm.reset();
      this.showFeatureForm = true;
    } else if (view === 'table') {
      this.fetchFeatures();
    }

    this.showFeaturesTable = true;
  }

  openFeatureForm(): void {
    this.showFeatureForm = true;
  }

  closeFeatureForm(): void {
    this.showFeatureForm = false;
    this.featureForm.reset();
  }
  convertDate(dateString: string): string {
    return moment(dateString, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
  }
  fetchFeatures(): void {
    const endpoint = 'asset/attribute-categoty/';
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        console.log(response.body);
        this.featuresDataSource = new MatTableDataSource(response.body);
        this.featuresDataSource.paginator = this.paginator;
        this.featuresDataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'attributecategoryid':
              return item.attributecategoryid;
            case 'attributecategoryname':
              return item.attributecategoryname;
            default:
              return item[property];
          }
        };
        this.featuresDataSource.sort = this.sort;
      }
    });
  }

  onSubmitFeatureForm(): void {
    if (this.featureForm.valid) {
      const formValue = this.featureForm.value;
      console.log(formValue);
      let endpoint: string;
      let httpMethod: 'post' | 'put';
      if (this.isEditing) {
        endpoint = `asset/attribute-categoty/${this.attributecategoryid}/`;
        httpMethod = 'put';
      } else {
        endpoint = 'asset/attribute-categoty/';
        httpMethod = 'post';
      }

      this.dataService[httpMethod](endpoint, formValue)
        .pipe(
          tap({
            next: (response) => {
              if (response.status === 201 || response.status === 200) {
                this.successMessage = this.isEditing
                  ? 'ویرایش دسته ویژگی  با موفقیت انجام شد '
                  : 'ایجاد دسته ویژگی  با موفقیت انجام شد ';
                this.errorMessage = '';
                this.showFeatureForm = false;
                this.fetchFeatures(); //
                this.featureForm.reset();
                if (this.isEditing) {
                  this.isEditing = false;
                }
              } else {
                this.errorMessage = this.isEditing
                  ? '.ویرایش دسته ویژگی  موفقیت آمیز نبود،لطفا دوباره امتحان کنید'
                  : '.ایجاد دسته ویژگی  موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
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
  editFeature(attributecategoryid: number): void {
    this.isEditing = true; // Set to edit mode
    const endpoint = `asset/attribute-categoty/${attributecategoryid}/`;
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        const featureData = response.body;
        this.featureForm.patchValue({
          attributecategoryname: featureData.attributecategoryname,
        });
        this.showFeatureForm = true;
        this.attributecategoryid = featureData.attributecategoryid;
      }
    });
  }
  deleteFeature(attributecategoryid: number): void {
    const dialogRef = this.dialog.open(ModalsComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'delete') {
        this.deleteFeatureConfirmed(attributecategoryid);
      }
    });
  }
  deleteFeatureConfirmed(attributecategoryid: number): void {
    const endpoint = `asset/attribute-categoty/${attributecategoryid}/`;
    this.dataService.delete(endpoint).subscribe((response: any) => {
      if (response.status === 204) {
        this.successMessage = 'حذف دسته ویژگی  با موفقیت انجام شد';
        this.errorMessage = '';
        this.fetchFeatures(); // Refresh the table after successful deletion
      } else {
        this.errorMessage =
          'حذف دسته ویژگی  موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
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
    this.featuresDataSource.filter = filterValue.trim().toLowerCase();

    if (this.featuresDataSource.paginator) {
      this.featuresDataSource.paginator.firstPage();
    }
  }
}
