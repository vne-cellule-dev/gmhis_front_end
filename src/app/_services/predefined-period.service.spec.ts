import { TestBed } from '@angular/core/testing';

import { PredefinedPeriodService } from './predefined-period.service';

describe('PredefinedPeriodService', () => {
  let service: PredefinedPeriodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PredefinedPeriodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
