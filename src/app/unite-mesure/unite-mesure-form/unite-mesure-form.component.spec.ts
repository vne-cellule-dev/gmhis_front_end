import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniteMesureFormComponent } from './unite-mesure-form.component';

describe('UniteMesureFormComponent', () => {
  let component: UniteMesureFormComponent;
  let fixture: ComponentFixture<UniteMesureFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniteMesureFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UniteMesureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
