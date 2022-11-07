import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientConstantComponent } from './patient-constant.component';

describe('PatientConstantComponent', () => {
  let component: PatientConstantComponent;
  let fixture: ComponentFixture<PatientConstantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientConstantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientConstantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
