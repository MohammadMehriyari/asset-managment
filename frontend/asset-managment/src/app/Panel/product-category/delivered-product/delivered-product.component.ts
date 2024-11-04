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
import { first, tap } from 'rxjs';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
import { ModalsComponent } from '../../../Shared/modals/modals.component';
import { RouterLink, RouterModule } from '@angular/router';
import { DeliveredGoodsComputerComponent } from '../../../Shared/modals/delivered-goods-computer/delivered-goods-computer.component';
import { DeliveredGoodsUserComponent } from '../../../Shared/modals/delivered-goods-user/delivered-goods-user.component';
import moment from 'jalali-moment';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'as-delivered-product',
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
    DropdownModule,
  ],
  templateUrl: './delivered-product.component.html',
  styleUrl: './delivered-product.component.css',
})
export class DeliveredProductComponent implements OnInit {
  showDPForm = false;
  showDPTable = false;
  displayedColumns: string[] = [
    'deliveredgoodsid',
    'deliveredgoodsserial',
    'GoodsId',
    'PartStatus',
    'deliveredgoodscreatetime',
    'deliveredgoodsupdatetime',
    'viewPc',
    'userDeliveryGoods',
    'viewUser',
    'actions',
    'delete',
  ];
  DPDataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  DPForm!: FormGroup;
  userDeliveryGoodsForm!: FormGroup;
  userList: any[] = [];
  buildingList: any[] = [];
  areaList: any[] = [];
  showUserDeliveryGoodsForm = false;
  userDeliveryGoodsid: any;
  successMessage: string = '';
  errorMessage: string = '';
  showMessage = false;
  isEditing = false;
  deliveredgoodsid: any;
  goodsList: any[] = [];
  computerList: any[] = [];
  deliveredGoods: any[] = [];
  goodsPart: any[] = [];
  deliveredGd!: number;
  currentStep = 1;
  firstStepForm!: FormGroup;
  secondStepForm!: FormGroup;
  showMultiStepForm = false;
  partStatus: string = '';
  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.fetchDP();
    this.fetchGoods();
    this.fetchComputers();
    this.fetchUserList();
    this.showDPTable = true;
    this.firstStepForm = this.fb.group({
      deliveredgoodsserial: ['', Validators.required],
      GoodsId: ['', Validators.required],
      ispartinsidecomputer: [''],
    });
    this.firstStepForm
      .get('GoodsId')
      ?.valueChanges.subscribe((goodsId: number) => {
        if (goodsId) {
          this.fetchGoodsDetails(goodsId);
        }
      });

