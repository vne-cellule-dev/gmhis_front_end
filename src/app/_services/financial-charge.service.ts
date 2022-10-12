import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FinancialCharge } from '../_models/financialChanrge.model';
import { PageList } from '../_models/page-list.model';

@Injectable({
  providedIn: 'root'
})
export class FinancialChargeService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   *  get list of FinancialCharge 
   * @returns FinancialCharge[]
   */
  findActive(): Observable<FinancialCharge[]> {
    return this.http.get<FinancialCharge[]>(`${this.host}/financial-charge/listAll`)
  }


  /**
   * get all paginated FinancialCharge
   * @param data 
   * @returns PageList
   */
  findAll(data): Observable<PageList> {

    let queryParams = {};
    queryParams = {
      params: new HttpParams()
      .set('page', data['page'])
      .set('size', data['size'] ?? "")
      .set('criteria', data['criteria'] ?? "")
      .set('criteriaType', data['criteriaType'])
      .set('sort', data['sort'])
    };

    return this.http.get<PageList>(`${this.host}/financial-charge/list`, queryParams)
  }

  /**
   * create a new FinancialCharge
   * @param FinancialCharge 
   * @returns FinancialCharge
   */
  save(port: FinancialCharge): Observable<FinancialCharge> {
    return this.http.post<FinancialCharge>(`${this.host}/financial-charge/add`, port)
  }

  /**
   * update a FinancialCharge
   * @param FinancialCharge 
   * @returns FinancialCharge
   */
  update(port: FinancialCharge): Observable<FinancialCharge> {
    return this.http.put<FinancialCharge>(`${this.host}/financial-charge/update/` + port.id, port)
  }

  /**
     * get FinancialCharge details by Id
     * @param FinancialCharge 
     * @returns 
     */
   getFinancialChargeDetails(FinancialChargeId : number) : Observable<FinancialCharge>{
    return this.http.get<FinancialCharge>(`${this.host}/financial-charge/get-detail/` + FinancialChargeId)
  }
}
