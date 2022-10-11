import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleSupplierListComponent } from './article-supplier-list.component';

describe('ArticleSupplierListComponent', () => {
  let component: ArticleSupplierListComponent;
  let fixture: ComponentFixture<ArticleSupplierListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleSupplierListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleSupplierListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
