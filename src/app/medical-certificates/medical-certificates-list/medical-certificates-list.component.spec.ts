import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalCertificatesListComponent } from './medical-certificates-list.component';

describe('MedicalCertificatesListComponent', () => {
  let component: MedicalCertificatesListComponent;
  let fixture: ComponentFixture<MedicalCertificatesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalCertificatesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalCertificatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
