import { TestBed } from '@angular/core/testing';

import { PharmacologicalFormService } from './pharmacological-form.service';

describe('PharmacologicalFormService', () => {
  let service: PharmacologicalFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PharmacologicalFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
