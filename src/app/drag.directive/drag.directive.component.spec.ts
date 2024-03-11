import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDirectiveComponent } from './drag.directive.component';

describe('DragDirectiveComponent', () => {
  let component: DragDirectiveComponent;
  let fixture: ComponentFixture<DragDirectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DragDirectiveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DragDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
