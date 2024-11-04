import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnTicketsComponent } from './own-tickets.component';

describe('OwnTicketsComponent', () => {
  let component: OwnTicketsComponent;
  let fixture: ComponentFixture<OwnTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnTicketsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
