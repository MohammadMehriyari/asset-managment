import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPropertyComputerGoodsComponent } from './user-property-computer-goods.component';

describe('UserPropertyComputerGoodsComponent', () => {
  let component: UserPropertyComputerGoodsComponent;
  let fixture: ComponentFixture<UserPropertyComputerGoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPropertyComputerGoodsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserPropertyComputerGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