    this.secondStepForm = this.fb.group({
      computerpropertynumber: ['', Validators.required],
    });
    this.userDeliveryGoodsForm = this.fb.group({
      ownerUserId: ['', Validators.required],
      areaId: ['', Validators.required],
      buildingId: ['', Validators.required],
    });
  }
  toggleView(view: 'form' | 'table'): void {
    if (view === 'form') {
      this.isEditing = false;
      this.showDPForm = true;
    } else if (view === 'table') {
      this.fetchDP();
    }

    this.showDPTable = true;
  }

  openDPForm(): void {
    this.showDPForm = true;
  }

  closeDPForm(): void {
    this.showDPForm = false;
    this.firstStepForm.reset();
    this.secondStepForm.reset();
    this.currentStep = 1;
  }
  convertDate(dateString: string): string {
    return moment(dateString, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
  }
  fetchDP(): void {
    const endpoint = '/asset/delivered-goods/';
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        console.log('DP:', response.body);
        this.DPDataSource = new MatTableDataSource(response.body);
        this.DPDataSource.paginator = this.paginator;
        this.DPDataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'deliveredgoodsserial':
              return item.deliveredgoodsserial;
            case 'GoodsId':
              return item.goodsid.goodsid;
            default:
              return item[property];
          }
        };
        this.DPDataSource.sort = this.sort;
      }
    });
  }
  fetchGoodsDetails(goodsId: any): void {
    goodsId = parseInt(goodsId, 10);
    const goodsDetails = this.goodsList.find(
      (item: any) => item.goodsid === goodsId
    );

    if (goodsDetails) {
      this.firstStepForm.patchValue({
        ispartinsidecomputer: this.getStatus(
          goodsDetails.gooodsgroupid.ispartinsidecomputer
        ),
      });
    }
  }

  fetchDPsecond(serialNumber: any): void {
    const endpoint = '/asset/delivered-goods/';
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        console.log('DP Second:', response.body);
        this.deliveredGoods = response.body;

        serialNumber = parseInt(serialNumber, 10);
        this.deliveredGd = this.getDeliveredGoodsId(serialNumber);
      }
    });
  }
  fetchGoods(): void {
    const endpoint = 'asset/goods/';
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        this.goodsList = response.body;
      }
    });
  }
  fetchComputers(): void {
    const endpoint = 'asset/computer/';
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        this.computerList = response.body.filter((pc: any) => !pc.isAbortion);
      }
    });
  }
  getStatus(PartStatus: number): string {
    switch (PartStatus) {
      case 1:
        return 'قطعه داخل کیس است';
      case 0:
        return ' قطعه داخل کیس نیست';
      default:
        return 'نامشخص';
    }
  }
  getNumber(status: string): number {
    switch (status) {
      case 'قطعه داخل کیس است':
        return 1;
      case 'قطعه داخل کیس نیست':
        return 2;
      default:
        return 2;
    }
  }
  getDeliveredGoodsId(serialNumber: number): number {
    if (!serialNumber) {
      throw new Error('Invalid serial number');
    }

    const matchingItem = this.deliveredGoods.find(
      (item) => item.deliveredgoodsserial === serialNumber
    );

    return matchingItem.deliveredgoodsid;
  }
  onSubmitFirstStep(): void {
    console.log(this.firstStepForm.value);
    if (!this.firstStepForm.valid) {
      Object.keys(this.firstStepForm.controls).forEach((field) => {
        const control = this.firstStepForm.get(field);
        if (control?.invalid) {
          console.error(`${field} is invalid`);
          console.log(this.firstStepForm.value[field]);
        }
      });
    }

    if (this.firstStepForm.valid) {
      const formValue = this.firstStepForm.value;
      console.log(formValue);
      formValue.deliveredgoodsserial = parseInt(
        formValue.deliveredgoodsserial,
        10
      );
      formValue.GoodsId = parseInt(formValue.GoodsId, 10);

      let endpoint: string;
      let httpMethod: 'post' | 'put';
      if (this.isEditing) {
        endpoint = `asset/delivered-goods/${this.deliveredgoodsid}/`;
        httpMethod = 'put';
      } else {
        endpoint = 'asset/delivered-goods/';
        httpMethod = 'post';
      }

      this.dataService[httpMethod](endpoint, formValue)
        .pipe(
          tap({
            next: (response) => {
              if (response.status === 201) {
                this.fetchDP();

                this.successMessage = 'کالا تحویلی با موفقیت ایجاد شد ';
                this.errorMessage = '';
                console.log(
                  'here',
                  this.getNumber(formValue.ispartinsidecomputer)
                );
                if (
                  this.getNumber(
                    this.firstStepForm.value.ispartinsidecomputer
                  ) === 2
                ) {
                  this.firstStepForm.reset();
                  this.showDPForm = false;
                } else {
                  this.fetchDPsecond(
                    this.firstStepForm.value.deliveredgoodsserial
                  );
                  this.currentStep = 2;
                  this.firstStepForm.reset();
                }
              } else if (response.status === 200) {
                this.successMessage = 'ویرایش  کالا تحویلی با موفقیت انجام شد ';
                this.errorMessage = '';
                this.showDPForm = false;
                this.isEditing = false;
                this.firstStepForm.reset();
                this.fetchDP();
              } else {
                this.errorMessage =
                  '.عملیات موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
                this.successMessage = '';
              }

              this.showMessages();
            },

            error: (error) => {
              console.error('Error submitting first step:', error);
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

  onSubmitSecondStep(): void {
    console.log(this.secondStepForm.value);
    if (!this.secondStepForm.valid) {
      Object.keys(this.secondStepForm.controls).forEach((field) => {
        const control = this.secondStepForm.get(field);
        if (control?.invalid) {
          console.error(`${field} is invalid`);
          console.log(this.secondStepForm.value[field]);
        }
      });
    }
    if (this.secondStepForm.valid) {
      const secondFormValue = this.secondStepForm.value;

      secondFormValue.computerpropertynumber = parseInt(
        secondFormValue.computerpropertynumber,
        10
      );
      console.log(secondFormValue);
      let endpoint: string;
      let httpMethod: 'patch' | 'put';
      if (this.isEditing) {
        endpoint = `asset/delivered-goods-related-to-computer/${this.deliveredgoodsid}/`;
        httpMethod = 'put';
      } else {
        endpoint = `asset/delivered-goods-related-to-computer/${this.deliveredGd}/`;
        httpMethod = 'patch';
      }

      this.dataService[httpMethod](endpoint, secondFormValue)
        .pipe(
          tap({
            next: (response) => {
              if (response.status === 201) {
                this.successMessage = 'کامپیوتر مرود نظر با موفقیت انتخاب شد';
                this.errorMessage = '';
                this.showMessages();
                this.fetchDP();
              } else if (response.status === 200) {
                this.successMessage =
                  'ویرایش کامپیوتر مورد نظر با موفقیت انجام شد ';
                this.errorMessage = '';
                this.showMessages();
                this.showDPForm = false;
                this.isEditing = false;
                this.firstStepForm.reset();
                this.secondStepForm.reset();
                this.currentStep = 1;
                this.fetchDP();
              } else {
                this.secondStepForm.reset();
                this.errorMessage =
                  'عملیات موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
                this.successMessage = '';
                this.showMessages();
              }
            },
            error: (error) => {
              console.error('Error submitting second step:', error);
              this.errorMessage =
                'مشکلی در ارسال اطلاعات به وجود آمد ، لطفا دوباره امتحان کنید';
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
  editDP(deliveredgoodsid: number): void {
    this.isEditing = true;
    const endpoint = `asset/delivered-goods/${deliveredgoodsid}/`;
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        const DPData = response.body;
        console.log(DPData);
        this.secondStepForm.patchValue({
          computerpropertynumber: DPData.relatedcomputerpropertynumber,
        });
        this.currentStep = 2;
        this.showDPForm = true;
        this.deliveredgoodsid = DPData.deliveredgoodsid;
      }
    });
  }
  deleteDP(deliveredgoodsid: number): void {
    const dialogRef = this.dialog.open(ModalsComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'delete') {
        this.deleteDPConfirmed(deliveredgoodsid);
      }
    });
  }
  deleteDPConfirmed(deliveredgoodsid: number): void {
    const endpoint = `asset/delivered-goods/${deliveredgoodsid}/`;
    this.dataService.delete(endpoint).subscribe((response: any) => {
      if (response.status === 204) {
        this.successMessage = 'حذف کالا تحویلی با موفقیت انجام شد';
        this.errorMessage = '';
        this.fetchDP();
      } else {
        this.errorMessage =
          'حذف کالا تحویلی موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.DPDataSource.filter = filterValue.trim().toLowerCase();

    if (this.DPDataSource.paginator) {
      this.DPDataSource.paginator.firstPage();
    }
  }

  viewPc(deliveredgoodsserial: number): void {
    const config: MatDialogConfig = {
      data: { deliveredgoodsserial: deliveredgoodsserial },
      disableClose: true,
    };
    const dialogRef = this.dialog.open(DeliveredGoodsComputerComponent, config);

    dialogRef.afterClosed().subscribe((result) => {});
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
  fetchUserWorkingLocations(ownerUserId: number): void {
    const endpoint = `accounts/subbuser/detail/working/locations/${ownerUserId}/`;
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
  openUserDeliveryGoodsForm(goodsid: number): void {
    this.buildingList = [];
    this.areaList = [];
    this.showUserDeliveryGoodsForm = true;
    this.userDeliveryGoodsForm
      .get('ownerUserId')
      ?.valueChanges.subscribe((ownerUserId: number) => {
        if (ownerUserId) {
          this.buildingList = [];
          this.areaList = [];
          this.fetchUserWorkingLocations(ownerUserId);
        }
      });
    this.userDeliveryGoodsid = goodsid;
  }
  closeUserDeliveryGoodsForm(): void {
    this.userDeliveryGoodsForm.reset();
    this.showUserDeliveryGoodsForm = false;
  }

  submitUserDeliveryGoods(): void {
    if (this.userDeliveryGoodsForm.valid) {
      const formValue = this.userDeliveryGoodsForm.value;

      formValue.ownerUserId = parseInt(formValue.ownerUserId, 10);
      formValue.areaId = parseInt(formValue.areaId, 10);
      formValue.buildingId = parseInt(formValue.buildingId, 10);
      console.log(formValue);
      let endpoint: string;
      let httpMethod: 'patch';
      endpoint = `asset/assign-delivered-goods-to-user/${this.userDeliveryGoodsid}/`;
      httpMethod = 'patch';

      this.dataService[httpMethod](endpoint, formValue)
        .pipe(
          tap({
            next: (response) => {
              if (response.status === 200) {
                this.successMessage = ' تحویل  کامپیوتر با موفقیت انجام شد ';
                this.errorMessage = '';
                this.fetchDP();
                this.userDeliveryGoodsForm.reset();
              } else {
                this.errorMessage =
                  '. تحویل کامپیوتر موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
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

  viewUser(deliveredgoodsid: number): void {
    const config: MatDialogConfig = {
      data: { deliveredgoodsid: deliveredgoodsid },
      height: '55%',
      disableClose: true,
    };
    const dialogRef = this.dialog.open(DeliveredGoodsUserComponent, config);

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
