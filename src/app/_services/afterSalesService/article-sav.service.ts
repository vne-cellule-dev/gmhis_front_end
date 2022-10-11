import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleSav } from 'src/app/_models/articleSav.model';
import { PageList } from 'src/app/_models/page-list.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleSavService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * get after sale service article
   * @param data 
   * @returns 
   */
  getArticles(data : any):Observable<PageList> {
    let queryParams : {};
    queryParams = {
      params : new HttpParams()
      .set('name', data['name'] ?? "")
      .set('reference', data['reference'] ?? "")
      .set('state', data['state'] ?? "")
      .set('page', data['page'] ?? "")
      .set('size', data['size'] ?? "")
      .set('sort', data['sort'] ?? "")
    };
  return this.http.get<PageList>(`${this.host}/article-sav/list`, queryParams)
  }
  /**
   * add new articcle ASS
   * @param article 
   * @returns 
   */
  saveArticle(article : ArticleSav):Observable<ArticleSav>{
    return this.http.post<ArticleSav>(`${this.host}/article-sav/add`, article)
  }

/**
 * updated exiting article
 * @param article 
 * @returns 
 */
  updateArticle(article : ArticleSav):Observable<ArticleSav>{
    return this.http.put<ArticleSav>(`${this.host}/article-sav/update/${article.id}`, article)
  }
/**
 * get existing article details
 * @param article 
 * @returns 
 */
  getArticleDetails(article : number):Observable<ArticleSav>{
    return this.http.get<ArticleSav>(`${this.host}/article-sav/get-details/${article}`)
  }

  getAllArticle():Observable<ArticleSav[]>{
    return this.http.get<ArticleSav[]>(`${this.host}/article-sav/list-all`)
  }

  getAllArticleForPrint():Observable<ArticleSav[]>{
    return this.http.get<ArticleSav[]>(`${this.host}/article-sav/article-sav-list`)
  }
}
