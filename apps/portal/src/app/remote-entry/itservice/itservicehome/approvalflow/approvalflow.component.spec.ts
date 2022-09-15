import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalflowComponent } from './approvalflow.component';

describe('ApprovalflowComponent', () => {
  let component: ApprovalflowComponent;
  let fixture: ComponentFixture<ApprovalflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApprovalflowComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
