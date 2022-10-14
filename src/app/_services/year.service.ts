import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Year } from '../_models/year.model';

@Injectable({
  providedIn: 'root'
})
export class YearService {

  private host = environment.apiUrl;

  constructor(private http : HttpClient) { }

  /**
 * get list of year
 * @returns Year[]
 */
   findallYear(): Observable<Year[]> {
    return this.http.get<Year[]>(`${this.host}/year/list`)
  }

    /**
       *  create a new Year
       * @param year 
       * @returns Year
       */
     save(year: Year): Observable<Year> {
      return this.http.post<Year>(`${this.host}/year/add`, year)
    }

    /**
       *  update a year
       * @param year 
       * @returns year
       */
     update(year: Year): Observable<Year> {
      return this.http.put<Year>(`${this.host}/year/update/` + year.id, year)
    }

      /**
       * get year details by Year Id
       * @param YearId 
       * @returns 
       */
       getYearDetails(YearId : number) : Observable<Year>{
        return this.http.get<Year>(`${this.host}/year/get-detail/` + YearId)
      }
}
