import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersDeliveredProductComponent } from './users-delivered-product.component';

describe('UsersDeliveredProductComponent', () => {
  let component: UsersDeliveredProductComponent;
  let fixture: ComponentFixture<UsersDeliveredProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersDeliveredProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersDeliveredProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
