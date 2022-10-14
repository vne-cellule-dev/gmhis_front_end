import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageList } from '../_models/page-list.model';
import { StockOut } from '../_models/stockOut.model';
import { StockOutReason } from '../_models/stockOutReason.model';

@Injectable({
  providedIn: 'root'
})
export class StockOutService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

/*******************************STAR OUT SERVICE******************************* */
  /**
   * get all paginated StockOut
   * @param data 
   * @returns PageList
   */
  findAll(data): Observable<PageList> {

    let queryParams = {};
    queryParams = {
      params: new HttpParams()
      .set('page', data['page'])
      .set('date', data['date'] ?? "")
      .set('size', data['size'] ?? "")
      .set('criteria', data['criteria'] ?? "")
      .set('criteriaType', data['criteriaType'])
      .set('sort', data['sort'])
    };

    return this.http.get<PageList>(`${this.host}/stock-output/list`, queryParams)
  }

  /**
   *   create a new StockOut
   * @param StockOut 
   * @returns StockOut
   */
  save(StockOut: StockOut): Observable<StockOut> {
    return this.http.post<StockOut>(`${this.host}/stock-output/add`, StockOut)
  }

  /**
   * update a StockOut
   * @param StockOut 
   * @returns StockOut
   */
  update(StockOut: any): Observable<any> {
    return this.http.put<any>(`${this.host}/stock-output/update/` + StockOut.id, StockOut)
  }

  
 /**
     * get stock output details by Id
     * @param StockOutId 
     * @returns 
     */
  getStockOutDetails(StockOutId : number) : Observable<StockOut>{
    return this.http.get<StockOut>(`${this.host}/stock-output/get-detail/` + StockOutId)
  }

  /**
     * get stock output details by number
     * @param StockOutId 
     * @returns 
     */
   getByStockOutputNumber(number : string) : Observable<StockOut>{
    return this.http.get<StockOut>(`${this.host}/stock-output/find-by-number/${number}`)
  }
/**
 * 
 * @param data 
 * @returns 
 */
  findAllStockOutSimpleList(data): Observable<StockOut[]> {

    let queryParams = {};
    queryParams = {
      params: new HttpParams()
      .set('criteria', data['criteria'] ?? "")
      .set('criteriaType', data['criteriaType'])
    };

    return this.http.get<StockOut[]>(`${this.host}/stock-output/list-stock-out-out`, queryParams)
  }

  /******************************END OUT SERVICE*****************************************/

  /*****************************START OUT REASON SERVICE ********************************/
  findOutReasonActive(): Observable<StockOutReason[]> {
    return this.http.get<StockOutReason[]>(`${this.host}/reason/list-active`)
  }
 
  /**
   * get all paginated StockOut reason
   * 
   */
  findAllOutReason(data):  Observable<PageList>  {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
      .set('page', data['page'])
      .set('size', data['size'] ?? "")
      .set('criteria', data['criteria'] ?? "")
      .set('criteriaType', data['criteriaType'])
      .set('sort', data['sort'])
    };

    return this.http.get<PageList>(`${this.host}/reason/list`, queryParams)
  }

  /**
   *   create a new StockOut reason
   * @param stockOutReason 
   * @returns stockOutReason
   */
  saveOutReason(stockOutReason: StockOutReason): Observable<StockOutReason> {
    return this.http.post<StockOutReason>(`${this.host}/reason/add`, stockOutReason)
  }

  /**
   * update a StockOut reason
   * @param StockOutReason 
   * @returns StockOutReason
   */
  updateOutReason(stockOutReason: StockOutReason): Observable<StockOutReason> {
    return this.http.put<StockOutReason>(`${this.host}/reason/update/` + stockOutReason.id, stockOutReason)
  }

  
 /**
     * get stock output reason details by Id
     * @param StockOutReasonId 
     * @returns 
     */
  getStockOutReasonDetails(stockOutReasonId : number) : Observable<StockOutReason>{
    return this.http.get<StockOutReason>(`${this.host}/reason/get-detail/` + stockOutReasonId)
  }


    /*****************************END OUT REASON SERVICE ********************************/

}
