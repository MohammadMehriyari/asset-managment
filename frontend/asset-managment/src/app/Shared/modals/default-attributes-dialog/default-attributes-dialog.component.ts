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
  selector: 'as-default-attributes-dialog',
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
  templateUrl: './default-attributes-dialog.component.html',
  styleUrl: './default-attributes-dialog.component.css',
})
export class DefaultAttributesDialogComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'goodsattributesid',
    'defaultattributes',
    'delete',
  ];
  defaultAttributesDataSource!: MatTableDataSource<any>;
  filteredData: any[] = [];
  successMessage: string = '';
  errorMessage: string = '';
  showMessage = false;
  constructor(
    public dialogRef: MatDialogRef<DefaultAttributesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { goodsattributesid: number },
    private dataservice: DataService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    const endpoint = `/asset/goods-attribute-default-value/`;
    this.dataservice.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        this.filteredData = response.body.filter(
          (item: { goodsattributesid: number }) =>
            item.goodsattributesid === this.data.goodsattributesid
        );
        this.dataSource = new MatTableDataSource(this.filteredData);
      }
    });
  }
  deleteDefualtAttribute(
    goodsattributesid: number,
    goodsattributes: string
  ): void {
    const dialogRef = this.dialog.open(ModalsComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'delete') {
        this.deleteDefualtAttributeConfirmed(
          goodsattributesid,
          goodsattributes
        );
        console.log('next method for delete');
      }
    });
  }
  deleteDefualtAttributeConfirmed(
    goodsattributesid: number,
    goodsattributes: string
  ): void {
    const endpoint = `asset/goods-attribute-default-value/${goodsattributesid}/${goodsattributes}/`;
    console.log('Sending delete request');
    this.dataservice.delete(endpoint).subscribe((response: any) => {
      console.log('Response here');
      if (response.status === 204) {
        this.successMessage = 'حذف صفت پیشفرض با موفقیت انجام شد';
        this.errorMessage = '';
      } else {
        this.errorMessage = 'حذف  موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
        this.successMessage = '';
      }
      this.showMessages();
      this.ngOnInit();
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
