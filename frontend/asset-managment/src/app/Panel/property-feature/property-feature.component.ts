import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../Shared/header/header.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { DataService } from '../../Services/data-service.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';
import { map, Observable, tap } from 'rxjs';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ModalsComponent } from '../../Shared/modals/modals.component';
import { DefaultAttributesDialogComponent } from '../../Shared/modals/default-attributes-dialog/default-attributes-dialog.component';
import moment from 'jalali-moment';

@Component({
  selector: 'as-property-feature',
  standalone: true,
  imports: [
    HeaderComponent,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    CommonModule,
    RouterLink,
    RouterModule,
  ],
  templateUrl: './property-feature.component.html',
  styleUrl: './property-feature.component.css',
})
export class PropertyFeatureComponent implements OnInit {
  [x: string]: any;
  currentStep = 1;
  isEditing = false;
  firstStepForm!: FormGroup;
  secondStepForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  showMessage = false;
  showPropertyForm = false;
  showPropertyTable = false;
  showMultiStepForm = false;
  goodsattributesid!: number;
  currentGoodsAttributeType: number | null = null;
  displayedColumns: string[] = [
    'goodsattributesid',
    'goodsattributestitle',
    'goodsattributestype',
    'goodsattributescreatetime',
    'goodsattributesupdatetime',
    'actions',
    'delete',
    'viewDefaults',
  ];
  propertyDataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private dialog: MatDialog,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.fetchProperty();
    this.showPropertyTable = true;
    this.firstStepForm = this.fb.group({
      goodsattributestitle: ['', Validators.required],
      goodsattributestype: ['', Validators.required],
    });

