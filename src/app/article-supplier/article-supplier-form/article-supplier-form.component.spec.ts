import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleSupplierFormComponent } from './article-supplier-form.component';

describe('ArticleSupplierFormComponent', () => {
  let component: ArticleSupplierFormComponent;
  let fixture: ComponentFixture<ArticleSupplierFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleSupplierFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleSupplierFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
