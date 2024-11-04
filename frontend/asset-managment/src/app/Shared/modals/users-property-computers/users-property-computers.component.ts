import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { DataService } from '../../../Services/data-service.service';
import { UsersComputerDetailComponent } from '../users-computer-detail/users-computer-detail.component';
import { UsersPropertyComponent } from '../users-property/users-property.component';
import { UserPropertyComputerGoodsComponent } from '../user-property-computer-goods/user-property-computer-goods.component';
import { SupporterAdminTickerComponent } from '../supporter-admin-ticker/supporter-admin-ticker.component';

@Component({
  selector: 'as-users-property-computers',
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
  templateUrl: './users-property-computers.component.html',
  styleUrl: './users-property-computers.component.css',
})
export class UsersPropertyComputersComponent implements OnInit {
  myUserComputers: any[] = [];
  displayedColumns: string[] = [
    'computerpropertynumber',
    'computername',
    'computermodel',
    'operationsystemname',
    'operationsystemversionname',
    'computerip',
    'computermacaddress',
    'status',
    'abortion',
    'viewGoods',
  ];
  DataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<UsersPropertyComputersComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      userpersonalid: number;
    }
  ) {}
  ngOnInit(): void {
    const endpoint = `asset/subuser-owned-properties/`;
    this.dataService.get(endpoint).subscribe((response: any) => {
      console.log(this.data);
      if (response && response.body) {
        // Filter computers by owneruserid
        this.myUserComputers = response.body.computers.filter(
          (computer: any) => computer.owneruserid?.userpersonalid === this.data
        );
        this.DataSource = new MatTableDataSource(this.myUserComputers);
        console.log(this.myUserComputers);
      }
    });
  }
  getPersonalStatus(isPersonal: number): string {
    return isPersonal ? 'شخصی نیست' : 'شخصی است';
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

  viewGoods(computerpropertynumber: number): void {
    const dialogRef = this.dialog.open(UserPropertyComputerGoodsComponent, {
      data: { computerpropertynumber: computerpropertynumber },
      disableClose: true,
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
