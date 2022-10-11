import { TestBed } from '@angular/core/testing';

import { CashregisterPointCsvService } from './cashregister-point-csv.service';

describe('CashregisterPointCsvService', () => {
  let service: CashregisterPointCsvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashregisterPointCsvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
