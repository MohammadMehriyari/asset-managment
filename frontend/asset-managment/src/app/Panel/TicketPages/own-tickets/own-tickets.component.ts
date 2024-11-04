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
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
import { ModalsComponent } from '../../../Shared/modals/modals.component';
import { RouterLink, RouterModule } from '@angular/router';
import { TicketDetailComponent } from '../../../Shared/modals/ticket-detail/ticket-detail.component';
import { UserDetailComponent } from '../../../Shared/modals/user-detail/user-detail.component';
import { AuthService } from '../../../Services/auth.service';
import { AnswerTicketComponent } from '../../../Shared/modals/answer-ticket/answer-ticket.component';
import { ChangeStatusComponent } from '../../../Shared/modals/change-status/change-status.component';
import { SupporterAdminTickerComponent } from '../../../Shared/modals/supporter-admin-ticker/supporter-admin-ticker.component';
import moment from 'jalali-moment';

@Component({
  selector: 'as-own-tickets',
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
  templateUrl: './own-tickets.component.html',
  styleUrl: './own-tickets.component.css',
})
export class OwnTicketsComponent implements OnInit {
  showSealForm = false;
  showTicketTable = false;
  showSealPcForm = false;
  displayedColumns: string[] = [
    'ticketid',
    'ticketsubjectid',
    'ticketstatusid',
    'createruserid',
    'ticketcreatetime',
    'refferedticketdate',
    'viewDetail',
    'answerTicket',
    'changeStatus',
    'viewTicket',
  ];
  ticketDataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ticketId: any;
  successMessage: string = '';
  errorMessage: string = '';
  showMessage = false;
  isEditing = false;

  statusList: any[] = [];
  subjectList: any[] = [];
  role: any;
  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private authservice: AuthService
  ) {}

  ngOnInit(): void {
    this.getRole();
    this.fetchSubject();
    this.fetchStatus();
    this.DisplayedColumns();
    this.fetchTicket();

    this.showTicketTable = true;
  }

  toggleView(view: 'form' | 'table'): void {
    if (view === 'form') {
      this.isEditing = false;
      // this.ticketForm.reset();
      this.showSealForm = true;
    } else if (view === 'table') {
      this.fetchTicket();
    }

    this.showTicketTable = true;
  }
  DisplayedColumns(): void {
    if (this.role !== 'admin') {
      this.displayedColumns.splice(3, 1);
      this.displayedColumns.splice(6, 3);
    } else {
      this.displayedColumns;
    }
  }
  convertDate(dateString: string): string {
    return moment(dateString, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
  }
  fetchTicket(): void {
    const endpoint = 'ticket/related/';
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        this.ticketDataSource = new MatTableDataSource(response.body);
        this.ticketDataSource.paginator = this.paginator;
        this.ticketDataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'ticketid':
              return item.ticketid;
            case 'ticketsubjectid':
              return this.getSubjectName(item.ticketsubjectid);
            case 'ticketstatusid':
              return this.getStatusName(item.ticketstatusid);
            default:
              return item[property];
          }
        };
        this.ticketDataSource.sort = this.sort;
      }
    });
  }

  showMessages(): void {
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 3000);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.ticketDataSource.filter = filterValue.trim().toLowerCase();

    if (this.ticketDataSource.paginator) {
      this.ticketDataSource.paginator.firstPage();
    }
  }
  fetchSubject(): void {
    const endpoint = 'ticket/subject/';
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        this.subjectList = response.body;
      }
    });
  }
  getSubjectName(subjectid: any): void {
    const matchingSubject = this.subjectList.find(
      (subject) => subject.ticketsubjectid === subjectid
    );

    return matchingSubject.ticketsubjectname;
  }
  fetchStatus(): void {
    const endpoint = 'ticket/status/';
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        this.statusList = response.body;
      }
    });
  }
  getStatusName(statusid: any): void {
    const matchingStatus = this.statusList.find(
      (status) => status.ticketstatusid === statusid
    );

    return matchingStatus.ticketstatusname;
  }

  viewDetail(ticketid: any): void {
    const config: MatDialogConfig = {
      data: { ticketid: ticketid },
      disableClose: true,
    };
    const dialogRef = this.dialog.open(TicketDetailComponent, config);

    dialogRef.afterClosed().subscribe((result) => {});
  }
  viewUserDetail(userid: number): void {
    const config: MatDialogConfig = {
      data: { userid },
      disableClose: true,
    };
    const dialogRef = this.dialog.open(UserDetailComponent, config);

    dialogRef.afterClosed().subscribe((result) => {});
  }
  getRole(): void {
    this.role = this.authservice.getUserRole();
  }
  answerTicket(ticketid: number): void {
    const config: MatDialogConfig = {
      data: { ticketid },
      disableClose: true,
    };
    const dialogRef = this.dialog.open(AnswerTicketComponent, config);

    dialogRef.afterClosed().subscribe((result) => {});
  }
  changeStatus(ticketid: number, ticketStatusName: string | void): void {
    const config: MatDialogConfig = {
      data: { ticketid, ticketStatusName },
      disableClose: true,
    };
    const dialogRef = this.dialog.open(ChangeStatusComponent, config);

    dialogRef.afterClosed().subscribe((result) => {
      this.fetchTicket();
    });
  }
  viewTicket(
    ticketid?: number,
    computerpropertynumber?: number,
    deliveredgoodsid?: number
  ): void {
    const dialogRef = this.dialog.open(SupporterAdminTickerComponent, {
      data: {
        ticketid: ticketid,
        computerpropertynumber: computerpropertynumber,
        deliveredgoodsid: deliveredgoodsid,
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
