import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageList } from '../_models/page-list.model';
import { Site } from '../_models/site.model';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

 /**
  * get all site
  * @param data 
  * @returns 
  */
  getSite(data : any):Observable<PageList> {
    let queryParams : {};
    queryParams = {
      params : new HttpParams()
      .set('nom', data['nom'] ?? "")
      .set('communeId', data['communeId'] ?? "")
      .set('page', data['page'] ?? "")
      .set('size', data['size'] ?? "")
      .set('sort', data['sort'] ?? "")
    };
  return this.http.get<PageList>(`${this.host}/site/list`, queryParams)
  }
  /**
   * create new 
   * @param site 
   * @returns 
   */
  saveSite(site : Site):Observable<Site>{
    return this.http.post<Site>(`${this.host}/site/add`, site)
  }
/**
 * updated exiting site
 * @param site 
 * @returns 
 */
  updateSite(site : Site):Observable<Site>{
    return this.http.put<Site>(`${this.host}/site/update/${site.id}`, site)
  }
/**
 * get existing site details
 * @param site 
 * @returns 
 */
  getDetails(site : Site):Observable<Site>{
    return this.http.get<Site>(`${this.host}/site/detail/${site.id}`)
  }

  /**
 * simple list
 * @param commune 
 * @returns 
 */
  getAllSite():Observable<Site[]>{
    return this.http.get<Site[]>(`${this.host}/site/simple-list`)
  }

 
}
