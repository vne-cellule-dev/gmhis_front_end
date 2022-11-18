import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewExaminationComponent } from './new-examination.component';

describe('NewExaminationComponent', () => {
  let component: NewExaminationComponent;
  let fixture: ComponentFixture<NewExaminationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewExaminationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
