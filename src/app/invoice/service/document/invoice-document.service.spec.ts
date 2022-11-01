import { TestBed } from '@angular/core/testing';

import { InvoiceDocumentService } from './invoice-document.service';

describe('InvoiceDocumentService', () => {
  let service: InvoiceDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
