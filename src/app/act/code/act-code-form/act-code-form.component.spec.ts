import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActCodeFormComponent } from './act-code-form.component';

describe('ActCodeFormComponent', () => {
  let component: ActCodeFormComponent;
  let fixture: ComponentFixture<ActCodeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActCodeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActCodeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
