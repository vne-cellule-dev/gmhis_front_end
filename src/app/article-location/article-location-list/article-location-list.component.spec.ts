import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleLocationListComponent } from './article-location-list.component';

describe('ArticleLocationListComponent', () => {
  let component: ArticleLocationListComponent;
  let fixture: ComponentFixture<ArticleLocationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleLocationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleLocationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
