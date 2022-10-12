import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleLocationFormComponent } from './article-location-form.component';

describe('ArticleLocationFormComponent', () => {
  let component: ArticleLocationFormComponent;
  let fixture: ComponentFixture<ArticleLocationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleLocationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleLocationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
