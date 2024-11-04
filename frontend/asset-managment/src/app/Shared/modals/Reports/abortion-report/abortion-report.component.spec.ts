import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbortionReportComponent } from './abortion-report.component';

describe('AbortionReportComponent', () => {
  let component: AbortionReportComponent;
  let fixture: ComponentFixture<AbortionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbortionReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbortionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
