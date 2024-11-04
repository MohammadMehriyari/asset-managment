import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcUserComponent } from './pc-user.component';

describe('PcUserComponent', () => {
  let component: PcUserComponent;
  let fixture: ComponentFixture<PcUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PcUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PcUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
