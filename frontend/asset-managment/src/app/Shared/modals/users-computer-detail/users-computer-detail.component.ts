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
import moment from 'jalali-moment';

@Component({
  selector: 'as-users-computer-detail',
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
  templateUrl: './users-computer-detail.component.html',
  styleUrl: './users-computer-detail.component.css',
})
export class UsersComputerDetailComponent implements OnInit {
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
  ];
  pcDataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pcList: any[] = [];
  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<UsersComputerDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
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
  convertDate(dateString: string): string {
    return moment(dateString, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
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
}
