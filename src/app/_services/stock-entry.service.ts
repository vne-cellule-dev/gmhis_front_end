import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageList } from '../_models/page-list.model';
import { StockEntry } from '../_models/stock-entry.model';
import { StockEntryPost } from '../_models/stock-entry.modelPost';

@Injectable({
  providedIn: 'root'
})
export class StockEntryService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   *  get list of StockEntry 
   * @returns StockEntry[]
   */
  findActive(): Observable<StockEntry[]> {
    return this.http.get<StockEntry[]>(`${this.host}/stock-entry/active-list`)
  }

   /**
   *  get list of StockEntry 
   * @returns StockEntry[]
   */
    findByBlNumber(blNumber : string): Observable<StockEntry[]> {
      return this.http.get<StockEntry[]>(`${this.host}/stock-entry/find-by-bl/${blNumber}`)
    }
  

  /**
   * get all paginated StockEntry
   * @param data 
   * @returns PageList
   */
  findAll(data): Observable<PageList> {

    let queryParams = {};
    queryParams = {
      params: new HttpParams()
      .set('page', data['page'])
      .set('size', data['size'] ?? "")
      .set('date', data['date'] ?? "")
      .set('depot', data['depot'] ?? 0)
      .set('criteria', data['criteria'] ?? "")
      .set('criteriaType', data['criteriaType'])
      .set('firstValidation', data['firstValidation'] ?? 0 )
      .set('sort', data['sort'])
    };

    return this.http.get<PageList>(`${this.host}/stock-entry/list`, queryParams)
  }
/**
 * for print
 * @param data 
 * @returns 
 */
  findAllSimpleList(data): Observable<StockEntry[]> {

    let queryParams = {};
    queryParams = {
      params: new HttpParams()
      .set('criteria', data['criteria'] ?? "")
      .set('criteriaType', data['criteriaType'])
      .set('firstValidation', data['firstValidation'])
    };
    return this.http.get<StockEntry[]>(`${this.host}/stock-entry/list-depotage`, queryParams)
  }

  /**
   *   create a new StockEntry
   * @param StockEntry 
   * @returns StockEntry
   */
  saveByBl(stockEntry: StockEntryPost): Observable<number> {
    return this.http.post<number>(`${this.host}/stock-entry/add-by-bl`, stockEntry)
  }

  /**
   *   create a new StockEntry
   * @param StockEntry 
   * @returns StockEntry
   */
   save(stockEntry): Observable<StockEntry> {
    return this.http.post<StockEntry>(`${this.host}/stock-entry/add`, stockEntry)
  }

  /**
   * update a StockEntry
   * @param StockEntry 
   * @returns StockEntry
   */
  update(stockEntry: any): Observable<number> {
    return this.http.put<number>(`${this.host}/stock-entry/update/` + stockEntry.id, stockEntry)
  }


  firstValidation(stockEntrytoValidate : any[]): Observable<number> {
    return this.http.put<number>(`${this.host}/stock-entry/first-validate/`,stockEntrytoValidate)
  }

  secondValidation(stockEntrytoValidate : any[]): Observable<number> {
    return this.http.put<number>(`${this.host}/stock-entry/second-validate/`,stockEntrytoValidate)
  }


  /**
   * get all first validated paginated StockEntry
   * @param data 
   * @returns PageList
   */
   findAllFirstValidate(data): Observable<PageList> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
      .set('page', data['page'])
      .set('date', data['date'] ?? "")
      .set('size', data['size'] ?? "")
      .set('criteria', data['criteria'] ?? "")
      .set('criteriaType', data['criteriaType'])
      .set('secondValidation', data['secondValidation'] ?? 0)
      .set('sort', data['sort'])
    };

    return this.http.get<PageList>(`${this.host}/stock-entry/list-firstValidation`, queryParams)
  }
  
 /**
     * get stock entry details by Id
     * @param stockEntryId 
     * @returns 
     */
  getStockEntryDetails(stockEntryId : number) : Observable<StockEntry>{
    return this.http.get<StockEntry>(`${this.host}/stock-entry/get-detail/` + stockEntryId)
  }

  /**
   * get number of depotage to validate
   * @returns 
   */
  getNumberOfDepotageToValidate():Observable<number>{
    return this.http.get<number>(`${this.host}/stock-entry/depotage-to-validate`)
  }
/**
 * get number of stock entry to validate
 * @returns 
 */
  getNumberOfStockEntryToValidate():Observable<number>{
    return this.http.get<number>(`${this.host}/stock-entry/entry-to-validate`)
  }

  /**
   * get all first validated non paginated StockEntry
   * @param data 
   * @returns list
   */
   findAllFirstValidateSimpleList(data): Observable<StockEntry[]> {

    let queryParams = {};
    queryParams = {
      params: new HttpParams()
      .set('criteria', data['criteria'] ?? "")
      .set('criteriaType', data['criteriaType'])
      .set('secondValidation', data['secondValidation'])
    };

    return this.http.get<StockEntry[]>(`${this.host}/stock-entry/list-entry`, queryParams)
  }

  /**
   * delete depotage
   * @returns 
   */
   delete(id: number): Observable<String>{
    return this.http.delete<String>(`${this.host}/stock-entry/delete/`+id)
  }

  /**
   *  get list of StockEntry  to calculate average cost
   * @returns StockEntry[]
   */
  getCumpToCalculateContainers(): Observable<StockEntry[]> {
    return this.http.get<StockEntry[]>(`${this.host}/stock-entry/get-cump-to-calculate-containers`)
  }


  /**
   *  get number of StockEntry  to calculate average cost
   * @returns number
   */
   getNumberOfCumpToCalculate(): Observable<number> {
    return this.http.get<number>(`${this.host}/stock-entry/get-cump-to-calculate-number`)
  }

}
