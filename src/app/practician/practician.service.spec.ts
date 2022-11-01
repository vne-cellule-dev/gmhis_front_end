import { TestBed } from '@angular/core/testing';

import { PracticianService } from './practician.service';

describe('PracticianService', () => {
  let service: PracticianService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PracticianService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
