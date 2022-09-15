import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentprimenghomeComponent } from './attachmentprimenghome.component';

describe('AttachmentprimenghomeComponent', () => {
  let component: AttachmentprimenghomeComponent;
  let fixture: ComponentFixture<AttachmentprimenghomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttachmentprimenghomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentprimenghomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
