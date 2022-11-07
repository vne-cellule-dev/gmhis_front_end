import { TestBed } from '@angular/core/testing';

import { PatientConstantService } from './patient-constant.service';

describe('PatientConstantService', () => {
  let service: PatientConstantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientConstantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
