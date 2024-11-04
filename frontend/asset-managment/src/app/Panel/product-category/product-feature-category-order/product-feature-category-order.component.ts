import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../../Shared/header/header.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { DataService } from '../../../Services/data-service.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';
import { map, Observable, tap } from 'rxjs';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ModalsComponent } from '../../../Shared/modals/modals.component';
import moment from 'jalali-moment';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'as-product-feature-category-order',
  standalone: true,
  imports: [
    HeaderComponent,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    CommonModule,
    RouterLink,
    RouterModule,
    DropdownModule,
  ],
  templateUrl: './product-feature-category-order.component.html',
  styleUrl: './product-feature-category-order.component.css',
})
export class ProductFeatureCategoryOrderComponent implements OnInit {
  showOrderForm = false;
  showOrderTable = false;
  displayedColumns: string[] = [
    'order',
    'GooodsGroupName',
    'AttributeCategoryName',
    'GoodsAttributesName',
    'actions',
    'delete',
  ];

  orderDataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  orderForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  showMessage = false;
  isEditing = false;
  goodsattributesid: any;
  gooodsgroupid: any;
  goodsCategoryList: any[] = [];
  goodsFeatureList: any[] = [];
  goodsCategoryFeatureList: any[] = [];
  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchOrder();
    this.fetchGoods();
    this.fetchFeatureCategory();
    this.fetchFeature();
    this.showOrderTable = true;
    this.orderForm = this.fb.group({
      GoodsAttributesId: ['', Validators.required],
      AttributeCategoryId: ['', Validators.required],
      GooodsGroupId: ['', Validators.required],
      order: ['', Validators.required],
    });
  }

  toggleView(view: 'form' | 'table'): void {
    if (view === 'form') {
      this.isEditing = false;
      this.orderForm.reset();
      this.showOrderForm = true;
    } else if (view === 'table') {
      this.fetchOrder();
    }

    this.showOrderTable = true;
  }

  openOrderForm(): void {
    this.showOrderForm = true;
  }

  closeOrderForm(): void {
    this.showOrderForm = false;
    this.orderForm.reset();
  }
  convertDate(dateString: string): string {
    return moment(dateString, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
  }
  fetchOrder(): void {
    const endpoint =
      'asset/goods-group-attribut-category-goods-attribut-order/';
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        this.orderDataSource = new MatTableDataSource(response.body);
        this.orderDataSource.paginator = this.paginator;
        this.orderDataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'GoodsAttributesName':
              return item.goodsattributesid.goodsattributestitle;
            case 'AttributeCategoryName':
              return item.attributecategoryid.attributecategoryname;
            case 'GooodsGroupName':
              return item.gooodsgroupid.gooodsgroupname;
            case 'gooodsgroupid':
              return item.gooodsgroupid.gooodsgroupid;
            case 'goodsattributesid':
              return item.goodsattributesid.goodsattributesid;
            case 'order':
              return item.order;
            default:
              return item[property];
          }
        };
        this.orderDataSource.sort = this.sort;
      }
    });
  }
  fetchGoods(): void {
    const endpoint = 'asset/goods-group/';
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        this.goodsCategoryList = response.body;
      }
    });
  }
  fetchFeatureCategory(): void {
    const endpoint = 'asset/attribute-categoty/';
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        this.goodsCategoryFeatureList = response.body;
      }
    });
  }
  fetchFeature(): void {
    const endpoint = 'asset/goods-attribute/';
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        this.goodsFeatureList = response.body;
      }
    });
  }
  onSubmitOrderForm(): void {
    if (this.orderForm.valid) {
      const formValue = this.orderForm.value;
      formValue.GoodsAttributesId = parseInt(formValue.GoodsAttributesId, 10);
      formValue.AttributeCategoryId = parseInt(
        formValue.AttributeCategoryId,
        10
      );
      formValue.GooodsGroupId = parseInt(formValue.GooodsGroupId, 10);
      formValue.order = parseInt(formValue.order, 10);
      console.log(formValue);
      let endpoint: string;
      let httpMethod: 'post' | 'put';
      if (this.isEditing) {
        endpoint = `asset/goods-group-attribut-category-goods-attribut-order/${this.goodsattributesid}/${this.gooodsgroupid}/`;
        httpMethod = 'put';
      } else {
        endpoint = 'asset/goods-group-attribut-category-goods-attribut-order/';
        httpMethod = 'post';
      }

      this.dataService[httpMethod](endpoint, formValue)
        .pipe(
          tap({
            next: (response) => {
              if (response.status === 201 || response.status === 200) {
                this.successMessage = this.isEditing
                  ? 'ویرایش ترتیب با موفقیت انجام شد '
                  : 'ایجاد ترتیب با موفقیت انجام شد ';
                this.errorMessage = '';
                this.fetchOrder(); //
                this.orderForm.reset();
                if (this.isEditing) {
                  this.isEditing = false;
                }
              } else {
                this.errorMessage = this.isEditing
                  ? '.ویرایش ترتیب موفقیت آمیز نبود،لطفا دوباره امتحان کنید'
                  : '.ایجاد ترتیب موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
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
  editOrder(GoodsAttributesId: number, GooodsGroupId: number): void {
    this.isEditing = true;
    const endpoint = `asset/goods-group-attribut-category-goods-attribut-order/${GoodsAttributesId}/${GooodsGroupId}/`;
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        const orderData = response.body;
        this.orderForm.patchValue({
          GoodsAttributesId: orderData.goodsattributesid.goodsattributesid,
          AttributeCategoryId:
            orderData.attributecategoryid.attributecategoryid,
          GooodsGroupId: orderData.gooodsgroupid.gooodsgroupid,
          order: orderData.order,
        });
        this.showOrderForm = true;
        this.goodsattributesid = orderData.goodsattributesid.goodsattributesid;
        this.gooodsgroupid = orderData.gooodsgroupid.gooodsgroupid;
      }
    });
  }
  deleteOrder(goodsattributesid: number, gooodsgroupid: number): void {
    const dialogRef = this.dialog.open(ModalsComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'delete') {
        this.deleteOrderConfirmed(goodsattributesid, gooodsgroupid);
      }
    });
  }
  deleteOrderConfirmed(goodsattributesid: number, gooodsgroupid: number): void {
    const endpoint = `asset/goods-group-attribut-category-goods-attribut-order/${goodsattributesid}/${gooodsgroupid}/`;
    this.dataService.delete(endpoint).subscribe((response: any) => {
      if (response.status === 204) {
        this.successMessage = 'حذف ترتیب با موفقیت انجام شد';
        this.errorMessage = '';
        this.fetchOrder();
      } else {
        this.errorMessage =
          'حذف ترتیب موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
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
    this.orderDataSource.filter = filterValue.trim().toLowerCase();

    if (this.orderDataSource.paginator) {
      this.orderDataSource.paginator.firstPage();
    }
  }
}
