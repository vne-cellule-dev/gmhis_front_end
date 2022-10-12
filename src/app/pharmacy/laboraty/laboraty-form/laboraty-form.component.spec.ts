import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratyFormComponent } from './laboraty-form.component';

describe('LaboratyFormComponent', () => {
  let component: LaboratyFormComponent;
  let fixture: ComponentFixture<LaboratyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratyFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
