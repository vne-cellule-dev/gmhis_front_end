import { TestBed } from '@angular/core/testing';

import { ConstantTypeService } from './constant-type.service';

describe('ConstantTypeService', () => {
  let service: ConstantTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConstantTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
