import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItservicehomeComponent } from './itservicehome.component';

describe('ItservicehomeComponent', () => {
  let component: ItservicehomeComponent;
  let fixture: ComponentFixture<ItservicehomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItservicehomeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItservicehomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
