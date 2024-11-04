import { CommonModule, DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
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
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { tap } from 'rxjs';
import { UsersPcComponent } from '../../../Panel/users/users-pc/users-pc.component';
import { DataService } from '../../../Services/data-service.service';
import { AuthService } from '../../../Services/auth.service';
import { ModalsComponent } from '../modals.component';
import { AbortionReportComponent } from '../Reports/abortion-report/abortion-report.component';
import { RepairReportComponent } from '../Reports/repair-report/repair-report.component';
import { OutboundReportComponent } from '../Reports/outbound-report/outbound-report.component';
import { InstallReportComponent } from '../Reports/install-report/install-report.component';
import { ExchangeReportComponent } from '../Reports/exchange-report/exchange-report.component';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'as-supporter-admin-ticker',
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
    MatTabsModule,
    MatListModule,
    DropdownModule,
  ],
  templateUrl: './supporter-admin-ticker.component.html',
  styleUrl: './supporter-admin-ticker.component.css',
  providers: [DatePipe],
})
export class SupporterAdminTickerComponent implements OnInit {
  subjectList: any[] = [];
  showTicketForm = false;
  ticketForm!: FormGroup;
  abortionForm!: FormGroup;
  repairForm!: FormGroup;
  outboundForm!: FormGroup;
  installForm!: FormGroup;
  exchangeForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  showMessage = false;
  userRole: any;
  buildingList!: any[];
  userList!: any[];
  areaList!: any[];
  constructor(
    public dialogRef: MatDialogRef<UsersPcComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      ticketid: number | undefined;
      computerpropertynumber: number | undefined;
      deliveredgoodsid: number | undefined;
    },
    private dataService: DataService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private authservice: AuthService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.fetchSubject();
    this.getUserRole();
    this.fetchUserList();
    console.log(this.userRole, typeof this.userRole);
    this.ticketForm = this.fb.group({
      TicketSubjectId: [this.data.ticketid, Validators.required],
      DeliveredGoodsiId: [this.data.deliveredgoodsid],
      ComputerPropertyNumber: [this.data.computerpropertynumber],
      ticketdescription: [''],
    });
    this.abortionForm = this.fb.group({
      TicketId: [this.data.ticketid, Validators.required],
      DeliveredGoodsiId: [this.data.deliveredgoodsid],
      ComputerPropertyNumber: [this.data.computerpropertynumber],
      ticketdescription: [''],
      abortiondonetime: [''],
    });
    this.repairForm = this.fb.group({
      TicketId: [this.data.ticketid, Validators.required],
      DeliveredGoodsiId: [this.data.deliveredgoodsid],
      internalrepairdescription: [''],
      internalrepairchangingdescription: [''],
      internalrepairdonetime: [''],
    });
    this.outboundForm = this.fb.group({
      TicketId: [this.data.ticketid, Validators.required],
      DeliveredGoodsiId: [this.data.deliveredgoodsid],
      outbounddocumentdescription: [''],
      outbounddocumentdonetime: [''],
    });
    this.installForm = this.fb.group({
      TicketId: [this.data.ticketid, Validators.required],
      computerpropertynumber: [this.data.computerpropertynumber],
      installationdescription: [''],
      installationdonetime: [''],
    });
    this.exchangeForm = this.fb.group({
      TicketId: [this.data.ticketid, Validators.required],
      DeliveredGoodsiId: [this.data.deliveredgoodsid],
      ComputerPropertyNumber: [this.data.computerpropertynumber],
      RecieverUserId: [''],
      buildingId: [''],
      areaId: [''],
      exchangingdescription: [''],
      donetime: [''],
    });

