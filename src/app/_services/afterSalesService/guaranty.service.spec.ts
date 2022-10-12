import { TestBed } from '@angular/core/testing';

import { GuarantyService } from './guaranty.service';

describe('GuarantyService', () => {
  let service: GuarantyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuarantyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
