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
import { ModalsComponent } from '../../modals.component';
import { OutboundReportComponent } from '../outbound-report/outbound-report.component';

@Component({
  selector: 'as-exchange-report',
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
  templateUrl: './exchange-report.component.html',
  styleUrl: './exchange-report.component.css',
})
export class ExchangeReportComponent implements OnInit {
  filteredData: any[] = [];
  displayedColumns: string[] = [
    'exchangingid',
    'goodsname',
    'ticketid',
    // 'ticketdescription',
    // 'exchangingdescription',
    // 'deliveredgoodsid',
    // 'outbounddocumentdescription',
    // 'outbounddocumentdonetime',
    'delete',
  ];
  reportDataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  successMessage: string = '';
  errorMessage: string = '';
  showMessage = false;
  endpoint!: string;
  exchangeData: any;
  constructor(
    public dialogRef: MatDialogRef<ExchangeReportComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {},
    private dataservice: DataService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.dataservice.get(`exchanging/`).subscribe(
      (response: any) => {
        this.exchangeData = response.body;
        // Sort the data by exchangingid in descending order
        this.exchangeData.sort(
          (a: { exchangingid: number }, b: { exchangingid: number }) =>
            b.exchangingid - a.exchangingid
        );
        this.reportDataSource = new MatTableDataSource(this.exchangeData);
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  deleteExchange(exchangingid: number): void {
    const dialogRef = this.dialog.open(ModalsComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'delete') {
        this.deleteReportConfirmed(exchangingid);
      }
    });
  }
  deleteReportConfirmed(exchangingid: number): void {
    this.endpoint = `exchanging/${exchangingid}/`;
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
