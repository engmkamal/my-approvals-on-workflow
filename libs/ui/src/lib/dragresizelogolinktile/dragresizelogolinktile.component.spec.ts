import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragresizelogolinktileComponent } from './dragresizelogolinktile.component';

describe('DragresizelogolinktileComponent', () => {
  let component: DragresizelogolinktileComponent;
  let fixture: ComponentFixture<DragresizelogolinktileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DragresizelogolinktileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DragresizelogolinktileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
