import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveredGoodsDetailComponent } from './delivered-goods-detail.component';

describe('DeliveredGoodsDetailComponent', () => {
  let component: DeliveredGoodsDetailComponent;
  let fixture: ComponentFixture<DeliveredGoodsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveredGoodsDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeliveredGoodsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
