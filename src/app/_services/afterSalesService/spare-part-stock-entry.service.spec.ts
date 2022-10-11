import { TestBed } from '@angular/core/testing';

import { SparePartStockEntryService } from './spare-part-stock-entry.service';

describe('SparePartStockEntryService', () => {
  let service: SparePartStockEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SparePartStockEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
