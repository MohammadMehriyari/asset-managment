import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpSystemComponent } from './op-system.component';

describe('OpSystemComponent', () => {
  let component: OpSystemComponent;
  let fixture: ComponentFixture<OpSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpSystemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
