import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActFormComponent } from './act-form.component';

describe('ActFormComponent', () => {
  let component: ActFormComponent;
  let fixture: ComponentFixture<ActFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
