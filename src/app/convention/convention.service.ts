import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageList } from '../_models/page-list.model';

@Injectable({
  providedIn: 'root',
})
export class ConventionService {
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
      `${this.apiUrl}/convention/list`,
      queryParams
    );
  }

  findConventionSimpleList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/convention/active_convention_name_and_Id`);
  }

  createConvention(convention: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/convention/add`, convention);
  }

  updateConvention(convention: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/convention/update/${convention.id}`,
      convention
    );
  }

  getConventionDetails(convention: any): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/convention/get-detail/${convention.id}`
    );
  }
}
