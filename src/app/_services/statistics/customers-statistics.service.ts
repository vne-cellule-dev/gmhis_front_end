import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomersStatisticsService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }
  /**
   * 
   * @param data 
   * @returns 
   */
  findAllDeliveryByCustomer(data): Observable<any> {

    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('year', data['year'])
        .set('customer', data['customer']??"")
    };

    return this.http.get<any>(`${this.host}/stat/list-delivery-by-customer`, queryParams)
  }
/**
 * list the best sales per customer per year
 * @param data 
 * @returns 
 */
  findBestTurnover(data): Observable<any> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('year', data['year'])
        .set('articleNumber', data['articleNumber'])
    };
    return this.http.get<any>(`${this.host}/stat/list-best-turnover`, queryParams)
  }

  /**
   * list the best sales per customer per year and month
   * @param data 
   * @returns 
   */
  findBestTurnoverByMonth(data): Observable<any> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('year', data['year'])
        .set('month', data['month'])
        .set('articleNumber', data['articleNumber'])
    };
    return this.http.get<any>(`${this.host}/stat/list-best-turnover-month`, queryParams)
  }

  /**
   * find customer percentage in industry
   * @param data 
   * @returns 
   */
  findCustomerPercentage(data): Observable<number> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('year', data['year'])
        .set('customer', data['customer']??"")
    };
    return this.http.get<number>(`${this.host}/stat/list-percentage`, queryParams)
  }

  /**
   * 
   * @param data 
   * @returns 
   */
  findturnoverByDate(data): Observable<any> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('year', data['year'])
    };
    return this.http.get<any>(`${this.host}/stat/business-estimate-by-customer-type`, queryParams)
  }

  findbestArticleSaleByCustomer(data): Observable<any> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('year', data['year'])
        .set('limit', data['limit'])
        .set('customer', data['customer'])
    };
    return this.http.get<any>(`${this.host}/stat/ranking-by-customer`, queryParams)
  }
}
