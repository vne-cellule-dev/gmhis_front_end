import { TestBed } from '@angular/core/testing';

import { CautionService } from './caution.service';

describe('CautionService', () => {
  let service: CautionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CautionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
