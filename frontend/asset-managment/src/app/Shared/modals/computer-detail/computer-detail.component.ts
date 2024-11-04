import { Component, Inject, OnInit, ViewChild } from '@angular/core';
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
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ModalsComponent } from '../../../Shared/modals/modals.component';
import { RouterLink, RouterModule } from '@angular/router';
import { PcUserComponent } from '../../../Shared/modals/pc-user/pc-user.component';
import { MatIconModule } from '@angular/material/icon';
import { ComputerInsideGoodsComponent } from '../computer-inside-goods/computer-inside-goods.component';
import moment from 'jalali-moment';
@Component({
  selector: 'as-computer-detail',
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
  templateUrl: './computer-detail.component.html',
  styleUrl: './computer-detail.component.css',
})
export class ComputerDetailComponent implements OnInit {
  showPcTable: any;
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
    'computercreatetime',
    'computerupdatetime',
    'viewPcGoods',
  ];
  pcDataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pcList: any[] = [];
  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<ComputerDetailComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      computerpropertynumber: number;
    }
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
    const endpoint = `asset/computer/${this.data.computerpropertynumber}/`;
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        const dataArray = Array.isArray(response.body)
          ? response.body
          : [response.body];
        this.pcDataSource = new MatTableDataSource(dataArray);
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
  convertDate(dateString: string): string {
    return moment(dateString, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
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
  closeDialog(): void {
    this.dialogRef.close();
  }
  viewPcGoods(computerpropertynumber: number): void {
    const dialogRef = this.dialog.open(ComputerInsideGoodsComponent, {
      data: { computerpropertynumber: computerpropertynumber },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }
}
