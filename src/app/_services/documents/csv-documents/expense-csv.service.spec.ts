import { TestBed } from '@angular/core/testing';

import { ExpenseCsvService } from './expense-csv.service';

describe('ExpenseCsvService', () => {
  let service: ExpenseCsvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpenseCsvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
