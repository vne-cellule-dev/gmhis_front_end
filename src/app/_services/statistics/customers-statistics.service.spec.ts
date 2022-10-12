import { TestBed } from '@angular/core/testing';

import { CustomersStatisticsService } from './customers-statistics.service';

describe('CustomersStatisticsService', () => {
  let service: CustomersStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomersStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
