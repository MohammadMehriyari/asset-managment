import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpVersionComponent } from './op-version.component';

describe('OpVersionComponent', () => {
  let component: OpVersionComponent;
  let fixture: ComponentFixture<OpVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpVersionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
