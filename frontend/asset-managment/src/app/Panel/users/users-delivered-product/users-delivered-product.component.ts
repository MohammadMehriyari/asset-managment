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
import { PcUserComponent } from '../../../Shared/modals/pc-user/pc-user.component';
import { DeliveredGoodsDetailComponent } from '../../../Shared/modals/delivered-goods-detail/delivered-goods-detail.component';
import { TicketingComponent } from '../../../Shared/modals/ticketing/ticketing.component';

@Component({
  selector: 'as-users-delivered-product',
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
  templateUrl: './users-delivered-product.component.html',
  styleUrl: './users-delivered-product.component.css',
})
export class UsersDeliveredProductComponent implements OnInit {
  showDeliveryTable = false;
  displayedColumns: string[] = [
    'deliveredgoodsid',
    'deliveredgoodsserial',
    'gooodsgroupname',
    'building',
    'area',
    'goods',
    'ticket',
  ];
  deliveryDataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  DeliveryList: any[] = [];
  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.fetchDelivery();
    this.showDeliveryTable = true;
  }
  toggleView(view: 'form' | 'table'): void {
    if (view === 'table') {
      this.fetchDelivery();
    }
    this.showDeliveryTable = true;
  }

  fetchDelivery(): void {
    const endpoint = 'asset/owned-delivered-goods/';
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        this.deliveryDataSource = new MatTableDataSource(response.body);
        this.deliveryDataSource.paginator = this.paginator;
        this.deliveryDataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'deliveredgoodsid':
              return item.deliveredgoodsid;
            case 'deliveredgoodsserial':
              return item.deliveredgoodsserial;
            case 'gooodsgroupname':
              return item.goodsid.goodsname.gooodsgroupid.gooodsgroupname;
            default:
              return item[property];
          }
        };
        this.deliveryDataSource.sort = this.sort;
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.deliveryDataSource.filter = filterValue.trim().toLowerCase();

    if (this.deliveryDataSource.paginator) {
      this.deliveryDataSource.paginator.firstPage();
    }
  }
  viewGoods(deliveredgoodsid: number): void {
    const dialogRef = this.dialog.open(DeliveredGoodsDetailComponent, {
      data: { deliveredgoodsid: deliveredgoodsid },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }
  Ticket(
    computerpropertynumber?: number,
    computername?: string,
    deliveredgoodsid?: number,
    deliverygoodsname?: string
  ): void {
    const dialogRef = this.dialog.open(TicketingComponent, {
      data: {
        computerpropertynumber: computerpropertynumber,
        computername: computername,
        deliveredgoodsid: deliveredgoodsid,
        deliverygoodsname: deliverygoodsname,
      },

      disableClose: true,
      height: '45vw',
      width: '80vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }
}
