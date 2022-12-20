import { TestBed } from '@angular/core/testing';

import { AnalysisBulletinDocService } from './analysis-bulletin-doc.service';

describe('AnalysisBulletinDocService', () => {
  let service: AnalysisBulletinDocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalysisBulletinDocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
