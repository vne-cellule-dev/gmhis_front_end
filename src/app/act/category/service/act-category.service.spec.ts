import { TestBed } from '@angular/core/testing';

import { ActCategoryService } from './act-category.service';

describe('ActCategoryService', () => {
  let service: ActCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
