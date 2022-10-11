import { TestBed } from '@angular/core/testing';

import { TechnicianAssService } from './technician-ass.service';

describe('TechnicianAssService', () => {
  let service: TechnicianAssService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechnicianAssService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
