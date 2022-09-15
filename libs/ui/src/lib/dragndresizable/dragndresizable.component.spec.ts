import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragndresizableComponent } from './dragndresizable.component';

describe('DragndresizableComponent', () => {
  let component: DragndresizableComponent;
  let fixture: ComponentFixture<DragndresizableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DragndresizableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DragndresizableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
