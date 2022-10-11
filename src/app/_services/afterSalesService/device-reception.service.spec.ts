import { TestBed } from '@angular/core/testing';

import { DeviceReceptionService } from './device-reception.service';

describe('DeviceReceptionService', () => {
  let service: DeviceReceptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceReceptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
