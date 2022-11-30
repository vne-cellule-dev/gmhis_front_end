import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryExamenComponent } from './laboratory-examen.component';

describe('LaboratoryExamenComponent', () => {
  let component: LaboratoryExamenComponent;
  let fixture: ComponentFixture<LaboratoryExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratoryExamenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoryExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
