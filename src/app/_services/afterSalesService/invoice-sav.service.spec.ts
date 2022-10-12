import { TestBed } from '@angular/core/testing';

import { InvoiceSavService } from './invoice-sav.service';

describe('InvoiceSavService', () => {
  let service: InvoiceSavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceSavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
