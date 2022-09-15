import { TestBed } from '@angular/core/testing';

import { SplistcrudService } from './splistcrud.service';

describe('SplistcrudService', () => {
  let service: SplistcrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SplistcrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
