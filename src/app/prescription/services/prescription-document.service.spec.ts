import { TestBed } from '@angular/core/testing';

import { PrescriptionDocumentService } from './prescription-document.service';

describe('PrescriptionDocumentService', () => {
  let service: PrescriptionDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrescriptionDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
