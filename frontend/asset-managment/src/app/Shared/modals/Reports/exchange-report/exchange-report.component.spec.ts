import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeReportComponent } from './exchange-report.component';

describe('ExchangeReportComponent', () => {
  let component: ExchangeReportComponent;
  let fixture: ComponentFixture<ExchangeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExchangeReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExchangeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
