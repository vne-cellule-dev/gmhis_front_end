import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathologyFormComponent } from './pathology-form.component';

describe('PathologyFormComponent', () => {
  let component: PathologyFormComponent;
  let fixture: ComponentFixture<PathologyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PathologyFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PathologyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
