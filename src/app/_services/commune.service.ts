import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Commune } from '../_models/commune.model';
import { PageList } from '../_models/page-list.model';

@Injectable({
  providedIn: 'root'
})
export class CommuneService {

 
  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

 /**
  * get all commune
  * @param data 
  * @returns 
  */
  getCommune(data : any):Observable<PageList> {
    let queryParams : {};
    queryParams = {
      params : new HttpParams()
      .set('name', data['name'] ?? "")
      .set('page', data['page'] ?? "")
      .set('size', data['size'] ?? "")
      .set('sort', data['sort'] ?? "")
    };
  return this.http.get<PageList>(`${this.host}/commune/list`, queryParams)
  }
  /**
   * create new 
   * @param commune 
   * @returns 
   */
  saveCommune(commune : Commune):Observable<Commune>{
    return this.http.post<Commune>(`${this.host}/commune/add`, commune)
  }
/**
 * updated exiting commune
 * @param commune 
 * @returns 
 */
  updateCommune(commune : Commune):Observable<Commune>{
    return this.http.put<Commune>(`${this.host}/commune/update/${commune.id}`, commune)
  }
/**
 * get existing commune details
 * @param commune 
 * @returns 
 */
  getCommuneDetails(commune : Commune):Observable<Commune>{
    return this.http.get<Commune>(`${this.host}/commune/detail/${commune.id}`)
  }

  /**
 * simple list
 * @param commune 
 * @returns 
 */
  getAllCommune():Observable<Commune[]>{
    return this.http.get<Commune[]>(`${this.host}/commune/simple`)
  }

 
}
