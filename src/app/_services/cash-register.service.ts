import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CashRegister } from '../_models/cashRegister.model';
import { PageList } from '../_models/page-list.model';

@Injectable({
  providedIn: 'root'
})
export class CashRegisterService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   *  get list of CashRegister 
   * @returns CashRegister[]
   */
  findActive(): Observable<CashRegister[]> {
    return this.http.get<CashRegister[]>(`${this.host}/cashRegister/active_cash_register_name`)
  }


  /**
   * get all paginated CashRegister
   * @param data 
   * @returns PageList
   */
  findAll(data): Observable<any> {

    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('depot', data['depot'] ?? 0)
        .set('sort', data['sort'] ?? "")
    };

    return this.http.get<any>(`${this.host}/cash-register/list`, queryParams)
  }

  findAllSimplePage(data): Observable<CashRegister[]> {

    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('depot', data['depot'] ?? 0)
    };

    return this.http.get<CashRegister[]>(`${this.host}/cash-register/list-all`, queryParams)
  }

  findAllCashRegisterPoint(data): Observable<any> {

    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('date', data['date'])
    };

    return this.http.get<any>(`${this.host}/cash-register/point-cash-register`, queryParams)
  }


}
