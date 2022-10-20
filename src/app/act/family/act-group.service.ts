import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageList } from 'src/app/_models/page-list.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ActGroupService {
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

    return this.http.get<PageList>(`${this.apiUrl}/actGroup/list`, queryParams);
  }

  findActiveActGroupNameAndId(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/actGroup/active_actGroup_name`);
  }

  findActSimpleList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/actGroup/list-simple`);
  }

  createActGroup(actCategory: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/actGroup/add`, actCategory);
  }

  updateActGroup(actCategory: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/actGroup/update/${actCategory.id}`,
      actCategory
    );
  }

  getActGroupDetails(actGroup: any): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/actGroup/get-detail/${actGroup.id}`
    );
  }
}
