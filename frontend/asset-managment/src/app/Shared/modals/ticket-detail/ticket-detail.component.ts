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
import { DeliveredGoodsDetailComponent } from '../delivered-goods-detail/delivered-goods-detail.component';
import { ComputerDetailComponent } from '../computer-detail/computer-detail.component';

@Component({
  selector: 'as-ticket-detail',
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
  templateUrl: './ticket-detail.component.html',
  styleUrl: './ticket-detail.component.css',
})
export class TicketDetailComponent implements OnInit {
  filteredData: any;
  secondReferredDescriptions: string[] = [];
  PcList: any;
  goodsList: any;
  constructor(
    public dialogRef: MatDialogRef<TicketDetailComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      ticketid: any;
    },
    private dataservice: DataService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    const endpoint = `ticket/related/${this.data.ticketid}/`;
    this.dataservice.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        this.filteredData = response.body;
        this.extractSecondReferredDescriptions();
      }
    });
  }
  extractSecondReferredDescriptions(): void {
    if (
      this.filteredData &&
      Array.isArray(this.filteredData.referred_tickets)
    ) {
      const referredTickets = this.filteredData.referred_tickets;
      if (referredTickets.length > 1) {
        this.secondReferredDescriptions =
          referredTickets[1].refferedticketdescription;
      } else {
        this.secondReferredDescriptions = [];
      }
    } else {
      console.error(
        'Filtered data is not an object with a referred_tickets array.'
      );
    }
  }
  detail(deliveredgoodsid?: number): void {
    const dialogRef = this.dialog.open(DeliveredGoodsDetailComponent, {
      data: {
        deliveredgoodsid: deliveredgoodsid,
      },

      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }
  Detail(computerpropertynumber?: number): void {
    const dialogRef = this.dialog.open(ComputerDetailComponent, {
      data: {
        computerpropertynumber: computerpropertynumber,
      },

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
