import { TestBed } from '@angular/core/testing';

import { ArticleSavService } from './article-sav.service';

describe('ArticleSavService', () => {
  let service: ArticleSavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleSavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
