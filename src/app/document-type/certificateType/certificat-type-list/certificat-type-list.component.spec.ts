import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatTypeListComponent } from './certificat-type-list.component';

describe('CertificatTypeListComponent', () => {
  let component: CertificatTypeListComponent;
  let fixture: ComponentFixture<CertificatTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificatTypeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificatTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
