import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SealComponent } from './seal.component';

describe('SealComponent', () => {
  let component: SealComponent;
  let fixture: ComponentFixture<SealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SealComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