    this.secondStepForm = this.fb.group({
      goodsAttributesId: ['', Validators.required],
      defaultAttributes: this.fb.array([this.createDefaultAttribute()]),
    });
  }
  toggleView(view: 'form' | 'table'): void {
    if (view === 'form') {
      this.isEditing = false;
      this.firstStepForm.reset();
      this.showPropertyForm = true;
    } else if (view === 'table') {
      this.fetchProperty();
    }

    this.showPropertyTable = true;
  }
  openPropertyForm(): void {
    this.showPropertyForm = true;
  }

  closePropertyForm(): void {
    this.firstStepForm.reset();
    this.secondStepForm.reset();
    this.showPropertyForm = false;
  }
  convertDate(dateString: string): string {
    return moment(dateString, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
  }
  fetchProperty(): void {
    const endpoint = 'asset/goods-attribute/';
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        this.propertyDataSource = new MatTableDataSource(response.body);
        this.propertyDataSource.paginator = this.paginator;
        this.propertyDataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'goodsattributesid':
              return item.goodsattributesid;
            case 'goodsattributestitle':
              return item.goodsattributestitle;
            case 'goodsattributestype':
              return this.getDefaultValuename(item.goodsattributestype);
            default:
              return item[property];
          }
        };

        this.propertyDataSource.sort = this.sort;
      }
    });
  }
  findAttributeId(attributeName: string): Observable<number> {
    const endpoint = 'asset/goods-attribute/';
    return this.dataService.get(endpoint).pipe(
      map((response: any) => {
        if (response && response.body) {
          const attributes = response.body;
          const attribute = attributes.find(
            (attr: { goodsattributestitle: string }) =>
              attr.goodsattributestitle === attributeName
          );
          return attribute ? attribute.goodsattributesid : null;
        } else {
          return null;
        }
      })
    );
  }

  getDefaultValuename(goodsattributestype: number): string {
    switch (goodsattributestype) {
      case 1:
        return 'دارد';
      case 2:
        return ' ندارد';
      default:
        return 'نامشخص';
    }
  }
  createDefaultAttribute(): FormGroup {
    return this.fb.group({
      defaultattributes: ['', Validators.required],
    });
  }

  get defaultAttributes(): FormArray {
    return this.secondStepForm.get('defaultAttributes') as FormArray;
  }
  addNewDefaultAttribute(): void {
    this.defaultAttributes.push(this.createDefaultAttribute());
    this.successMessage = '  صفت پیشفرض اضافه شد     ';
    this.errorMessage = '';
    this.showMessages();
  }
  deleteAttribute(goodsattributesid: number): void {
    const dialogRef = this.dialog.open(ModalsComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'delete') {
        this.deleteAttributeConfirmed(goodsattributesid);
      }
    });
  }
  deleteAttributeConfirmed(goodsattributesid: number): void {
    const endpoint = `asset/goods-attribute/${goodsattributesid}/`; // Define your endpoint
    this.dataService.delete(endpoint).subscribe((response: any) => {
      if (response.status === 204) {
        this.successMessage = 'حذف ویژگی با موفقیت انجام شد';
        this.errorMessage = '';
        this.fetchProperty();
      } else {
        this.errorMessage =
          'حذف ویژگی موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
        this.successMessage = '';
      }
      this.showMessages();
    });
  }
  deleteDefualtAttributes(attributeId: number): void {
    const endpoint = `asset/goods-attribute-default-value/${attributeId}/`;
    this.dataService.delete(endpoint).subscribe((response: any) => {
      if (response.status === 204) {
        this.successMessage = '.تمام ویژگی های پیشفرض این ویژگی کالا حذف شدند';
        this.errorMessage = '';
        this.fetchProperty();
      } else {
        this.errorMessage =
          'حذف ویژگی های پیشفرض موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
        this.successMessage = '';
      }
      this.showMessages();
    });
  }
  editAttribute(goodsAttributesId: number): void {
    this.isEditing = true;
    const endpoint = `asset/goods-attribute/${goodsAttributesId}/`;
    this.dataService.get(endpoint).subscribe((response: any) => {
      if (response && response.body) {
        const goodsData = response.body;
        this.firstStepForm.patchValue({
          goodsattributestitle: goodsData.goodsattributestitle,
          goodsattributestype: goodsData.goodsattributestype,
        });

        this.showPropertyForm = true;
        this.goodsattributesid = goodsData.goodsattributesid;
        this.currentGoodsAttributeType = goodsData.goodsattributestype;
      }
    });
  }

  viewDefaults(goodsattributesid: number): void {
    const config: MatDialogConfig = {
      data: { goodsattributesid: goodsattributesid },

      disableClose: true,
    };
    const dialogRef = this.dialog.open(
      DefaultAttributesDialogComponent,
      config
    );

    dialogRef.afterClosed().subscribe((result) => {});
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
      formValue.goodsattributestype = parseInt(
        formValue.goodsattributestype,
        10
      );
      if (this.isEditing) {
        formValue.userpersonalid = parseInt(formValue.userpersonalid, 10);
      } else {
        formValue.userpersonalid = parseInt(formValue.userpersonalid, 10);
        formValue.userroleid = parseInt(formValue.userroleid, 10);
      }

      let endpoint: string;
      let httpMethod: 'post' | 'put';
      if (this.isEditing) {
        endpoint = `/asset/goods-attribute/${this.goodsattributesid}/`;
        httpMethod = 'put';
      } else {
        endpoint = 'asset/goods-attribute/';
        httpMethod = 'post';
      }
      // const filteredFormValue = Object.fromEntries(
      //   Object.entries(formValue)
      //     .map(([key, value]) => [key, value ?? ''])
      //     .filter(([key, value]) => {
      //       return (
      //         !(key === 'userroleid' || key === 'supporterid') || value !== ''
      //       );
      //     })
      // );
      console.log(formValue);
      this.dataService[httpMethod](endpoint, formValue)
        .pipe(
          tap({
            next: (response) => {
              if (response.status === 201) {
                this.fetchProperty();
                this.successMessage = '   ویژگی اضافه شد    ';
                this.errorMessage = '';
                const attributenamee = formValue.goodsattributestitle;
                this.findAttributeId(attributenamee).subscribe(
                  (attributeId) => {
                    if (attributeId !== null) {
                      this.secondStepForm.patchValue({
                        goodsAttributesId: attributeId,
                      });
                      if (formValue.goodsattributestype === 1) {
                        this.currentStep = 2;
                      }
                    } else {
                      console.error('Attribute ID not found');
                    }
                  }
                );

                this.firstStepForm.reset();
              } else if (response.status === 200) {
                const attributenamee = formValue.goodsattributestitle;
                this.findAttributeId(attributenamee).subscribe(
                  (attributeId) => {
                    if (attributeId !== null) {
                      this.secondStepForm.patchValue({
                        goodsAttributesId: attributeId,
                      });
                      if (formValue.goodsattributestype === 1) {
                        this.fetchProperty();
                        this.successMessage =
                          'ویرایش  ویژگی   با موفقیت انجام شد ';
                        this.errorMessage = '';
                        this.isEditing = false;
                        this.defaultAttributes.clear();
                        this.currentStep = 2;
                      } else {
                        this.deleteDefualtAttributes(attributeId);
                        this.fetchProperty();
                        this.showPropertyForm = false;
                        this.isEditing = false;
                        this.firstStepForm.reset();
                      }
                    } else {
                      console.error('Attribute ID not found');
                    }
                  }
                );
                this.showMessages();
              } else {
                this.errorMessage =
                  '.عملیات موفقیت آمیز نبود،لطفا دوباره امتحان کنید';
                this.successMessage = '';
              }
              this.showMessages();
            },

            error: (error) => {
              console.error('Error submitting first step:', error);

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
      const goodsAttributesId = secondFormValue.goodsAttributesId;
      const defaultAttributesArray = secondFormValue.defaultAttributes;
      defaultAttributesArray.forEach((defaultAttribute: any) => {
        const payload = {
          goodsAttributesId: goodsAttributesId,
          defaultattributes: defaultAttribute.defaultattributes,
        };
        this.dataService
          .post('asset/goods-attribute-default-value/', payload)
          .pipe(
            tap({
              next: (response) => {
                if (response.status === 201) {
                  this.showPropertyForm = false;
                  this.secondStepForm.reset();
                  this.currentStep = 1;
                  this.successMessage =
                    '      صفت یا صفات پیشفرض برا ویژگی شما اضافه شد ';
                  this.errorMessage = '';
                  this.showMessages();
                } else {
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
      });
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
    }, 5000);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.propertyDataSource.filter = filterValue.trim().toLowerCase();

    if (this.propertyDataSource.paginator) {
      this.propertyDataSource.paginator.firstPage();
    }
  }
  openMultiStepForm(): void {
    this.showPropertyForm = true;
  }

  closeForm(): void {
    this.showPropertyForm = false;
    this.isEditing = false;
    this.currentStep = 1;
    this.firstStepForm.reset();
    this.secondStepForm.reset();
  }
  // editUser(userData: any): void {
  //   this.isEditing = true;
  //   this.firstStepForm.patchValue({
  //     userpersonalid: userData.userpersonalid,
  //     username: userData.username,
  //     userlastname: userData.userlastname,
  //     userphonenumber: userData.userphonenumber,
  //     userlandlinephonenumber: userData.userlandlinephonenumber,
  //   });

  //   this.showUsersForm = true;
  // }
}
