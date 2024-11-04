import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultAttributesDialogComponent } from './default-attributes-dialog.component';

describe('DefaultAttributesDialogComponent', () => {
  let component: DefaultAttributesDialogComponent;
  let fixture: ComponentFixture<DefaultAttributesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultAttributesDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefaultAttributesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
