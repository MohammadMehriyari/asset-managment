import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SealPcComponent } from './seal-pc.component';

describe('SealPcComponent', () => {
  let component: SealPcComponent;
  let fixture: ComponentFixture<SealPcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SealPcComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SealPcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
