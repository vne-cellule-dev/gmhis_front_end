import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacologicalFormComponent } from './pharmacological-form.component';

describe('PharmacologicalFormComponent', () => {
  let component: PharmacologicalFormComponent;
  let fixture: ComponentFixture<PharmacologicalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacologicalFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacologicalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
