import { TestBed } from '@angular/core/testing';

import { TransferredArticleDocumentService } from './transferred-article-document.service';

describe('TransferredArticleDocumentService', () => {
  let service: TransferredArticleDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferredArticleDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
