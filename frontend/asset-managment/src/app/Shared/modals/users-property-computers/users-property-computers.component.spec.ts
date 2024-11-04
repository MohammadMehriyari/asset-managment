import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersPropertyComputersComponent } from './users-property-computers.component';

describe('UsersPropertyComputersComponent', () => {
  let component: UsersPropertyComputersComponent;
  let fixture: ComponentFixture<UsersPropertyComputersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersPropertyComputersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersPropertyComputersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
