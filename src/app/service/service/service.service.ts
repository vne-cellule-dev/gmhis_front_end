import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageList } from 'src/app/_models/page-list.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  findAll(data): Observable <PageList> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('page', data['page'])
        .set('size', data['size'] ?? '')
        .set('name', data['name'])
        .set('active', data['active'] ?? '')
        .set('sort', data['sort']),
    };
    return this.http.get<PageList>(`${this.apiUrl}/actCode/list`, queryParams);
  }

  findActiveServiceNameAndId(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/service/active_service_name_and_id`);
  }
}
