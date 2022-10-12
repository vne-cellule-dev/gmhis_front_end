import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleGroupRoutingModule } from './article-group-routing.module';
import { ArticleGroupListComponent } from './article-group-list/article-group-list.component';
import { ArticleGroupFormComponent } from './article-group-form/article-group-form.component';


@NgModule({
  declarations: [ArticleGroupListComponent, ArticleGroupFormComponent],
  imports: [
    CommonModule,
    ArticleGroupRoutingModule
  ]
})
export class ArticleGroupModule { }
