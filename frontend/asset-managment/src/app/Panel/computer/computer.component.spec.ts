import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerComponent } from './computer.component';

describe('ComputerComponent', () => {
  let component: ComputerComponent;
  let fixture: ComponentFixture<ComputerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComputerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
