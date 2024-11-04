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

@Component({
  selector: 'as-delivered-goods-computer',
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
  templateUrl: './delivered-goods-computer.component.html',
  styleUrl: './delivered-goods-computer.component.css',
})
export class DeliveredGoodsComputerComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'computerpropertynumber',
    'computername',
    'computermodel',
  ];
  deliveredGoodsPcDataSource!: MatTableDataSource<any>;
  filteredData: any[] = [];
  successMessage: string = '';
  errorMessage: string = '';
  showMessage = false;
  constructor(
    public dialogRef: MatDialogRef<DeliveredGoodsComputerComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      deliveredgoodsserial: number;
    },
    private dataservice: DataService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    const endpoint = `asset/computer/`;
    this.dataservice.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        console.log(response.body);
        console.log(this.data.deliveredgoodsserial);

        // Filter data based on deliveredgoodsserial
        this.filteredData = response.body.filter(
          (item: { relateddeliveredgoods: any[] }) =>
            item.relateddeliveredgoods &&
            item.relateddeliveredgoods.some(
              (relatedItem: { deliveredgoodsserial: number }) =>
                relatedItem.deliveredgoodsserial ===
                this.data.deliveredgoodsserial
            )
        );

        console.log(this.filteredData);
        this.dataSource = new MatTableDataSource(this.filteredData);
      }
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
