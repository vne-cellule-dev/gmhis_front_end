import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageList } from '../_models/page-list.model';

@Injectable({
  providedIn: 'root',
})
export class SubscriberService {
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
      `${this.apiUrl}/insuranceSubscriber/list`,
      queryParams
    );
  }

  findInsuranceSubscriberSimpleList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/insuranceSubscriber/list`);
  }

  createInsuranceSubscriber(insuranceSubscriber: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/insuranceSubscriber/add`,
      insuranceSubscriber
    );
  }

  updateInsuranceSubscriber(insuranceSubscriber: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/insuranceSubscriber/update/${insuranceSubscriber.id}`,
      insuranceSubscriber
    );
  }

  getInsuranceSubscriberDetail(insuranceSubscriber: any): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/insuranceSubscriber/get-detail/${insuranceSubscriber.id}`
    );
  }

  getAllInsuranceSubscriberActive(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/insuranceSubscriber/active_subscribers_name/`);
  }
}
