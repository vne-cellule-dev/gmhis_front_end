import { TestBed } from '@angular/core/testing';

import { DeviceOutputService } from './device-output.service';

describe('DeviceOutputService', () => {
  let service: DeviceOutputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceOutputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
