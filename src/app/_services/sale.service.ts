import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ArticleSold } from '../_models/articleSold.model';
import { PageList } from '../_models/page-list.model';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  
  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * get all paginated sale list
   * @param data 
   * @returns PageList
   */
  findAll(data): Observable<PageList> {

    let queryParams = {};

    queryParams = {
      params: new HttpParams()
      .set('depot', data['depot'])
      .set('date', data['date'] ?? "")
      .set('criteria', data['criteria']  ?? "")
      .set('criteriaType', data['criteriaType'] ?? "")
      .set('page', data['page'])
      .set('size', data['size'] ?? "")
      .set('sort', data['sort'])
    };
    return this.http.get<PageList>(`${this.host}/article-sold/list`, queryParams)
  }
/**
 * for print
 * @param data 
 * @returns 
 */
  findAllSimplePage(data): Observable<ArticleSold[]> {

    let queryParams = {};

    queryParams = {
      params: new HttpParams()
      .set('depot', data['depot'])
      .set('criteria', data['criteria']  ?? "")
      .set('criteriaType', data['criteriaType'] ?? "")
    };
    return this.http.get<ArticleSold[]>(`${this.host}/article-sold/list-article-sold`, queryParams)
  }

  /**
   * get all paginated sale list
   * @param data 
   * @returns PageList
   */
   findAllExcess(data): Observable<PageList> {
    let queryParams = {};

    queryParams = {
      params: new HttpParams()
      .set('depot', data['depot'])
      .set('date', data['date'])
      .set('page', data['page'])
      .set('size', data['size'] ?? "")
      .set('sort', data['sort'])
    };
    return this.http.get<PageList>(`${this.host}/article-sold/list-with-invoice-price`, queryParams)
  }

  findAllExcessSimplepage(data): Observable<any[]> {
    let queryParams = {};

    queryParams = {
      params: new HttpParams()
      .set('depot', data['depot'])
      .set('date', data['date'])
    };
    return this.http.get<any[]>(`${this.host}/article-sold/list-with-price`, queryParams)
  }

  getArticleLastPricesList(articleId: String, customerId: number): Observable<ArticleSold[]> {
    return this.http.get<ArticleSold[]>(`${this.host}/article-sold/list-by-customer-and-article/`+articleId+'/'+customerId)
  }
}
