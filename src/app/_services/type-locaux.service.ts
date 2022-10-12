import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageList } from '../_models/page-list.model';
import { TypeLocaux } from '../_models/typeLocaux.model';

@Injectable({
  providedIn: 'root'
})
export class TypeLocauxService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

 /**
  * get all type locaux
  * @param data 
  * @returns 
  */
  getTypeLocaux(data : any):Observable<PageList> {
    let queryParams : {};
    queryParams = {
      params : new HttpParams()
      .set('typeLocaux', data['typeLocaux'] ?? "")
      .set('page', data['page'] ?? "")
      .set('size', data['size'] ?? "")
      .set('sort', data['sort'] ?? "")
    };
  return this.http.get<PageList>(`${this.host}/type-locaux/list`, queryParams)
  }
  /**
   * create new 
   * @param type locaux 
   * @returns 
   */
  saveTypeLocaux(typeLocaux : TypeLocaux):Observable<TypeLocaux>{
    return this.http.post<TypeLocaux>(`${this.host}/type-locaux/add`,typeLocaux)
  }
/**
 * updated exiting typeLocaux
 * @param typeLocaux 
 * @returns 
 */
  updateTypeLocaux(typeLocaux : TypeLocaux):Observable<TypeLocaux>{
    return this.http.put<TypeLocaux>(`${this.host}/type-locaux/update/${typeLocaux.id}`,typeLocaux)
  }
/**
 * get existing typeLocaux details
 * @param typeLocaux 
 * @returns 
 */
  getDetails(typeLocaux :TypeLocaux):Observable<TypeLocaux>{
    return this.http.get<TypeLocaux>(`${this.host}/type-locaux/detail/${typeLocaux.id}`)
  }

  /**
 * simple list
 * @param typeLocaux 
 * @returns 
 */
  getAllTypeLocaux():Observable<TypeLocaux[]>{
    return this.http.get<TypeLocaux[]>(`${this.host}/type-locaux/simple-list`)
  }

 
}
