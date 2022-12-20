import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageList } from '../_models/page-list.model';

@Injectable({
  providedIn: 'root',
})
export class InsuranceService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  findAllInsurance(data): Observable<PageList> {
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
      `${this.apiUrl}/insurance/list`,
      queryParams
    );
  }

  createInsurance(antecedentType: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/insurance/add`, antecedentType);
  }

  updateInsurance(antecedentType: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/insurance/update/${antecedentType.id}`,
      antecedentType
    );
  }

  getInsuranceDetail(antecedentType: any): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/insurance/get-detail/${antecedentType.id}`
    );
  }

  getAllInsuranceActive(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/insurance/active_insurances_name/`);
  }
}
