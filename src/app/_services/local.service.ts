import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Local } from '../_models/local.model';
import { PageList } from '../_models/page-list.model';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  
  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

 /**
  * get all local
  * @param data 
  * @returns 
  */
  getLocal(data : any):Observable<PageList> {
    let queryParams : {};
    queryParams = {
      params : new HttpParams()
      .set('refLocaux', data['refLocaux'] ?? "")
      .set('typeLocaux', data['typeLocaux'] ?? "")
      .set('siteId', data['siteId'] ?? "")
      .set('etat', data['etat'] ?? "")
      .set('page', data['page'] ?? "")
      .set('size', data['size'] ?? "")
      .set('sort', data['sort'] ?? "")
    };
  return this.http.get<PageList>(`${this.host}/locaux/list`, queryParams)
  }
  /**
   * create new 
   * @param local 
   * @returns 
   */
  saveLocal(local : Local):Observable<Local>{
    return this.http.post<Local>(`${this.host}/locaux/add`, local)
  }
/**
 * updated exiting local
 * @param local 
 * @returns 
 */
  updateLocal(local : Local):Observable<Local>{
    console.log(local);
    
    return this.http.put<Local>(`${this.host}/locaux/update/${local.id}`, local)
  }
/**
 * get existing local details
 * @param local 
 * @returns 
 */
  geteDetails(localId : number):Observable<Local>{
    return this.http.get<Local>(`${this.host}/locaux/detail/${localId}`)
  }

  /**
 * simple list
 * @param local 
 * @returns 
 */
  getAllLocal():Observable<Local[]>{
    return this.http.get<Local[]>(`${this.host}/locaux/simple-list`)
  }

  getAllLocalBySite(siteId : number):Observable<Local[]>{
    return this.http.get<Local[]>(`${this.host}/locaux/list-by-site/${siteId}`)
  }

  getAllSimplePremisFree():Observable<Local[]>{
    return this.http.get<Local[]>(`${this.host}/locaux/simple-premise-free`)
  }

 
}
