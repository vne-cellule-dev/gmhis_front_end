import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntecedentFamilyFormComponent } from './antecedent-family-form.component';

describe('AntecedentFamilyFormComponent', () => {
  let component: AntecedentFamilyFormComponent;
  let fixture: ComponentFixture<AntecedentFamilyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AntecedentFamilyFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AntecedentFamilyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
