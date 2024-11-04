import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersTicketsComponent } from './users-tickets.component';

describe('UsersTicketsComponent', () => {
  let component: UsersTicketsComponent;
  let fixture: ComponentFixture<UsersTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersTicketsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
