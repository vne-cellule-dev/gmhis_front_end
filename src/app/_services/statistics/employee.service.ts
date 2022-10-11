import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
 * Retourner le classement des meilleures chauffeurs par année et par mois
 */
   bestDriverByYearAndMonth(data): Observable<any> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('year', data['year'])
        .set('month', data['month'])
    };
    return this.http.get<any>(`${this.host}/stat/best-driver-per-month`, queryParams)
  }

   /**
 * Retourner le classement des meilleures chauffeurs par année 
 */
    bestDriverByYear(data): Observable<any> {
      let queryParams = {};
      queryParams = {
        params: new HttpParams()
          .set('year', data['year'])
      };
      return this.http.get<any>(`${this.host}/stat/best-driver-per-year`, queryParams)
    }
}
