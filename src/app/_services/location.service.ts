import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Location } from '../_models/location';
import { PageList } from '../_models/page-list.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

 /**
  * get all local
  * @param data 
  * @returns 
  */
  getLocation(data : any):Observable<PageList> {
    let queryParams : {};
    queryParams = {
      params : new HttpParams()
      .set('annee', data['annee'] ?? "")
      .set('locataireId', data['locataireId'] ?? "")
      .set('siteId', data['siteId'] ?? "")
      .set('etat', data['etat'] ?? "")
      .set('page', data['page'] ?? "")
      .set('size', data['size'] ?? "")
      .set('sort', data['sort'] ?? "")
    };
  return this.http.get<PageList>(`${this.host}/loyer/list`, queryParams)
  }
  /**
   * create new 
   * @param location 
   * @returns 
   */
  saveLocation(local : Location):Observable<Location>{
    console.log(local);
    
    return this.http.post<Location>(`${this.host}/location/add`, local)
  }

/**
 * updated exiting location
 * @param location 
 * @returns 
 */
  updateLocation(location : Location):Observable<Location>{
    console.log(location);
    
    return this.http.put<Location>(`${this.host}/location/update/${location.id}`, location)
  }

  completeRental(location : Location):Observable<Location>{    
    return this.http.put<Location>(`${this.host}/location/terminer/`, { locationId : location.id})
  }
/**
 * get existing location details
 * @param location  
 * @returns 
 */
  geteDetails(location : Location):Observable<Location>{    
    return this.http.get<Location>(`${this.host}/location/detail/${location.id}`)
  }

  /**
 * simple list
 * @param location 
 * @returns 
 */
  getAllLocation():Observable<Location[]>{
    return this.http.get<Location[]>(`${this.host}/location/simple-list`)
  }

  getAllYear():Observable<any[]>{
    return this.http.get<any[]>(`${this.host}/location/list-annee`)
  }

  getAllSimplePremisFree():Observable<Location[]>{
    return this.http.get<Location[]>(`${this.host}/location/simple-premise-free`)
  }

  getAvance(data : any):Observable<PageList> {
    let queryParams : {};
    queryParams = {
      params : new HttpParams()
      .set('annee', data['annee'] ?? "")
      .set('locataireId', data['locataireId'] ?? "")
      .set('page', data['page'] ?? "")
      .set('size', data['size'] ?? "")
      .set('sort', data['sort'] ?? "")
    };
  return this.http.get<PageList>(`${this.host}/avance-loyer/list`, queryParams)
  }
}
