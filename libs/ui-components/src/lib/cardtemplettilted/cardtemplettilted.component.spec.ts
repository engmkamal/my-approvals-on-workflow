import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardtemplettiltedComponent } from './cardtemplettilted.component';

describe('CardtemplettiltedComponent', () => {
  let component: CardtemplettiltedComponent;
  let fixture: ComponentFixture<CardtemplettiltedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardtemplettiltedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardtemplettiltedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
