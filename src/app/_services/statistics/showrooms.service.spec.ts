import { TestBed } from '@angular/core/testing';

import { ShowroomsService } from './showrooms.service';

describe('ShowroomsService', () => {
  let service: ShowroomsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowroomsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
