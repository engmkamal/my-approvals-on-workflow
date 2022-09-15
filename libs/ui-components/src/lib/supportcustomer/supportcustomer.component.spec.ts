import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportcustomerComponent } from './supportcustomer.component';

describe('SupportcustomerComponent', () => {
  let component: SupportcustomerComponent;
  let fixture: ComponentFixture<SupportcustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportcustomerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SupportcustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
