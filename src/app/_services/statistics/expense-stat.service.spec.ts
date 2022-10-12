import { TestBed } from '@angular/core/testing';

import { ExpenseStatService } from './expense-stat.service';

describe('ExpenseStatService', () => {
  let service: ExpenseStatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpenseStatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
