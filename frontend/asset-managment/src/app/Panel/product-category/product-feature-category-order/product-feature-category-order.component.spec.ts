import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFeatureCategoryOrderComponent } from './product-feature-category-order.component';

describe('ProductFeatureCategoryOrderComponent', () => {
  let component: ProductFeatureCategoryOrderComponent;
  let fixture: ComponentFixture<ProductFeatureCategoryOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFeatureCategoryOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductFeatureCategoryOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
