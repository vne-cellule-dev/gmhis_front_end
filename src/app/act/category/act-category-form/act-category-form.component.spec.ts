import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActCategoryFormComponent } from './act-category-form.component';

describe('ActCategoryFormComponent', () => {
  let component: ActCategoryFormComponent;
  let fixture: ComponentFixture<ActCategoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActCategoryFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
