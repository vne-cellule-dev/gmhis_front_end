import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientFormmComponent } from './patient-formm.component';

describe('PatientFormmComponent', () => {
  let component: PatientFormmComponent;
  let fixture: ComponentFixture<PatientFormmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientFormmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientFormmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
