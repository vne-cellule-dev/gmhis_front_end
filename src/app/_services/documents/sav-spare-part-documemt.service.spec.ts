import { TestBed } from '@angular/core/testing';

import { SavSparePartDocumemtService } from './sav-spare-part-documemt.service';

describe('SavSparePartDocumemtService', () => {
  let service: SavSparePartDocumemtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavSparePartDocumemtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
