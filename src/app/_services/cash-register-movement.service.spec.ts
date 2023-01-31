import { TestBed } from '@angular/core/testing';

import { CashRegisterMovementService } from './cash-register-movement.service';

describe('CashRegisterMovementService', () => {
  let service: CashRegisterMovementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashRegisterMovementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
