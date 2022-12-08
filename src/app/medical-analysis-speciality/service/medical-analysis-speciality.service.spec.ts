import { TestBed } from '@angular/core/testing';

import { MedicalAnalysisSpecialityService } from './medical-analysis-speciality.service';

describe('MedicalAnalysisSpecialityService', () => {
  let service: MedicalAnalysisSpecialityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicalAnalysisSpecialityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
