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
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { tap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { RouterLink, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'as-delivered-goods-user',
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
  templateUrl: './delivered-goods-user.component.html',
  styleUrl: './delivered-goods-user.component.css',
})
export class DeliveredGoodsUserComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'deliveredgoodsserial',
    'userpersonalid',
    'user',
    'userRole',
    'building',
    'area',
    'delete',
  ];
  deliveredGoodsUserDataSource!: MatTableDataSource<any>;

  successMessage: string = '';
  errorMessage: string = '';
  showMessage = false;

  userPcid: any;
  filteredData: any;

  constructor(
    public dialogRef: MatDialogRef<DeliveredGoodsUserComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      deliveredgoodsid: number;
    },
    private dataservice: DataService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    const endpoint = `asset/delivered-goods/`;
    this.dataservice.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        this.filteredData = response.body.filter(
          (item: any) => item.deliveredgoodsid === this.data.deliveredgoodsid
        );

        this.dataSource = new MatTableDataSource(this.filteredData);
      }
    });
  }
  toggleView(view: 'form' | 'table'): void {
    if (view === 'table') {
      this.ngOnInit();
    }
  }

  showMessages(): void {
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 3000);
  }
  getUserRoleString(userRoleId: number): string {
    switch (userRoleId) {
      case 2:
        return 'پشتیبان';
      case 3:
        return 'کاربر عادی';
      default:
        return '';
    }
  }

  deleteUserDelivery(deliverygoodsid: number): void {
    const dialogRef = this.dialog.open(ModalsComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'delete') {
        this.deleteUserDeliveryConfirmed(deliverygoodsid);
      }
    });
  }
  deleteUserDeliveryConfirmed(deliverygoodsid: number): void {
    const endpoint = `asset/assign-delivered-goods-to-user/${deliverygoodsid}/`;
    console.log('Sending delete request');
    this.dataservice.delete(endpoint).subscribe((response: any) => {
      if (response.status === 204) {
        this.successMessage = 'حذف کاربر با موفقیت انجام شد';
        this.errorMessage = '';
        this.ngOnInit();
      } else {
        this.errorMessage =
          'حذف کاربر موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
        this.successMessage = '';
      }
      this.showMessages();
    });
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
