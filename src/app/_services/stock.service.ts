import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article } from '../_models/article.model';
import { PageList } from '../_models/page-list.model';
import { Stock } from '../_models/stock.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
  * get all paginated Article
  * @param data 
  * @returns PageList
  */
  findAll(data): Observable<PageList> {

    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('criteria', data['criteria'] ?? "")
        .set('criteriaType', data['criteriaType'])
        .set('date', data['date'] ?? "")
        .set('depot', data['depot'])
        .set('page', data['page'])
        .set('size', data['size'] ?? "")
        .set('sort', data['sort'])
    };
    return this.http.get<PageList>(`${this.host}/stock/list`, queryParams)
  }

  findArticleCatalogueStockState(DepotId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.host}/article/catalogue-stock-state/${DepotId}`)
  }


  findAllList(): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.host}/stock/simple-list`)
  }

  /**
   * 
   * @param article 
   * @returns 
   */
  findQuantiesByArticle(article: number): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.host}/stock/find-by-article/${article}`)
  }

  /**
   * 
   * @param DepotId 
   * @returns 
   */
  findQuantiesByDepotId(DepotId: number): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.host}/stock/find-by-depot/${DepotId}`)
  }

  /**
   * 
   * @returns 
   */
  getStockPurchaseValue(data): Observable<any> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('depot', data['depot'])
        .set('page', data['page'])
        .set('size', data['size'] ?? "")
        .set('sort', data['sort'])
    };
    return this.http.get<any>(`${this.host}/stock/purchase-value`, queryParams)
  }

  /**
   * 
   * @returns 
   */
  getStockSaleValue(data): Observable<any> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('depot', data['depot'])
        .set('page', data['page'])
        .set('size', data['size'] ?? "")
        .set('sort', data['sort'])
    };
    return this.http.get<any>(`${this.host}/stock/sale-value`, queryParams)
  }

  /**
    * get stock details by Id
    * @param stockId 
    * @returns 
    */
  getStockDetails(stockId: number): Observable<Stock> {
    return this.http.get<Stock>(`${this.host}/stock/get-detail/` + stockId)
  }

  stockUpdate(stockId: number): Observable<Stock> {
    return this.http.get<Stock>(`${this.host}/stock/update/` + stockId)
  }

  getNumberOfarticleSoleByArticle(data): Observable<Number> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('date', data['date'])
        .set('reference', data['reference'])
    };
    return this.http.get<Number>(`${this.host}/stock/number-of-article-sold`, queryParams)
  }

  getIdleStock(data?: any): Observable<PageList> {

    let queryParams = {};

    queryParams = {
      params: new HttpParams()
        .set('depot', data['depot'] ?? '')
        .set('reference', data['reference'] ?? '')
        .set('subfamily', data['subfamily'] ?? '')
        .set('size', data['size'] ?? "")
        .set('sort', data['sort'])
        .set('page', data['page'])
    };
    return this.http.get<PageList>(`${this.host}/stock/dormant-stock`, queryParams);
  }

  getIdleStockTotalArticleNumber(): Observable<number> {
    return this.http.get<number>(`${this.host}/stock/list-dormant-stock-number`);
  }

  UpdateIdleStock(data): Observable<Article> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('articleId', data['articleId'])
        .set('deadlineDormantStock', data['deadlineDormantStock'])
    };
    return this.http.get<Article>(`${this.host}/stock/update-dormant-stock`, queryParams)
  }
}
