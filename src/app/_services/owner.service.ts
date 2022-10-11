import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IOwner } from '../_models/owner';
import { PageList } from '../_models/page-list.model';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  private host = environment.apiUrl;

  constructor(private http : HttpClient) { }

/**
 * It's a function that returns an observable of type PageList
 * @param {any} data - the data object that contains the parameters to be sent to the server.
 */
  getAllOwner(data : any):Observable<PageList>{
      let queryParams : {};
      queryParams = {
        params : new HttpParams() 
        .set('nom', data['nom'] ?? "")
        .set('prenoms', data['prenoms'] ?? "")
        .set('page', data['page'] ?? "")
        .set('size', data['size'] ?? "")
        .set('sort', data['sort'] ?? "")
      }
return this.http.get<PageList>(`${this.host}/proprietaire/list`, queryParams);
  }

  /**
   * It takes an object of type IOwner as a parameter and returns an Observable of type IOwner
   * @param {IOwner} owner - IOwner is the object that we want to send to the server.
   * @returns An observable of type IOwner
   */
  saveLocation(owner : IOwner):Observable<IOwner>{
    console.log(owner);
    return this.http.post<IOwner>(`${this.host}/proprietaire/add`, owner)
  }

  /**
   * The function takes an owner object as a parameter and returns an observable of type IOwner
   * @param {IOwner} owner - IOwner
   * @returns An observable of type IOwner
   */
  updateOwner(owner : IOwner):Observable<IOwner>{
    console.log(owner);
    
    return this.http.put<IOwner>(`${this.host}/proprietaire/update/${owner.id}`, owner);
  }

 /**
  * It returns an Observable of type IOwner, which is the type of the owner object
  * @param {IOwner} owner - IOwner is the parameter that is passed to the function.
  * @returns An observable of type IOwner
  */
  getOwnerDetails(owner : IOwner):Observable<IOwner>{
    return this.http.get<IOwner>(`${this.host}/proprietaire/detail/${owner.id}`);
  }

 /**
  * It returns an Observable of an array of IOwner objects
  * @returns An observable of an array of IOwner objects.
  */
  getSimpleOwnerList():Observable<IOwner[]>{
    return this.http.get<IOwner[]>(`${this.host}/proprietaire/simple-list`);
  }
}
