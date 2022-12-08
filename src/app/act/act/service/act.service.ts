import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageList } from 'src/app/_models/page-list.model';
import { environment } from 'src/environments/environment';
import { ActDto } from '../models/act-dto';

@Injectable({
  providedIn: 'root'
})
export class ActService {

  private readonly apiUrl = environment.apiUrl;
  constructor(private http : HttpClient) { }


/**
 * It takes in a data object, and returns an observable of type PageList
 * @param data - {
 * @returns A list of acts.
 */
  public getPaginatedListOfAct(data) : Observable<PageList>{
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
      .set('page', data['page'])
      .set('size', data['size'] ?? '')
      .set('name', data['name'])
      .set('category', data['category'])
      .set('active', data['active'] ?? '')
      .set('sort', data['sort'])
    }
    return this.http.get<PageList>(`${this.apiUrl}/act/list`, queryParams);
  }

/**
 * It returns an observable of type any
 * @returns The list of active acts
 */
  public getListOfActiveAct() : Observable<any>{
    return this.http.get(`${this.apiUrl}/act/active_acts_name`);
  }

  public getListOfAllMedicalAnalysis() : Observable<any>{
    return this.http.get(`${this.apiUrl}/act/find-All-medical-Analysis`);
  }

 /**
  * This function is used to get the details of an act by its id
  * @param {number} actId - The id of the act you want to get.
  * @returns An observable of any type.
  */
  public getActById(actId : number): Observable<any>{
    return this.http.get(`${this.apiUrl}/act/get-detail/${actId}`);
  }

/**
 * This function takes an ActDto object as a parameter and returns an Observable of type ActDto
 * @param {ActDto} actDto - The object that will be sent to the server.
 * @returns An observable of type ActDto
 */
  public createAct(actDto : ActDto): Observable<ActDto>{
    console.log(actDto);
    
    return this.http.post<ActDto>(`${this.apiUrl}/act/add`, actDto)
  }

 /**
  * This function takes an ActDto object as a parameter and returns an Observable of type ActDto
  * @param {ActDto} actDto - The object that contains the data that will be updated.
  * @returns An observable of type ActDto
  */
  public updateAct(actDto : ActDto) : Observable<ActDto>{
    return this.http.put<ActDto>(`${this.apiUrl}/act/update/${actDto.id}`, actDto)
  }

  public getActsByBillId(BillId : number): Observable<any>{
    return this.http.get(`${this.apiUrl}/act/find-by-bill/${BillId}`);
  }

  public getActsByActCategoryId(categoryId : number): Observable<any>{
    return this.http.get(`${this.apiUrl}/act/active_acts_name_by_Category/${categoryId}`);
  }

}
