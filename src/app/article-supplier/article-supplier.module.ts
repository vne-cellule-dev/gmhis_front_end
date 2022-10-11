import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleSupplierRoutingModule } from './article-supplier-routing.module';
import { ArticleSupplierListComponent } from './article-supplier-list/article-supplier-list.component';
import { ArticleSupplierFormComponent } from './article-supplier-form/article-supplier-form.component';


@NgModule({
  declarations: [ArticleSupplierListComponent, ArticleSupplierFormComponent],
  imports: [
    CommonModule,
    ArticleSupplierRoutingModule
  ]
})
export class ArticleSupplierModule { }
