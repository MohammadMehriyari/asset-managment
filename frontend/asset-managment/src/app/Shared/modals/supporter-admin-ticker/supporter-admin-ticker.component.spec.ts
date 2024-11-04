import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupporterAdminTickerComponent } from './supporter-admin-ticker.component';

describe('SupporterAdminTickerComponent', () => {
  let component: SupporterAdminTickerComponent;
  let fixture: ComponentFixture<SupporterAdminTickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupporterAdminTickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupporterAdminTickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
