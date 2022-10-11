import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleGroupFormComponent } from './article-group-form.component';

describe('ArticleGroupFormComponent', () => {
  let component: ArticleGroupFormComponent;
  let fixture: ComponentFixture<ArticleGroupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleGroupFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
