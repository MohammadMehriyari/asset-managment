import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingSupportersComponent } from './building-supporters.component';

describe('BuildingSupportersComponent', () => {
  let component: BuildingSupportersComponent;
  let fixture: ComponentFixture<BuildingSupportersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildingSupportersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuildingSupportersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
