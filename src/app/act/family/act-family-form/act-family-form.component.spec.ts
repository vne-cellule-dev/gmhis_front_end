import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActFamilyFormComponent } from './act-family-form.component';

describe('ActFamilyFormComponent', () => {
  let component: ActFamilyFormComponent;
  let fixture: ComponentFixture<ActFamilyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActFamilyFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActFamilyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
