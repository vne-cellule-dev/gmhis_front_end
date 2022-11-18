import { TestBed } from '@angular/core/testing';

import { FaciityServiceService } from './faciity-service.service';

describe('FaciityServiceService', () => {
  let service: FaciityServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FaciityServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
