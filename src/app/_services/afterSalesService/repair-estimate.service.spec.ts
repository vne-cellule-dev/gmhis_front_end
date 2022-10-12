import { TestBed } from '@angular/core/testing';

import { RepairEstimateService } from './repair-estimate.service';

describe('RepairEstimateService', () => {
  let service: RepairEstimateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepairEstimateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
