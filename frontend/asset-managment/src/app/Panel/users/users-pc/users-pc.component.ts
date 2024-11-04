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
import { UsersComputerDetailComponent } from '../../../Shared/modals/users-computer-detail/users-computer-detail.component';
import { UsersComputerDeliverygoodsDetailComponent } from '../../../Shared/modals/users-computer-deliverygoods-detail/users-computer-deliverygoods-detail.component';
import { TicketingComponent } from '../../../Shared/modals/ticketing/ticketing.component';

@Component({
  selector: 'as-users-pc',
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
  templateUrl: './users-pc.component.html',
  styleUrl: './users-pc.component.css',
})
export class UsersPcComponent implements OnInit {
  showPcTable = false;
  displayedColumns: string[] = [
    'computerpropertynumber',
    'computerseallingnumber',
    'isexpired',
    'building',
    'area',
    'userPc',
    'userGoods',
    'ticket',
  ];
  pcDataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pcList: any[] = [];
  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.fetchPc();
    this.showPcTable = true;
  }
  toggleView(view: 'form' | 'table'): void {
    if (view === 'table') {
      this.fetchPc();
    }
    this.showPcTable = true;
  }

  fetchPc(): void {
    const endpoint = 'asset/owned-computers/';
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        this.pcDataSource = new MatTableDataSource(response.body);
        this.pcDataSource.paginator = this.paginator;
        this.pcDataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'computerpropertynumber':
              return item.computerpropertynumber;
            case 'computername':
              return item.computername;
            case 'operationsystemname':
              return item.operationsystemversionid.operationsystemname;
            case 'operationsystemversionname':
              return item.operationsystemversionid.operationsystemversionname;

            case 'computerseallingnumber':
              return item.sealing.computerseallingnumber;
            case 'isexpired':
              return item.sealing.isexpired;
            default:
              return item[property];
          }
        };
        this.pcDataSource.sort = this.sort;
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.pcDataSource.filter = filterValue.trim().toLowerCase();

    if (this.pcDataSource.paginator) {
      this.pcDataSource.paginator.firstPage();
    }
  }
  getPersonalStatus(isPersonal: number): string {
    return isPersonal ? 'شخصی نیست' : 'شخصی است';
  }
  getExpired(isExpired: number): string {
    return isExpired ? 'منقضی شده است' : 'منقضی نشده است';
  }
  viewPcs(computerpropertynumber: number): void {
    const dialogRef = this.dialog.open(UsersComputerDetailComponent, {
      data: { computerpropertynumber: computerpropertynumber },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }
  viewPcGoods(computerpropertynumber: number): void {
    const dialogRef = this.dialog.open(
      UsersComputerDeliverygoodsDetailComponent,
      {
        data: { computerpropertynumber: computerpropertynumber },
        disableClose: true,
      }
    );

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
