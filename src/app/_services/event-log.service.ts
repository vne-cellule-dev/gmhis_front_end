import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageList } from '../_models/page-list.model';

@Injectable({
  providedIn: 'root'
})
export class EventLogService {

  private host = environment.apiUrl;

  constructor(private http : HttpClient) { }

  /*
    get all paginated item 
  */
  findAll(data):Observable<PageList>{
      let queryParams = {};
      
      queryParams = {
        params: new HttpParams()
          .set('page', data['page'])
          .set('size', data['size'] ?? "")
          .set('userId', data['userId'] ?? "")
          .set('category',data['category'] ??  "")
          .set('date', data['dateRange'] ??  "")
          .set('sort', data['sort'])
      };

    return this.http.get<PageList>(`${this.host}/log/list`, queryParams) 
  }

  /*
    get event category list
  */
    findAllCategory():Observable<string[]>{
      return this.http.get<string[]>(`${this.host}/log/category-list`) 
    }
  
}
