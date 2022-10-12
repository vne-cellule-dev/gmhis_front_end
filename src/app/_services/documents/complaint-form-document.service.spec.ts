import { TestBed } from '@angular/core/testing';

import { ComplaintFormDocumentService } from './complaint-form-document.service';

describe('ComplaintFormDocumentService', () => {
  let service: ComplaintFormDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComplaintFormDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
