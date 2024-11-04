import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComputerDetailComponent } from './users-computer-detail.component';

describe('UsersComputerDetailComponent', () => {
  let component: UsersComputerDetailComponent;
  let fixture: ComponentFixture<UsersComputerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersComputerDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersComputerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
