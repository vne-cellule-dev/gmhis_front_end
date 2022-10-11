import { TestBed } from '@angular/core/testing';

import { ReleaseDocService } from './release-doc.service';

describe('ReleaseDocService', () => {
  let service: ReleaseDocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReleaseDocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
