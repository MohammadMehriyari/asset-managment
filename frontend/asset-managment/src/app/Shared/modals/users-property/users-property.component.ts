import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { DataService } from '../../../Services/data-service.service';
import { UsersPropertyComputersComponent } from '../users-property-computers/users-property-computers.component';
import { UsersPropertyDeliveredGoodsComponent } from '../users-property-delivered-goods/users-property-delivered-goods.component';

@Component({
  selector: 'as-users-property',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './users-property.component.html',
  styleUrl: './users-property.component.css',
})
export class UsersPropertyComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<UsersPropertyComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      userpersonalid: number;
    },
    private dataservice: DataService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {}

  closeDialog(): void {
    this.dialogRef.close();
  }
  viewDeliveredGoods(userpersonalid: number): void {
    const config: MatDialogConfig = {
      data: (userpersonalid = userpersonalid),
      disableClose: true,
    };
    const dialogRef = this.dialog.open(
      UsersPropertyDeliveredGoodsComponent,
      config
    );

    dialogRef.afterClosed().subscribe((result) => {});
  }
  viewComputers(userpersonalid: number): void {
    const config: MatDialogConfig = {
      data: (userpersonalid = userpersonalid),
      disableClose: true,
    };
    const dialogRef = this.dialog.open(UsersPropertyComputersComponent, config);

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
