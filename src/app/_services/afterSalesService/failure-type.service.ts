import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FailureType } from 'src/app/_models/failureTypeModel';
import { PageList } from 'src/app/_models/page-list.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FailureTypeService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

 /**
  * get all faiure type
  * @param data 
  * @returns 
  */
  getFailureType(data : any):Observable<PageList> {
    let queryParams : {};
    queryParams = {
      params : new HttpParams()
      .set('name', data['name'] ?? "")
      .set('isActive', data['isActive'] ?? "")
      .set('page', data['page'] ?? "")
      .set('size', data['size'] ?? "")
      .set('sort', data['sort'] ?? "")
    };
  return this.http.get<PageList>(`${this.host}/failure-type/list`, queryParams)
  }
  /**
   * create new 
   * @param failureType 
   * @returns 
   */
  saveFailureType(failureType : FailureType):Observable<FailureType>{
    return this.http.post<FailureType>(`${this.host}/failure-type/add`, failureType)
  }
/**
 * updated exiting failureType
 * @param failureType 
 * @returns 
 */
  updateFailureType(failureType : FailureType):Observable<FailureType>{
    return this.http.put<FailureType>(`${this.host}/failure-type/update/${failureType.id}`, failureType)
  }
/**
 * get existing failureType details
 * @param failureType 
 * @returns 
 */
  getFailureTypeDetails(failureType : FailureType):Observable<FailureType>{
    return this.http.get<FailureType>(`${this.host}/failure-type/get-details/${failureType.id}`)
  }
/**
 * simple list
 * @returns 
 */
  getAllFailureType():Observable<FailureType[]>{
    return this.http.get<FailureType[]>(`${this.host}/failure-type/list-all`)
  }
}
