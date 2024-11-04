import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersPcComponent } from './users-pc.component';

describe('UsersPcComponent', () => {
  let component: UsersPcComponent;
  let fixture: ComponentFixture<UsersPcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersPcComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersPcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
