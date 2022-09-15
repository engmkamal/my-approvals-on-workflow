import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragndresizeableComponent } from './dragndresizeable.component';

describe('DragndresizeableComponent', () => {
  let component: DragndresizeableComponent;
  let fixture: ComponentFixture<DragndresizeableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DragndresizeableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragndresizeableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
