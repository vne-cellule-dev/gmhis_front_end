import { TestBed } from '@angular/core/testing';

import { PackingListDocumentService } from './packing-list-document.service';

describe('PackingListDocumentService', () => {
  let service: PackingListDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackingListDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
