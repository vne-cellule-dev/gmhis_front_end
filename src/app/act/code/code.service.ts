import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageList } from 'src/app/_models/page-list.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CodeService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

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

    return this.http.get<PageList>(`${this.apiUrl}/actCode/list`, queryParams);
  }

  findActSimpleList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/actCode/list-simple`);
  }

  /**
   * It returns an Observable of an array of any type
   * @returns An array of objects with the following properties:
   * - id
   * - name
   * - active
   */
  findActiveActCodeNameAndId(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/actCode/active_actCode_name`);
  }

  createActCode(actCode: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/actCode/add`, actCode);
  }

  updateActCode(actCode: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/actCode/update/${actCode.id}`,
      actCode
    );
  }

  getActCodeDetails(actCode: any): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/actCode/get-detail/${actCode.id}`
    );
  }
}
