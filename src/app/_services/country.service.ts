import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../_models/country.model';
import { PageList } from '../_models/page-list.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   *  get list of country 
   * @returns Country[]
   */
  findActive(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.host}/country/active-list`)
  }


  /**
   *  get all paginated Bank 
   * @param data 
   * @returns PageList
   */
  findAll(data): Observable<PageList> {

    let queryParams = {};

    queryParams = {
      params: new HttpParams()
        .set('page', data['page'])
        .set('size', data['size'] ?? "")
        .set('name', data['name'])
        .set('isoCode', data['isoCode'])
        .set('sort', data['sort'])
    };

    return this.http.get<PageList>(`${this.host}/country/list`, queryParams)
  }
}
