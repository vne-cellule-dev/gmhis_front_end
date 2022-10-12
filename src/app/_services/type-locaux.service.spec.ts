import { TestBed } from '@angular/core/testing';

import { TypeLocauxService } from './type-locaux.service';

describe('TypeLocauxService', () => {
  let service: TypeLocauxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeLocauxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
