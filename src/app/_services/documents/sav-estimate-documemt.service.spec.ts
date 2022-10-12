import { TestBed } from '@angular/core/testing';

import { SavEstimateDocumemtService } from './sav-estimate-documemt.service';

describe('SavEstimateDocumemtService', () => {
  let service: SavEstimateDocumemtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavEstimateDocumemtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
