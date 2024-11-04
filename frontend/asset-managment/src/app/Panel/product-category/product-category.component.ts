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

@Component({
  selector: 'as-product-category',
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
  templateUrl: './product-category.component.html',
  styleUrl: './product-category.component.css',
})
export class ProductCategoryComponent implements OnInit {
  showGoodsForm = false;
  showGoodsTable = false;
  displayedColumns: string[] = [
    'gooodsgroupid',
    'gooodsgroupname',
    'ispartinsidecomputer',
    'isallowedtosendout',
    'isallowedtobeaborted',
    'isallowedtomove',
    'ispossibletorepair',
    'gooodsgroupcreatetime',
    'gooodsgroupupdatetime',
    'actions',
    'delete',
  ];
  goodsDataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  goodsForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  showMessage = false;
  isEditing = false;
  gooodsgroupid: any;
  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.fetchGoods();

    this.showGoodsTable = true;
    this.goodsForm = this.fb.group({
      gooodsgroupname: ['', Validators.required],
      ispartinsidecomputer: ['', Validators.required],
      isallowedtosendout: ['', Validators.required],
      isallowedtobeaborted: ['', Validators.required],
      isallowedtomove: ['', Validators.required],
      ispossibletorepair: ['', Validators.required],
    });
  }
  toggleView(view: 'form' | 'table'): void {
    if (view === 'form') {
      this.isEditing = false;
      this.goodsForm.reset();
      this.showGoodsForm = true;
    } else if (view === 'table') {
      this.fetchGoods();
    }

    this.showGoodsTable = true;
  }

  openGoodsForm(): void {
    this.showGoodsForm = true;
  }

  closeGoodsForm(): void {
    this.showGoodsForm = false;
    this.goodsForm.reset();
  }
  convertDate(dateString: string): string {
    return moment(dateString, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
  }
  getIsPartinsideComputer(ispartinsidecomputer: number): string {
    switch (ispartinsidecomputer) {
      case 1:
        return 'است';
      case 0:
        return ' نیست';
      default:
        return 'نامشخص';
    }
  }
  getIsAllowedToSendOut(isallowedtosendout: number): string {
    switch (isallowedtosendout) {
      case 1:
        return 'دارد';
      case 2:
        return ' ندارد';
      default:
        return 'نامشخص';
    }
  }
  getIsAllowedToBeAborted(isallowedtobeaborted: number): string {
    switch (isallowedtobeaborted) {
      case 1:
        return 'دارد';
      case 2:
        return ' ندارد';
      default:
        return 'نامشخص';
    }
  }

  getIsAllowedToMove(isallowedtomove: number): string {
    switch (isallowedtomove) {
      case 1:
        return 'دارد';
      case 2:
        return ' ندارد';
      default:
        return 'نامشخص';
    }
  }
  getIsPossibleToRepair(ispossibletorepair: number): string {
    switch (ispossibletorepair) {
      case 1:
        return 'دارد';
      case 2:
        return ' ندارد';
      default:
        return 'نامشخص';
    }
  }
  fetchGoods(): void {
    const endpoint = 'asset/goods-group/';
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        this.goodsDataSource = new MatTableDataSource(response.body);
        this.goodsDataSource.paginator = this.paginator;
        this.goodsDataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'gooodsgroupid':
              return item.gooodsgroupid;
            case 'gooodsgroupname':
              return item.gooodsgroupname;
            case 'ispartinsidecomputer':
              return item.ispartinsidecomputer;
            case 'isallowedtosendout':
              return item.isallowedtosendout;

            case 'isallowedtobeaborted':
              return item.isallowedtobeaborted;
            case 'isallowedtomove':
              return item.isallowedtomove;
            case 'ispossibletorepair':
              return item.ispossibletorepair;
            default:
              return item[property];
          }
        };
        this.goodsDataSource.sort = this.sort;
      }
    });
  }

  onSubmitGoodsForm(): void {
    if (this.goodsForm.valid) {
      const formValue = this.goodsForm.value;
      // Convert userid and userLevel to integers
      formValue.ispartinsidecomputer = parseInt(
        formValue.ispartinsidecomputer,
        10
      );
      formValue.isallowedtosendout = parseInt(formValue.isallowedtosendout, 10);
      formValue.isallowedtobeaborted = parseInt(
        formValue.isallowedtobeaborted,
        10
      );
      formValue.isallowedtomove = parseInt(formValue.isallowedtomove, 10);
      formValue.ispossibletorepair = parseInt(formValue.ispossibletorepair, 10);
      console.log(formValue);
      let endpoint: string;
      let httpMethod: 'post' | 'put';
      if (this.isEditing) {
        endpoint = `asset/goods-group/${this.gooodsgroupid}/`;
        httpMethod = 'put';
      } else {
        endpoint = 'asset/goods-group/';
        httpMethod = 'post';
      }

      this.dataService[httpMethod](endpoint, formValue)
        .pipe(
          tap({
            next: (response) => {
              if (response.status === 201 || response.status === 200) {
                this.successMessage = this.isEditing
                  ? 'ویرایش دسته کالا با موفقیت انجام شد '
                  : 'ایجاد دسته کالا با موفقیت انجام شد ';
                this.errorMessage = '';
                this.fetchGoods(); //
                this.showGoodsForm = false;
                this.goodsForm.reset();
                if (this.isEditing) {
                  this.isEditing = false;
                }
              } else {
                this.errorMessage = this.isEditing
                  ? '.ویرایش دسته کالا موفقیت آمیز نبود،لطفا دوباره امتحان کنید'
                  : '.ایجاد دسته کالا موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
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
  editGoods(gooodsgroupid: number): void {
    this.isEditing = true;
    const endpoint = `asset/goods-group/${gooodsgroupid}/`;
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        const goodsData = response.body;
        this.goodsForm.patchValue({
          gooodsgroupname: goodsData.gooodsgroupname,
          ispartinsidecomputer: goodsData.ispartinsidecomputer,
          isallowedtosendout: goodsData.isallowedtosendout,
          isallowedtobeaborted: goodsData.isallowedtobeaborted,
          isallowedtomove: goodsData.isallowedtomove,
          ispossibletorepair: goodsData.ispossibletorepair,
        });
        this.showGoodsForm = true;
        this.gooodsgroupid = gooodsgroupid;
      }
    });
  }
  deleteGoods(gooodsgroupid: number): void {
    const dialogRef = this.dialog.open(ModalsComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'delete') {
        this.deleteGoodsConfirmed(gooodsgroupid);
      }
    });
  }
  deleteGoodsConfirmed(gooodsgroupid: number): void {
    const endpoint = `asset/goods-group/${gooodsgroupid}/`;
    this.dataService.delete(endpoint).subscribe((response: any) => {
      if (response.status === 204) {
        this.successMessage = 'حذف دسته کالا با موفقیت انجام شد';
        this.errorMessage = '';
        this.fetchGoods();
      } else {
        this.errorMessage =
          'حذف دسته کالا  موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
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
    this.goodsDataSource.filter = filterValue.trim().toLowerCase();

    if (this.goodsDataSource.paginator) {
      this.goodsDataSource.paginator.firstPage();
    }
  }
}
