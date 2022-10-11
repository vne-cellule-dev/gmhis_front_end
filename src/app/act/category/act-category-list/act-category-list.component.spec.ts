import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActCategoryListComponent } from './act-category-list.component';

describe('ActCategoryListComponent', () => {
  let component: ActCategoryListComponent;
  let fixture: ComponentFixture<ActCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActCategoryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
