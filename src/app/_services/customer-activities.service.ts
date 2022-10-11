import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageList } from '../_models/page-list.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerActivitiesService {

 
  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**********************START ASSETS HISTORIES*********************/
  /**
   *  get all paginated Asset 
   * @param data 
   * @returns PageList
   */
   findAllAssets(data): Observable<PageList> {

    let queryParams = {};

    queryParams = {
      params: new HttpParams()
        .set('reference', data['reference'] ?? "")
        .set('date', data['date'])
        .set('bl', data['bl'])
        .set('customerId', data['customerId'])
        .set('page', data['page'])
        .set('size', data['size'] ?? "")
        .set('sort', data['sort'])
    };

    return this.http.get<PageList>(`${this.host}/article-returned/list`, queryParams)
  }
/********************END ASSETS HISTORIES***********************/


  /**********************START SALE DELIVERY HISTORIES*********************/
  /**
   *  get all paginated sale delivery 
   * @param data 
   * @returns PageList
   */
   findAllSale(data): Observable<PageList> {

    let queryParams = {};

    queryParams = {
      params: new HttpParams()
        .set('date', data['date'])
        .set('deliveryNoteNumber', data['deliveryNoteNumber'])
        .set('customerId', data['customerId'])
        .set('page', data['page'])
        .set('size', data['size'] ?? "")
        .set('sort', data['sort'])
    };

    return this.http.get<PageList>(`${this.host}/sales-delivery/list-sale`, queryParams)
  }
/********************END  SALE DELIVERY HISTORIES***********************/
 /**
   *  get all paginated sale delivery 
   * @param data 
   * @returns PageList
   */
  findAllEntries(data): Observable<PageList> {

    let queryParams = {};

    queryParams = {
      params: new HttpParams()
        .set('date', data['date'])
        .set('customerId', data['customerId'])
        .set('page', data['page'])
        .set('size', data['size'] ?? "")
        .set('sort', data['sort'])
    };

    return this.http.get<PageList>(`${this.host}/fundraising/list-history`, queryParams)
  }

/********************START ENTRIES HISTORIES*********************** */
/**
   *  get all paginated sale delivery inventories
   * @param data 
   * @returns PageList
   */
 findAllsaleInventories(data): Observable<PageList> {

  let queryParams = {};

  queryParams = {
    params: new HttpParams()
      .set('date', data['date'])
      .set('customerId', data['customerId'])
      .set('reference', data['reference'])
      .set('designation', data['designation'])
      .set('page', data['page'])
      .set('size', data['size'] ?? "")
      .set('sort', data['sort'])
  };

  return this.http.get<PageList>(`${this.host}/article-sold/list-sale`, queryParams)
}


/********************END ENTRIES HISTORIES*********************** */


}
