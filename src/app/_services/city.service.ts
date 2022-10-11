import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { City } from '../_models/city.model';
import { PageList } from '../_models/page-list.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

 /**
  * get all city
  * @param data 
  * @returns 
  */
  getCity(data : any):Observable<PageList> {
    let queryParams : {};
    queryParams = {
      params : new HttpParams()
      .set('name', data['name'] ?? "")
      .set('page', data['page'] ?? "")
      .set('size', data['size'] ?? "")
      .set('sort', data['sort'] ?? "")
    };
  return this.http.get<PageList>(`${this.host}/city/list`, queryParams)
  }
  /**
   * create new 
   * @param city 
   * @returns 
   */
  saveCity(city : City):Observable<City>{
    return this.http.post<City>(`${this.host}/city/add`, city)
  }
/**
 * updated exiting city
 * @param city 
 * @returns 
 */
  updateCity(city : City):Observable<City>{
    return this.http.put<City>(`${this.host}/city/update/${city.id}`, city)
  }
/**
 * get existing city details
 * @param city 
 * @returns 
 */
  getCityDetails(city : City):Observable<City>{
    return this.http.get<City>(`${this.host}/city/get-detail/${city.id}`)
  }

 /**
  * 
  * @returns 
  */
   getActifsCity():Observable<City[]>{
    return this.http.get<City[]>(`${this.host}/city/list-all`)
  }
}
