import { TestBed } from '@angular/core/testing';

import { ArticleSavDocumemtService } from './article-sav-documemt.service';

describe('ArticleSavDocumemtService', () => {
  let service: ArticleSavDocumemtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleSavDocumemtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
