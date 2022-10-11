import { TestBed } from '@angular/core/testing';

import { FailureTypeService } from './failure-type.service';

describe('FailureTypeService', () => {
  let service: FailureTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FailureTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
