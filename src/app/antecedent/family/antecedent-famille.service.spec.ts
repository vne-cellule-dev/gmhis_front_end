import { TestBed } from '@angular/core/testing';

import { AntecedentFamilleService } from './antecedent-famille.service';

describe('AntecedentFamilleService', () => {
  let service: AntecedentFamilleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AntecedentFamilleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
