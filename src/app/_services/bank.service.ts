import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bank } from '../_models/bank.model';
import { PageList } from '../_models/page-list.model';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   *  get list of Bank 
   * @returns Bank[]
   */
  findActive(): Observable<Bank[]> {
    return this.http.get<Bank[]>(`${this.host}/bank/active-list`)
  }


  /**
   * get all paginated Bank
   * @param data 
   * @returns PageList
   */
  findAll(data): Observable<PageList> {

    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('page', data['page'])
        .set('size', data['size'] ?? "")
        .set('name', data['name'])
        .set('isActive', data['isActive'] ?? "")
        .set('sort', data['sort'])
    };

    return this.http.get<PageList>(`${this.host}/bank/list`, queryParams)
  }

  /**
   *   create a new Bank
   * @param Bank 
   * @returns Bank
   */
  save(Bank: Bank): Observable<Bank> {
    return this.http.post<Bank>(`${this.host}/bank/add`, Bank)
  }

  /**
   * update a Bank
   * @param Bank 
   * @returns Bank
   */
  update(Bank: Bank): Observable<Bank> {
    return this.http.put<Bank>(`${this.host}/bank/update/` + Bank.id, Bank)
  }

  /**
   * get Bank details by Bank Id
   * @param BankId 
   * @returns 
   */
   getBankDetails(bankId : number) : Observable<Bank>{
    return this.http.get<Bank>(`${this.host}/bank/get-detail/` + bankId)
  }

}
