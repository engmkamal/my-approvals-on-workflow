import { TestBed } from '@angular/core/testing';

import { SharepointlistService } from './sharepointlist.service';

describe('SharepointlistService', () => {
  let service: SharepointlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharepointlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
