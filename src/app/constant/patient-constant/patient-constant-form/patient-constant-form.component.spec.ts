import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientConstantFormComponent } from './patient-constant-form.component';

describe('PatientConstantFormComponent', () => {
  let component: PatientConstantFormComponent;
  let fixture: ComponentFixture<PatientConstantFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientConstantFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientConstantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
