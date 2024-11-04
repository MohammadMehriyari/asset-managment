import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallReportComponent } from './install-report.component';

describe('InstallReportComponent', () => {
  let component: InstallReportComponent;
  let fixture: ComponentFixture<InstallReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstallReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstallReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
