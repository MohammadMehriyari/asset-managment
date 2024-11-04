import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveredGoodsUserComponent } from './delivered-goods-user.component';

describe('DeliveredGoodsUserComponent', () => {
  let component: DeliveredGoodsUserComponent;
  let fixture: ComponentFixture<DeliveredGoodsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveredGoodsUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeliveredGoodsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
