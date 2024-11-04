import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairReportComponent } from './repair-report.component';

describe('RepairReportComponent', () => {
  let component: RepairReportComponent;
  let fixture: ComponentFixture<RepairReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepairReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RepairReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
