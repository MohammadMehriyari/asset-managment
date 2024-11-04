import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerDetailComponent } from './computer-detail.component';

describe('ComputerDetailComponent', () => {
  let component: ComputerDetailComponent;
  let fixture: ComponentFixture<ComputerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComputerDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComputerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
