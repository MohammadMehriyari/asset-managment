import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../../Shared/header/header.component';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
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
import { tap } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalsComponent } from '../../../Shared/modals/modals.component';
import { RouterLink, RouterModule } from '@angular/router';
import moment from 'jalali-moment';
import { DropdownModule } from 'primeng/dropdown';
@Component({
  selector: 'as-product',
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
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  showProductForm = false;
  showProductTable = false;
  productList: any[] = [];
  displayedColumns: string[] = [
    'goodsid',
    'goodsname',
    'GooodsGroupId',
    'goodscreatetime',
    'goodsupdatetime',
    'actions',
    'delete',
  ];
  productDataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  productForm!: FormGroup;

  successMessage: string = '';
  errorMessage: string = '';
  showMessage = false;
  isEditing = false;
  goodsid: any;

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.fetchProduct();
    this.fetchProductSet();
    this.showProductTable = true;
    this.productForm = this.fb.group({
      goodsname: ['', Validators.required],
      GooodsGroupId: ['', Validators.required],
    });
  }
  toggleView(view: 'form' | 'table'): void {
    if (view === 'form') {
      this.isEditing = false;
      this.productForm.reset();
      this.showProductForm = true;
    } else if (view === 'table') {
      this.fetchProduct();
    }

    this.showProductTable = true;
  }

  openProductForm(): void {
    this.showProductForm = true;
  }

  closeProductForm(): void {
    this.showProductForm = false;
    this.productForm.reset();
  }
  convertDate(dateString: string): string {
    return moment(dateString, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
  }
  fetchProduct(): void {
    const endpoint = 'asset/goods/';
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        console.log(response.body);
        this.productDataSource = new MatTableDataSource(response.body);
        this.productDataSource.paginator = this.paginator;
        this.productDataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'goodsid':
              return item.goodsid;
            case 'goodsname':
              return item.goodsname;
            case 'GooodsGroupId':
              return item.gooodsgroupid.gooodsgroupname;
            default:
              return item[property];
          }
        };
        this.productDataSource.sort = this.sort;
      }
    });
  }
  fetchProductSet(): void {
    const endpoint = 'asset/goods-group/';
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        this.productList.push(response.body);
      }
    });
  }

  onSubmitProductForm(): void {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;
      formValue.GooodsGroupId = parseInt(formValue.GooodsGroupId, 10);
      console.log(formValue);
      let endpoint: string;
      let httpMethod: 'post' | 'put';
      if (this.isEditing) {
        endpoint = `asset/goods/${this.goodsid}/`;
        httpMethod = 'put';
      } else {
        endpoint = 'asset/goods/';
        httpMethod = 'post';
      }

      this.dataService[httpMethod](endpoint, formValue)
        .pipe(
          tap({
            next: (response) => {
              if (response.status === 201 || response.status === 200) {
                this.successMessage = this.isEditing
                  ? 'ویرایش کالا با موفقیت انجام شد '
                  : 'ایجاد کالا با موفقیت انجام شد ';
                this.errorMessage = '';
                this.fetchProduct(); //
                this.productForm.reset();
                if (this.isEditing) {
                  this.isEditing = false;
                  this.showProductForm = false;
                }
              } else {
                this.errorMessage = this.isEditing
                  ? '.ویرایش کالا موفقیت آمیز نبود،لطفا دوباره امتحان کنید'
                  : '.ایجاد کالا موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
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
  editProduct(goodsid: number): void {
    this.isEditing = true;
    const endpoint = `asset/goods/${goodsid}/`;
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        console.log(response.body);
        const productData = response.body;
        this.productForm.patchValue({
          goodsname: productData.goodsname,
          GooodsGroupId: productData.gooodsgroupid.gooodsgroupid,
        });
        this.showProductForm = true;
        this.goodsid = productData.goodsid;
      }
    });
  }
  deleteProduct(goodsid: number): void {
    const dialogRef = this.dialog.open(ModalsComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'delete') {
        this.deleteProductConfirmed(goodsid);
      }
    });
  }
  deleteProductConfirmed(goodsid: number): void {
    const endpoint = `asset/goods/${goodsid}/`;
    this.dataService.delete(endpoint).subscribe((response: any) => {
      if (response.status === 204) {
        this.successMessage = 'حذف کالا با موفقیت انجام شد';
        this.errorMessage = '';
        this.fetchProduct();
      } else {
        this.errorMessage = 'حذف کالا موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
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
    this.productDataSource.filter = filterValue.trim().toLowerCase();

    if (this.productDataSource.paginator) {
      this.productDataSource.paginator.firstPage();
    }
  }
}
