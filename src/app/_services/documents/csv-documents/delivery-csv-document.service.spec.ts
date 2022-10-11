import { TestBed } from '@angular/core/testing';

import { DeliveryCsvDocumentService } from './delivery-csv-document.service';

describe('DeliveryCsvDocumentService', () => {
  let service: DeliveryCsvDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryCsvDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
