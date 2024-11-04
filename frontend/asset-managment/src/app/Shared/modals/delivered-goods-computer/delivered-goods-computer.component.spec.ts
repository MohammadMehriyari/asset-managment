import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveredGoodsComputerComponent } from './delivered-goods-computer.component';

describe('DeliveredGoodsComputerComponent', () => {
  let component: DeliveredGoodsComputerComponent;
  let fixture: ComponentFixture<DeliveredGoodsComputerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveredGoodsComputerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeliveredGoodsComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