    this.exchangeForm
      .get('RecieverUserId')
      ?.valueChanges.subscribe((RecieverUserId: number) => {
        if (RecieverUserId) {
          this.buildingList = [];
          this.areaList = [];
          this.fetchUserWorkingLocations(RecieverUserId);
        }
      });
    this.setCurrentDateTime();
  }
  getUserRole(): void {
    this.userRole = this.authservice.getUserRole();
  }
  fetchSubject(): void {
    this.subjectList = [];
    const endpoint = 'ticket/subject/';
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        this.subjectList = response.body;
      }
    });
  }
  fetchUserList(): void {
    const endpoint = 'accounts/user/';
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        // Filter duplicates based on userpersonalid
        const filteredUsers = response.body.filter(
          (value: { userpersonalid: any }, index: any, self: any[]) =>
            self.findIndex(
              (v: { userpersonalid: any }) =>
                v.userpersonalid === value.userpersonalid
            ) === index
        );
        this.userList = filteredUsers;
      }
    });
  }
  fetchUserWorkingLocations(RecieverUserId: number): void {
    const endpoint = `accounts/subbuser/detail/working/locations/${RecieverUserId}/`;
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        console.log(response.body);
        const workingLocations = response.body;
        workingLocations.forEach((location: any) => {
          this.fetchBuilding(location.buildingid);
          this.fetchArea(location.areaid);
        });
      }
    });
  }

  fetchBuilding(buildingId: number): void {
    const endpoint = `building/${buildingId}/`;
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (
        response &&
        response.body &&
        !this.buildingList.some(
          (b) => b.buildingid === response.body.buildingid
        )
      ) {
        this.buildingList.push(response.body);
      }
    });
  }
  fetchArea(areaId: number): void {
    const endpoint = `area/${areaId}/`;
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (
        response &&
        response.body &&
        !this.areaList.some((a) => a.areaid === response.body.areaid)
      ) {
        this.areaList.push(response.body);
      }
    });
  }
  setCurrentDateTime(): void {
    const currentDate = new Date();
    const formattedDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
    this.abortionForm.patchValue({ abortiondonetime: formattedDate });
    this.repairForm.patchValue({ internalrepairdonetime: formattedDate });
    this.exchangeForm.patchValue({ donetime: formattedDate });
    this.installForm.patchValue({ installationdonetime: formattedDate });
    this.outboundForm.patchValue({ outbounddocumentdonetime: formattedDate });
  }
  onSubmitTicketForm(): void {
    if (!this.ticketForm.valid) {
      Object.keys(this.ticketForm.controls).forEach((field) => {
        const control = this.ticketForm.get(field);
        if (control?.invalid) {
          console.error(`${field} is invalid`);
          console.log(this.ticketForm.value[field]);
        }
      });
    }

    if (this.ticketForm.valid) {
      let formValue = { ...this.ticketForm.value };
      console.log(formValue);
      if (this.data.deliveredgoodsid === undefined) {
        delete formValue.DeliveredGoodsiId;
        formValue.TicketSubjectId = parseInt(formValue.TicketSubjectId, 10);
        formValue.ComputerPropertyNumber = parseInt(
          formValue.ComputerPropertyNumber,
          10
        );
      } else if (this.data.computerpropertynumber === undefined) {
        delete formValue.ComputerPropertyNumber;
        formValue.TicketSubjectId = parseInt(formValue.TicketSubjectId, 10);
        formValue.DeliveredGoodsiId = parseInt(formValue.DeliveredGoodsiId, 10);
      }
      console.log(formValue);

      console.log('This is Form Value: ', formValue);
      let endpoint: string;
      let httpMethod: 'post';
      endpoint = 'ticket/submit/';
      httpMethod = 'post';

      this.dataService[httpMethod](endpoint, formValue)
        .pipe(
          tap({
            next: (response) => {
              if (response.status === 201 || response.status === 200) {
                this.successMessage = 'ثبت تیکت با موفقیت انجام شد ';
                this.errorMessage = '';
                this.ticketForm.reset();
              } else {
                this.errorMessage =
                  '. ثبت تیکت موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
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
  onSubmitAbortionForm(): void {
    if (!this.abortionForm.valid) {
      Object.keys(this.abortionForm.controls).forEach((field) => {
        const control = this.abortionForm.get(field);
        if (control?.invalid) {
          console.error(`${field} is invalid`);
          console.log(this.abortionForm.value[field]);
        }
      });
    }

    if (this.abortionForm.valid) {
      let formValue = { ...this.abortionForm.value };
      console.log(formValue);
      if (
        this.data.deliveredgoodsid === undefined ||
        this.data.deliveredgoodsid === null
      ) {
        console.log('here');
        delete formValue.DeliveredGoodsiId;
        formValue.TicketId = parseInt(formValue.TicketId, 10);
        formValue.ComputerPropertyNumber = parseInt(
          formValue.ComputerPropertyNumber,
          10
        );
      } else if (
        this.data.computerpropertynumber === undefined ||
        this.data.computerpropertynumber === null
      ) {
        console.log('here');
        delete formValue.ComputerPropertyNumber;
        formValue.TicketId = parseInt(formValue.TicketId, 10);
        formValue.DeliveredGoodsiId = parseInt(formValue.DeliveredGoodsiId, 10);
      }
      console.log(formValue);

      console.log('This is Form Value: ', formValue);
      let endpoint: string;
      let httpMethod: 'post';
      endpoint = 'abortion/';
      httpMethod = 'post';

      this.dataService[httpMethod](endpoint, formValue)
        .pipe(
          tap({
            next: (response) => {
              if (response.status === 201 || response.status === 200) {
                this.successMessage = ' اسقاط با موفقیت انجام شد ';
                this.errorMessage = '';
                this.abortionForm.reset();
              } else {
                this.errorMessage =
                  '.  اسقاط موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
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
  onSubmitRepairForm(): void {
    if (!this.repairForm.valid) {
      Object.keys(this.repairForm.controls).forEach((field) => {
        const control = this.repairForm.get(field);
        if (control?.invalid) {
          console.error(`${field} is invalid`);
          console.log(this.repairForm.value[field]);
        }
      });
    }

    if (this.repairForm.valid) {
      let formValue = { ...this.repairForm.value };
      console.log(formValue);
      formValue.TicketId = parseInt(formValue.TicketId, 10);
      formValue.DeliveredGoodsiId = parseInt(formValue.DeliveredGoodsiId, 10);

      console.log(formValue);

      console.log('This is Form Value: ', formValue);
      let endpoint: string;
      let httpMethod: 'post';
      endpoint = 'internal-repair/';
      httpMethod = 'post';

      this.dataService[httpMethod](endpoint, formValue)
        .pipe(
          tap({
            next: (response) => {
              if (response.status === 201 || response.status === 200) {
                this.successMessage = ' تعمیرات با موفقیت انجام شد ';
                this.errorMessage = '';
                this.repairForm.reset();
              } else {
                this.errorMessage =
                  '.  تعمیرات موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
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
  onSubmitOutboundForm(): void {
    if (!this.outboundForm.valid) {
      Object.keys(this.outboundForm.controls).forEach((field) => {
        const control = this.outboundForm.get(field);
        if (control?.invalid) {
          console.error(`${field} is invalid`);
          console.log(this.outboundForm.value[field]);
        }
      });
    }

    if (this.outboundForm.valid) {
      let formValue = { ...this.outboundForm.value };
      console.log(formValue);
      formValue.TicketId = parseInt(formValue.TicketId, 10);
      formValue.DeliveredGoodsiId = parseInt(formValue.DeliveredGoodsiId, 10);

      console.log(formValue);

      console.log('This is Form Value: ', formValue);
      let endpoint: string;
      let httpMethod: 'post';
      endpoint = 'outbound-document/';
      httpMethod = 'post';

      this.dataService[httpMethod](endpoint, formValue)
        .pipe(
          tap({
            next: (response) => {
              if (response.status === 201 || response.status === 200) {
                this.successMessage = ' ارسال به بیرون با موفقیت انجام شد ';
                this.errorMessage = '';
                this.outboundForm.reset();
              } else {
                this.errorMessage =
                  '.  ارسال به بیرون موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
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
  onSubmitInstallForm(): void {
    if (!this.installForm.valid) {
      Object.keys(this.installForm.controls).forEach((field) => {
        const control = this.installForm.get(field);
        if (control?.invalid) {
          console.error(`${field} is invalid`);
          console.log(this.installForm.value[field]);
        }
      });
    }

    if (this.installForm.valid) {
      let formValue = { ...this.installForm.value };
      console.log(formValue);
      formValue.TicketId = parseInt(formValue.TicketId, 10);
      formValue.computerpropertynumber = parseInt(
        formValue.computerpropertynumber,
        10
      );

      console.log(formValue);

      console.log('This is Form Value: ', formValue);
      let endpoint: string;
      let httpMethod: 'post';
      endpoint = 'installation/';
      httpMethod = 'post';

      this.dataService[httpMethod](endpoint, formValue)
        .pipe(
          tap({
            next: (response) => {
              if (response.status === 201 || response.status === 200) {
                this.successMessage = ' نصب با موفقیت انجام شد ';
                this.errorMessage = '';
                this.installForm.reset();
              } else {
                this.errorMessage =
                  '.  نصب موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
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
  onSubmitExchangeForm(): void {
    if (!this.exchangeForm.valid) {
      Object.keys(this.exchangeForm.controls).forEach((field) => {
        const control = this.exchangeForm.get(field);
        if (control?.invalid) {
          console.error(`${field} is invalid`);
          console.log(this.exchangeForm.value[field]);
        }
      });
    }

    if (this.exchangeForm.valid) {
      let formValue = { ...this.exchangeForm.value };
      console.log(formValue);
      formValue.TicketId = parseInt(formValue.TicketId, 10);
      if (this.data.deliveredgoodsid) {
        formValue.DeliveredGoodsiId = parseInt(formValue.DeliveredGoodsiId, 10);
        delete formValue.ComputerPropertyNumber;
      } else {
        formValue.ComputerPropertyNumber = parseInt(
          formValue.ComputerPropertyNumber,
          10
        );
        delete formValue.DeliveredGoodsiId;
      }
      formValue.RecieverUserId = parseInt(formValue.RecieverUserId, 10);
      formValue.buildingId = parseInt(formValue.buildingId, 10);
      formValue.areaId = parseInt(formValue.areaId, 10);
      console.log(formValue);

      console.log('This is Form Value: ', formValue);
      let endpoint: string;
      let httpMethod: 'post';
      endpoint = 'exchanging/';
      httpMethod = 'post';

      this.dataService[httpMethod](endpoint, formValue)
        .pipe(
          tap({
            next: (response) => {
              if (response.status === 201 || response.status === 200) {
                this.successMessage = '   جابجایی با موفقیت انجام شد ';
                this.errorMessage = '';
                this.exchangeForm.reset();
              } else {
                this.errorMessage =
                  '.  جابجایی   موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
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
  ticketReset(): void {
    this.ticketForm.get('ticketdescription')?.reset();
  }
  abortionReset(): void {
    this.abortionForm.get('ticketdescription')?.reset();
  }
  repairReset(): void {
    this.repairForm.get('internalrepairdescription')?.reset();
    this.repairForm.get('internalrepairchangingdescription')?.reset();
  }
  outboundReset(): void {
    this.outboundForm.get('outbounddocumentdescription')?.reset();
  }
  installReset(): void {
    this.installForm.get('installationdescription')?.reset();
  }
  exchangeReset(): void {
    this.exchangeForm.get('exchangingdescription')?.reset();
    this.exchangeForm.get('RecieverUserId')?.reset();
    this.exchangeForm.get('buildingId')?.reset();
    this.exchangeForm.get('areaId')?.reset();
  }
  abortionReport(
    computerpropertynumber: number | undefined,
    deliveredgoodsid: number | undefined
  ): void {
    const dialogRef = this.dialog.open(AbortionReportComponent, {
      data: {
        computerpropertynumber: computerpropertynumber,
        deliveredgoodsid: deliveredgoodsid,
      },

      disableClose: true,
      height: '35vw',
      width: '70vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }
  repairReport(): void {
    const dialogRef = this.dialog.open(RepairReportComponent, {
      disableClose: true,
      height: '35vw',
      width: '70vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }
  outboundReport(): void {
    const dialogRef = this.dialog.open(OutboundReportComponent, {
      disableClose: true,
      height: '35vw',
      width: '70vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }
  installReport(): void {
    const dialogRef = this.dialog.open(InstallReportComponent, {
      disableClose: true,
      height: '35vw',
      width: '70vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }
  exchangeReport(): void {
    const dialogRef = this.dialog.open(ExchangeReportComponent, {
      disableClose: true,
      height: '35vw',
      width: '70vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }
}
