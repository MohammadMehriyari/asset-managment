import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
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
import { HeaderComponent } from '../../../header/header.component';
import { DataService } from '../../../../Services/data-service.service';
import { DeliveredGoodsUserComponent } from '../../delivered-goods-user/delivered-goods-user.component';
import { ModalsComponent } from '../../modals.component';

@Component({
  selector: 'as-abortion-report',
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
  templateUrl: './abortion-report.component.html',
  styleUrl: './abortion-report.component.css',
})
export class AbortionReportComponent implements OnInit {
  filteredData: any[] = [];
  displayedColumns: string[] = [
    'abortionid',
    'ticketid',
    'goods',
    'abortioncreatetime',
    // 'abortionupdatetime',
    'delete',
  ];

  reportDataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  successMessage: string = '';
  errorMessage: string = '';
  showMessage = false;
  endpoint!: string;
  userList: any[] = [];
  abortionData: any;
  constructor(
    public dialogRef: MatDialogRef<AbortionReportComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      computerpropertynumber: number | undefined;
      deliveredgoodsid: number | undefined;
    },
    private dataservice: DataService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    const computerId = this.data.computerpropertynumber;
    const deliveredGoodsId = this.data.deliveredgoodsid;
    if (computerId) {
      this.dataservice.get(`abortion/?computer_id=${computerId}`).subscribe(
        (response: any) => {
          console.log(response.body);
          this.abortionData = response.body;
          this.reportDataSource = new MatTableDataSource(response.body);
        },
        (error: any) => {
          console.error('Error fetching abortion data:', error);
        }
      );
    } else if (deliveredGoodsId) {
      this.dataservice
        .get(`abortion/?deliveredgoods_id=${deliveredGoodsId}`)
        .subscribe(
          (response: any) => {
            this.abortionData = response.body;
            this.reportDataSource = new MatTableDataSource(this.abortionData);
          },
          (error: any) => {
            console.error('Error fetching abortion data:', error);
          }
        );
    } else {
      console.error(
        'Invalid request: No computer_id or deliveredgoods_id provided'
      );
    }
  }
  deleteAbortion(
    computerpropertynumber: number | undefined,
    deliveredgoodsid: number | undefined
  ): void {
    const dialogRef = this.dialog.open(ModalsComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'delete') {
        this.deleteReportConfirmed(computerpropertynumber, deliveredgoodsid);
      }
    });
  }
  deleteReportConfirmed(
    computerpropertynumber: number | undefined,
    deliveredgoodsid: number | undefined
  ): void {
    const computerId = computerpropertynumber;
    const deliveredGoodsId = deliveredgoodsid;
    if (computerId) {
      this.endpoint = `abortion/?computer_id=${computerId}/`;
    } else if (deliveredGoodsId) {
      this.endpoint = `abortion/?deliveredgoods_id=${deliveredGoodsId}/`;
    } else {
      console.error(
        'Invalid request: No computer_id or deliveredgoods_id provided'
      );
      return;
    }
    this.dataservice.delete(this.endpoint).subscribe((response: any) => {
      if (response.status === 204) {
        this.successMessage = 'حذف  با موفقیت انجام شد';
        this.errorMessage = '';
        this.ngOnInit();
      } else {
        this.errorMessage = 'حذف  موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
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
  closeDialog(): void {
    this.dialogRef.close();
  }
}
