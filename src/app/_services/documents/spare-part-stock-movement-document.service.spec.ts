import { TestBed } from '@angular/core/testing';

import { SparePartStockMovementDocumentService } from './spare-part-stock-movement-document.service';

describe('SparePartStockMovementDocumentService', () => {
  let service: SparePartStockMovementDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SparePartStockMovementDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
