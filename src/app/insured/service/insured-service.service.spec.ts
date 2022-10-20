import { TestBed } from '@angular/core/testing';

import { InsuredServiceService } from './insured-service.service';

describe('InsuredServiceService', () => {
  let service: InsuredServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsuredServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
