import { TestBed } from '@angular/core/testing';

import { ComplaintPlanningService } from './complaint-planning.service';

describe('ComplaintPlanningService', () => {
  let service: ComplaintPlanningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComplaintPlanningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
