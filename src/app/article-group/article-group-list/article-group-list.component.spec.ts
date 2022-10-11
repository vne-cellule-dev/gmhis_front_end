import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleGroupListComponent } from './article-group-list.component';

describe('ArticleGroupListComponent', () => {
  let component: ArticleGroupListComponent;
  let fixture: ComponentFixture<ArticleGroupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleGroupListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
