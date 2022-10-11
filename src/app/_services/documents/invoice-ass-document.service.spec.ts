import { TestBed } from '@angular/core/testing';

import { InvoiceAssDocumentService } from './invoice-ass-document.service';

describe('InvoiceAssDocumentService', () => {
  let service: InvoiceAssDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceAssDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
