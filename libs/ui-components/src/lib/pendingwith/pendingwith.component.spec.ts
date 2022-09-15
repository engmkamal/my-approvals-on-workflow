import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingwithComponent } from './pendingwith.component';

describe('PendingwithComponent', () => {
  let component: PendingwithComponent;
  let fixture: ComponentFixture<PendingwithComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingwithComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PendingwithComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
