import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientFolderComponent } from './patient-folder.component';

describe('PatientFolderComponent', () => {
  let component: PatientFolderComponent;
  let fixture: ComponentFixture<PatientFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientFolderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
