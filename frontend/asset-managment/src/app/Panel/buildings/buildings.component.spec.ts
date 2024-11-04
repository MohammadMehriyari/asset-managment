import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingsComponent } from './buildings.component';

describe('BuildingsComponent', () => {
  let component: BuildingsComponent;
  let fixture: ComponentFixture<BuildingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuildingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
