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
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
import { ModalsComponent } from '../../Shared/modals/modals.component';
import { RouterLink, RouterModule } from '@angular/router';
import { SealPcComponent } from '../../Shared/modals/seal-pc/seal-pc.component';
import moment from 'jalali-moment';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'as-seal',
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
  templateUrl: './seal.component.html',
  styleUrl: './seal.component.css',
})
export class SealComponent implements OnInit {
  showSealForm = false;
  showSealTable = false;
  showSealPcForm = false;
  displayedColumns: string[] = [
    'computerseallingid',
    'computerseallingnumber',
    'isexpired',
    'computerseallingcreatetime',
    'computerseallingupdatetime',
    'sealPc',
    'viewPc',
    'actions',
    'delete',
  ];
  sealDataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  sealForm!: FormGroup;
  sealPcForm!: FormGroup;
  sealPcid: any;
  successMessage: string = '';
  errorMessage: string = '';
  showMessage = false;
  isEditing = false;
  computerseallingid: any;
  sealList: any[] = [];
  pcList: any[] = [];
  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchSeal();
    this.fetchPc();
    this.showSealTable = true;
    this.sealForm = this.fb.group({
      computerseallingnumber: ['', Validators.required],
      isexpired: ['', Validators.required],
    });
    this.sealPcForm = this.fb.group({
      computerpropertynumber: ['', Validators.required],
    });
  }

  toggleView(view: 'form' | 'table'): void {
    if (view === 'form') {
      this.isEditing = false;
      this.sealForm.reset();
      this.showSealForm = true;
    } else if (view === 'table') {
      this.fetchSeal();
    }

    this.showSealTable = true;
  }

  openSealForm(): void {
    this.showSealForm = true;
  }

  closeSealForm(): void {
    this.showSealForm = false;
    this.sealForm.reset();
  }
  convertDate(dateString: string): string {
    return moment(dateString, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
  }
  fetchSeal(): void {
    const endpoint = 'asset/computer-sealling/';
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        this.sealDataSource = new MatTableDataSource(response.body);
        this.sealDataSource.paginator = this.paginator;
        this.sealDataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'computerseallingid':
              return item.computerseallingid;
            case 'computerseallingnumber':
              return item.computerseallingnumber;
            case 'isexpired':
              return item.isexpired;
            default:
              return item[property];
          }
        };
        this.sealDataSource.sort = this.sort;
      }
    });
  }

  onSubmitSealForm(): void {
    if (this.sealForm.valid) {
      const formValue = this.sealForm.value;

      formValue.computerseallingnumber = parseInt(
        formValue.computerseallingnumber,
        10
      );
      formValue.isexpired = parseInt(formValue.isexpired, 10);
      console.log(formValue);
      let endpoint: string;
      let httpMethod: 'post' | 'put';
      if (this.isEditing) {
        endpoint = `asset/computer-sealling/${this.computerseallingid}/`;
        httpMethod = 'put';
      } else {
        endpoint = 'asset/computer-sealling/';
        httpMethod = 'post';
      }

      this.dataService[httpMethod](endpoint, formValue)
        .pipe(
          tap({
            next: (response) => {
              if (response.status === 201 || response.status === 200) {
                this.successMessage = this.isEditing
                  ? 'ویرایش پلمپ با موفقیت انجام شد '
                  : 'ایجاد پلمپ با موفقیت انجام شد ';
                this.errorMessage = '';
                this.fetchSeal();
                this.sealForm.reset();
                if (this.isEditing) {
                  this.isEditing = false;
                }
              } else {
                this.errorMessage = this.isEditing
                  ? '.ویرایش پلمپ موفقیت آمیز نبود،لطفا دوباره امتحان کنید'
                  : '.ایجاد پلمپ موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
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
  editSeal(computerseallingid: number): void {
    this.isEditing = true;
    const endpoint = `asset/computer-sealling/${computerseallingid}/`;
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        const sealData = response.body;
        this.sealForm.patchValue({
          computerseallingnumber: sealData.computerseallingnumber,
          isexpired: sealData.isexpired,
        });
        this.showSealForm = true;
        this.computerseallingid = sealData.computerseallingid;
      }
    });
  }
  deleteSeal(computerseallingid: number): void {
    const dialogRef = this.dialog.open(ModalsComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'delete') {
        this.deleteSealConfirmed(computerseallingid);
      }
    });
  }
  deleteSealConfirmed(computerseallingid: number): void {
    const endpoint = `asset/computer-sealling/${computerseallingid}/`;
    this.dataService.delete(endpoint).subscribe((response: any) => {
      if (response.status === 204) {
        this.successMessage = 'حذف پلمپ با موفقیت انجام شد';
        this.errorMessage = '';
        this.fetchSeal();
      } else {
        this.errorMessage = 'حذف پلمپ موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
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
    this.sealDataSource.filter = filterValue.trim().toLowerCase();

    if (this.sealDataSource.paginator) {
      this.sealDataSource.paginator.firstPage();
    }
  }
  fetchPc(): void {
    const endpoint = 'asset/computer/';
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        // Filter computers with isAbortion = false
        this.pcList = response.body.filter((pc: any) => !pc.isAbortion);
      }
    });
  }
  openSealPcForm(computerseallingid: number): void {
    this.showSealPcForm = true;
    this.sealPcid = computerseallingid;
  }
  closeSealPcForm(): void {
    this.sealPcForm.reset();
    this.showSealPcForm = false;
  }

  submitSealPc(): void {
    if (this.sealPcForm.valid) {
      const formValue = this.sealPcForm.value;

      formValue.computerpropertynumber = parseInt(
        formValue.computerpropertynumber,
        10
      );
      console.log(formValue);
      let endpoint: string;
      let httpMethod: 'patch';
      endpoint = `asset/assign-seall-to-computer/${this.sealPcid}/`;
      httpMethod = 'patch';

      this.dataService[httpMethod](endpoint, formValue)
        .pipe(
          tap({
            next: (response) => {
              if (response.status === 200) {
                this.successMessage = ' پلمپ  کامپیوتر با موفقیت انجام شد ';
                this.errorMessage = '';
                this.fetchSeal();
                this.sealPcForm.reset();
              } else {
                this.errorMessage =
                  '. پلمپ کامپیوتر موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
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

  viewPc(computerseallingnumber: number): void {
    const config: MatDialogConfig = {
      data: { computerseallingnumber: computerseallingnumber },
      disableClose: true,
    };
    const dialogRef = this.dialog.open(SealPcComponent, config);

    dialogRef.afterClosed().subscribe((result) => {});
  }
  getExpired(isExpired: number): string {
    return isExpired ? 'منقضی شده است' : 'منقضی نشده است';
  }
}
