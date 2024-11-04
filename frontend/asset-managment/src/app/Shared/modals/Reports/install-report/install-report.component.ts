import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
import { tap } from 'rxjs';

@Component({
  selector: 'as-install-report',
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
  templateUrl: './install-report.component.html',
  styleUrl: './install-report.component.css',
})
export class InstallReportComponent implements OnInit {
  softwareForm!: FormGroup;
  showSoftwareForm = false;
  filteredData: any[] = [];
  displayedColumns: string[] = [
    'installationid',
    'ticketid',
    'computerpropertynumber',
    'softwareid',
    // 'installationdescription',
    'delete',
    'software',
  ];
  reportDataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  successMessage: string = '';
  errorMessage: string = '';
  showMessage = false;
  endpoint!: string;
  installData: any;
  softwareList!: any[];
  constructor(
    public dialogRef: MatDialogRef<InstallReportComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {},
    private dataservice: DataService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.fetchSoftware();
    console.log(this.softwareList);

    this.dataservice.get(`installation/`).subscribe(
      (response: any) => {
        this.installData = response.body;
        this.reportDataSource = new MatTableDataSource(this.installData);
        this.reportDataSource.data.forEach((item: any) => {
          // Extract the first software ID from the 'installedsoftwares' array
          item.softwareid = item.installedsoftwares[0]
            ? item.installedsoftwares[0][0]
            : null;
        });
        this.reportDataSource._updateChangeSubscription();
      },
      (error: any) => {
        console.error('Error fetching  data:', error);
      }
    );
  }
  openSoftwareForm(installationid: number): void {
    this.softwareForm = this.fb.group({
      installationid: [installationid],
      softwareid: [''],
      usageofsoftwaresininstallization: [''],
    });

    this.showSoftwareForm = true;
  }
  closeSoftwareForm(): void {
    this.softwareForm.reset();
    this.showSoftwareForm = false;
  }
  fetchSoftware(): void {
    const endpoint = `software/`;
    this.dataservice.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        console.log(response.body);
        // this.softwareList = [];
        this.softwareList = response.body;
        console.log(this.softwareList);
      }
    });
  }
  deleteInstall(installationid: number): void {
    const dialogRef = this.dialog.open(ModalsComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'delete') {
        this.deleteReportConfirmed(installationid);
      }
    });
  }
  deleteReportConfirmed(installationid: number): void {
    this.endpoint = `installation/${installationid}/`;
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
  onSubmitSoftware(): void {
    if (this.softwareForm.valid) {
      console.log('here');
      const formValue = this.softwareForm.value;
      formValue.softwareid = parseInt(formValue.softwareid, 10);
      const installationid = formValue.installationid;
      const softwareid = formValue.softwareid;
      console.log(formValue);
      let endpoint: string;
      let httpMethod: 'post';
      endpoint = `software-usage-in-installization/${softwareid}/${installationid}/`;
      httpMethod = 'post';

      this.dataservice[httpMethod](endpoint, formValue)
        .pipe(
          tap({
            next: (response) => {
              if (response.status === 200) {
                this.successMessage = ' نصب نرم افزار    با موفقیت انجام شد ';
                this.errorMessage = '';
                this.ngOnInit();
                this.softwareForm.reset();
                this.showSoftwareForm = false;
              } else {
                this.errorMessage =
                  '.  نصب نرم افزار موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
                this.successMessage = '';
              }
              this.showMessages();
            },
            error: (error) => {
              console.error('Error submitting form :', error);
              this.errorMessage =
                '.مشکلی در ارسال اطلاعات به وجود آمد ، لطفا دوباره امتحان کنید';
              this.successMessage = '';
              this.showMessages();
            },
          })
        )
        .subscribe();
    } else {
      this.errorMessage = '.لطفا همه فیلد ها را پر کنید';
      this.successMessage = '';
      this.showMessages();
    }
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
