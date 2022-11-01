import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { INameAndId } from '../shared/models/name-and-id';
import { PageList } from '../_models/page-list.model';

@Injectable({
  providedIn: 'root',
})
export class CashRegisterService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  findAll(data): Observable<PageList> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('page', data['page'])
        .set('size', data['size'] ?? '')
        .set('name', data['name'])
        .set('active', data['active'] ?? '')
        .set('sort', data['sort']),
    };

    return this.http.get<PageList>(
      `${this.apiUrl}/cashRegister/list`,
      queryParams
    );
  }

  findCashRegisternameAndIdList(): Observable<INameAndId[]> {
    return this.http.get<INameAndId[]>(`${this.apiUrl}/cashRegister/active_cash_register_name`);
  }

  createCashRegister(cashRegister: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/cashRegister/add`, cashRegister);
  }

  updateCashRegister(cashRegister: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/cashRegister/update/${cashRegister.id}`,
      cashRegister
    );
  }

  getCashRegisterDetail(cashRegister: any): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/cashRegister/get-detail/${cashRegister.id}`
    );
  }
}
