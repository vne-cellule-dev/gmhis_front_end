import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  
  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * list sales by item and month for a given year
   * @param data 
   * @returns 
   */
  findAllDeliveryBymonth(data): Observable<any> {

    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('year', data['year'])
        .set('reference', data['reference'])
    };

    return this.http.get<any>(`${this.host}/stat/list-delivery`, queryParams)
  }

  /**
   * list the best sales in terms of margin by year 
   * @param data 
   * @returns 
   */
  findbestSaleMarginByYear(data): Observable<any> {

    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('year', data['year'])
        .set('articleNumber', data['articleNumber'])
    };
    return this.http.get<any>(`${this.host}/stat/list-best-sale-margin`, queryParams)
  }
/**
 * list the best sales in terms of margin by year and month
 * @param data 
 * @returns 
 */
  findbestSaleMarginByYearAndMonth(data): Observable<any> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('year', data['year'])
        .set('month', data['month'])
        .set('articleNumber', data['articleNumber'])
    };
    return this.http.get<any>(`${this.host}/stat/list-best-sale-margin-month`, queryParams)
  }

  /**
   * list the best sales in terms of quantity by year
   * @param data 
   * @returns 
   */
  findbestSaleQtyByYear(data): Observable<any> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('yearStart', data['yearStart'])
        .set('yearEnd', data['yearEnd'])
        .set('articleNumber', data['articleNumber'])
    };
    return this.http.get<any>(`${this.host}/stat/list-variation`, queryParams)
  }

  /**
   * list the best sales in terms of quantity by year and month
   * @param data 
   * @returns 
   */
  findbestSaleQtyByYearAndMonth(data): Observable<any> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('year', data['year'])
        .set('month', data['month'])
        .set('articleNumber', data['articleNumber'])
    };
    return this.http.get<any>(`${this.host}/stat/list-best-sale-qty-month`, queryParams)
  }

  /**
   * classement des meilleurs ventes des sous famille d'article par commune
   * @param data 
   * @returns 
   */
  bestArticleSubFamilySaleByCommune(data):Observable<any>{
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('year', data['year'])
        .set('articleSubFamily', data['articleSubFamily'])
    };
    return this.http.get<any>(`${this.host}/stat/best-article-sub-family-sale`, queryParams)
  }
/**
 *  classement des pires ventes des sous famille d'article par commune
 * @param data 
 * @returns 
 */
  badArticleSubFamilySaleByCommune(data):Observable<any>{
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('year', data['year'])
        .set('articleSubFamily', data['articleSubFamily'])
    };
    return this.http.get<any>(`${this.host}/stat/bad-article-sub-family-sale`, queryParams)
  }
/**
 * detail des classement des meilleurs ventes des sous famille d'article par commune
 * @param data 
 * @returns 
 */
  bestArticleSubFamilySaleDetailByCommune(data):Observable<any>{
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('year', data['year'])
        .set('articleSubFamily', data['articleSubFamily'])
        .set('commune', data['commune'])
    };
    return this.http.get<any>(`${this.host}/stat/best-article-sub-family-sale-detail`, queryParams)
  }
/**
 * detail des classement des pires ventes des sous famille d'article par commune
 * @param data 
 * @returns 
 */
  badArticleSubFamilySaleDetailByCommune(data):Observable<any>{
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('year', data['year'])
        .set('articleSubFamily', data['articleSubFamily'])
        .set('commune', data['commune'])
    };
    return this.http.get<any>(`${this.host}/stat/bad-article-sub-family-sale-detail`, queryParams)
  }


  /**
 * detail des classement des pires ventes des sous famille d'article par commune
 * @param data 
 * @returns 
 */
   saleAtLose(data):Observable<any>{
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('date', data['date'])
        .set('reference', data['reference'])
    };
    return this.http.get<any>(`${this.host}/stat/sale-at-loss`, queryParams)
  }

}
