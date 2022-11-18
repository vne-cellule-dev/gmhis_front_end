import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INameAndId } from 'src/app/shared/models/name-and-id';
import { PageList } from 'src/app/_models/page-list.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PathologyService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http : HttpClient) { }

  /**
   * It takes a data object, converts it to a query string, and then sends it to the server
   * @param data - {
   * @returns A list of Pathology objects
   */
  findAll(data): Observable<PageList> {

    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('page', data['page'])
        .set('size', data['size'] ?? "")
        .set('name', data['name'])
        .set('active', data['active'] ?? "")
        .set('sort', data['sort'])
    };
    return this.http.get<PageList>(`${this.apiUrl}/pathology/list`, queryParams)
  }

  /**
   * It returns an Observable of an array of objects, each object containing an id and a name
   * @returns An array of objects with the name and id of the active categories.
   */
  findActivePathologyNameAndId():Observable<INameAndId[]>{
    return this.http.get<INameAndId[]>(`${this.apiUrl}/pathology/active_pathologies_name`);
  }

/**
 * It returns an observable of an array of any type
 * @returns An array of objects.
 */
  findActSimpleList():Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/pathology/list-simple`);
  }

 /**
  * This function takes in an object of type Pathology and sends it to the server to be added to the
  * database
  * @param {any} Pathology - any
  * @returns The observable of the response from the server.
  */
  createPathology(Pathology : any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/pathology/add`, Pathology)
  }

 /**
  * This function takes an Pathology object as a parameter and returns an observable of type any
  * @param {any} Pathology - The object that contains the data to be updated.
  * @returns An observable of type any
  */
  updatePathology(Pathology : any):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/pathology/update/${Pathology.id}`, Pathology)
  }
}
