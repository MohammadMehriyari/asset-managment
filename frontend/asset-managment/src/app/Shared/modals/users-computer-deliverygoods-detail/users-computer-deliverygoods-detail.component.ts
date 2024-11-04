import { Component, OnInit, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { DataService } from '../../../Services/data-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { ModalsComponent } from '../modals.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { RouterLink, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { TicketingComponent } from '../ticketing/ticketing.component';
import moment from 'jalali-moment';

@Component({
  selector: 'as-users-computer-deliverygoods-detail',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    RouterLink,
    RouterModule,
  ],
  templateUrl: './users-computer-deliverygoods-detail.component.html',
  styleUrl: './users-computer-deliverygoods-detail.component.css',
})
export class UsersComputerDeliverygoodsDetailComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'deliveredgoodsid',
    'deliveredgoodsserial',
    'gooodsgroupname',
    'goodsname',
    'ispartinsidecomputer',
    'isallowedtosendout',
    'isallowedtobeaborted',
    'isallowedtomove',
    'ispossibletorepair',
    'isAbortion',
    'deliveredgoodscreatetime',
    'deliveredgoodsupdatetime',
  ];
  deliveredGoodsDetailDataSource!: MatTableDataSource<any>;
  filteredData: any[] = [];
  constructor(
    public dialogRef: MatDialogRef<UsersComputerDeliverygoodsDetailComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      computerpropertynumber: number;
    },
    private dataservice: DataService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    const endpoint = `asset/owned-computers/`;
    this.dataservice.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        const filteredData = response.body.filter(
          (item: any) =>
            item.computerpropertynumber === this.data.computerpropertynumber
        );
        const flattenedGoods = filteredData.reduce(
          (acc: string | any[], curr: { relateddeliveredgoods: any }) => {
            return acc.concat(curr.relateddeliveredgoods);
          },
          []
        );
        console.log(flattenedGoods);
        this.dataSource = new MatTableDataSource(flattenedGoods);
      }
    });
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
  getAbortion(isAbortion: boolean): string {
    switch (isAbortion) {
      case false:
        return 'اسقاط نشده است';
      case true:
        return ' اسقاط شده است';
      default:
        return 'نامشخص';
    }
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
  closeDialog(): void {
    this.dialogRef.close();
  }
}
