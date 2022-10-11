import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseStatService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  bestShowroomByYearAndMonth(data): Observable<any> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('year', data['year'])
    };
    return this.http.get<any>(`${this.host}/stat/expense-per-month`, queryParams)
  }
}
