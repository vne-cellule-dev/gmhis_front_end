import { TestBed } from '@angular/core/testing';

import { FundraisingPurchaseService } from './fundraising-purchase.service';

describe('FundraisingPurchaseService', () => {
  let service: FundraisingPurchaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FundraisingPurchaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
