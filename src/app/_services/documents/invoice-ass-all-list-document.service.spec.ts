import { TestBed } from '@angular/core/testing';

import { InvoiceAssAllListDocumentService } from './invoice-ass-all-list-document.service';

describe('InvoiceAssAllListDocumentService', () => {
  let service: InvoiceAssAllListDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceAssAllListDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
