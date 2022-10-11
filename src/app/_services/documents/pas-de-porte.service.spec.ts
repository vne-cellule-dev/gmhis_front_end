import { TestBed } from '@angular/core/testing';

import { PasDePorteService } from './pas-de-porte.service';

describe('PasDePorteService', () => {
  let service: PasDePorteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasDePorteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
