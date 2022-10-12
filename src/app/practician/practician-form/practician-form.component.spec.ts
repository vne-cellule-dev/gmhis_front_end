import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticianFormComponent } from './practician-form.component';

describe('PracticianFormComponent', () => {
  let component: PracticianFormComponent;
  let fixture: ComponentFixture<PracticianFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticianFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticianFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
