import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Journal } from '../_models/journal.model';
import { PageList } from '../_models/page-list.model';

@Injectable({
  providedIn: 'root'
})
export class JournalService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * get all paginated invoice list
   * @param data 
   * @returns PageList
   */
  findAll(data): Observable<PageList> {

    let queryParams = {};

    queryParams = {
      params: new HttpParams()
      .set('criteria', data['criteria']  ?? "")
      .set('criteriaType', data['criteriaType'] ?? "")
      .set('page', data['page'])
      .set('size', data['size'] ?? "")
      .set('sort', data['sort'])
    };
    return this.http.get<PageList>(`${this.host}/journal/list`, queryParams)
  }

  findAllSimplePage(data): Observable<Journal[]> {

    let queryParams = {};

    queryParams = {
      params: new HttpParams()
      .set('criteria', data['criteria']  ?? "")
      .set('criteriaType', data['criteriaType'] ?? "")
    };
    return this.http.get<Journal[]>(`${this.host}/journal/list-all`, queryParams)
  }

}
