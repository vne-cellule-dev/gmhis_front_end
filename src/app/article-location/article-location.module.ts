import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleLocationRoutingModule } from './article-location-routing.module';
import { ArticleLocationFormComponent } from './article-location-form/article-location-form.component';
import { ArticleLocationListComponent } from './article-location-list/article-location-list.component';


@NgModule({
  declarations: [ArticleLocationFormComponent, ArticleLocationListComponent],
  imports: [
    CommonModule,
    ArticleLocationRoutingModule
  ]
})
export class ArticleLocationModule { }
