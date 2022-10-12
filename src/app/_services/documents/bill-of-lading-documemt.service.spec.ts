import { TestBed } from '@angular/core/testing';

import { BillOfLadingDocumemtService } from './bill-of-lading-documemt.service';

describe('BillOfLadingDocumemtService', () => {
  let service: BillOfLadingDocumemtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillOfLadingDocumemtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
