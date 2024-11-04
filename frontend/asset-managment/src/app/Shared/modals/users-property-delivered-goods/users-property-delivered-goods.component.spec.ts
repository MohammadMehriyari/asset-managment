import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersPropertyDeliveredGoodsComponent } from './users-property-delivered-goods.component';

describe('UsersPropertyDeliveredGoodsComponent', () => {
  let component: UsersPropertyDeliveredGoodsComponent;
  let fixture: ComponentFixture<UsersPropertyDeliveredGoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersPropertyDeliveredGoodsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersPropertyDeliveredGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
