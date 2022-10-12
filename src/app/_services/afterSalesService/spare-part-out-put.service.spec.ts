import { TestBed } from '@angular/core/testing';

import { SparePartOutPutService } from './spare-part-out-put.service';

describe('SparePartOutPutService', () => {
  let service: SparePartOutPutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SparePartOutPutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
