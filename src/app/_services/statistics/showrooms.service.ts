import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShowroomsService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }
/**
 * Retourner le classement des meilleures showrooms par année et par mois
 */
  bestShowroomByYearAndMonth(data): Observable<any> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('year', data['year'])
        .set('month', data['month'])
    };
    return this.http.get<any>(`${this.host}/stat/best-showroom-per-month`, queryParams)
  }

  /**
   * Retourner le classement des meilleures showrooms par année
   */
  bestShowroomByYear(data): Observable<any> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('year', data['year'])
    };
    return this.http.get<any>(`${this.host}/stat/best-showroom-per-year`, queryParams)
  }

  /**
 * Retourner le classement des meilleures showrooms par année et par mois
 */
   showroomEvolutionByYearAndMonth(data): Observable<any> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
      .set('depot', data['depot'])
        .set('year', data['year'])
        .set('month', data['month'])
    };
    return this.http.get<any>(`${this.host}/stat/showroom-evolution-per-month`, queryParams)
  }

  /**
   * Retourner le classement des meilleures showrooms par année
   */
  showroomEvolutionByYear(data): Observable<any> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('year', data['year'])
        .set('depot', data['depot'])

    };
    return this.http.get<any>(`${this.host}/stat/showroom-evolution`, queryParams)
  }
}
