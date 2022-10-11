import { TestBed } from '@angular/core/testing';

import { SalesDeliveryPaymentService } from './sales-delivery-payment.service';

describe('SalesDeliveryPaymentService', () => {
  let service: SalesDeliveryPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesDeliveryPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
