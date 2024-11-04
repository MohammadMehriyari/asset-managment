import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveredProductComponent } from './delivered-product.component';

describe('DeliveredProductComponent', () => {
  let component: DeliveredProductComponent;
  let fixture: ComponentFixture<DeliveredProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveredProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeliveredProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
