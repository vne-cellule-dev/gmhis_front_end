import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Guaranty } from 'src/app/_models/guaranty.model';
import { PageList } from 'src/app/_models/page-list.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GuarantyService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

 /**
  * get all guaranties
  * @param data 
  * @returns 
  */
  getGuaranties(data : any):Observable<PageList> {
    let queryParams : {};
    queryParams = {
      params : new HttpParams()
      .set('name', data['name'] ?? "")
      .set('page', data['page'] ?? "")
      .set('size', data['size'] ?? "")
      .set('sort', data['sort'] ?? "")
    };
  return this.http.get<PageList>(`${this.host}/guaranty/list`, queryParams)
  }
  /**
   * create new 
   * @param guaranty 
   * @returns 
   */
  saveGuaranty(guaranty : Guaranty):Observable<Guaranty>{
    return this.http.post<Guaranty>(`${this.host}/guaranty/add`, guaranty)
  }
/**
 * updated exiting guaranty
 * @param guaranty 
 * @returns 
 */
  updateGuaranty(guaranty : Guaranty):Observable<Guaranty>{
    return this.http.put<Guaranty>(`${this.host}/guaranty/update/${guaranty.id}`, guaranty)
  }
/**
 * get existing guaranty details
 * @param guaranty 
 * @returns 
 */
  getGuarantyDetails(guarantyId : number):Observable<Guaranty>{
    return this.http.get<Guaranty>(`${this.host}/guaranty/get-details/${guarantyId}`)
  }

  getGuarantyExclusionsDetails(guaranty : Guaranty):Observable<any[]>{
    return this.http.get<any[]>(`${this.host}/guaranty/get-guaranty-exclusion/${guaranty.id}`)
  }
  /**
   * 
   * @returns 
   */
  getAllGaranties():Observable<Guaranty[]>{
    return this.http.get<Guaranty[]>(`${this.host}/guaranty/list-all`)
  }
}
