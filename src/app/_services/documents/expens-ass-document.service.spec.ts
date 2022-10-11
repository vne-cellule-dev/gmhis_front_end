import { TestBed } from '@angular/core/testing';

import { ExpensAssDocumentService } from './expens-ass-document.service';

describe('ExpensAssDocumentService', () => {
  let service: ExpensAssDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpensAssDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
