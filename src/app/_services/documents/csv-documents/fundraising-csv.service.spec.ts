import { TestBed } from '@angular/core/testing';

import { FundraisingCsvService } from './fundraising-csv.service';

describe('FundraisingCsvService', () => {
  let service: FundraisingCsvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FundraisingCsvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
