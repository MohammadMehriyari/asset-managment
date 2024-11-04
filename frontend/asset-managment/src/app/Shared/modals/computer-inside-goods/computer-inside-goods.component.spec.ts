import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerInsideGoodsComponent } from './computer-inside-goods.component';

describe('ComputerInsideGoodsComponent', () => {
  let component: ComputerInsideGoodsComponent;
  let fixture: ComponentFixture<ComputerInsideGoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComputerInsideGoodsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComputerInsideGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
