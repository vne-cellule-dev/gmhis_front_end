import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatTypeFormComponent } from './certificat-type-form.component';

describe('CertificatTypeFormComponent', () => {
  let component: CertificatTypeFormComponent;
  let fixture: ComponentFixture<CertificatTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificatTypeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificatTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
