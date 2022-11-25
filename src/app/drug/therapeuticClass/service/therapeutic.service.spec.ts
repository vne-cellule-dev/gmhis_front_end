import { TestBed } from '@angular/core/testing';

import { TherapeuticService } from './therapeutic.service';

describe('TherapeuticService', () => {
  let service: TherapeuticService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TherapeuticService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
