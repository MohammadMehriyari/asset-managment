import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComputerDeliverygoodsDetailComponent } from './users-computer-deliverygoods-detail.component';

describe('UsersComputerDeliverygoodsDetailComponent', () => {
  let component: UsersComputerDeliverygoodsDetailComponent;
  let fixture: ComponentFixture<UsersComputerDeliverygoodsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersComputerDeliverygoodsDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersComputerDeliverygoodsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
