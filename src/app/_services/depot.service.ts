import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Depot } from '../_models/depot.model';
import { PageList } from '../_models/page-list.model';

@Injectable({
  providedIn: 'root'
})
export class DepotService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * get list of Depot 
   * @returns Depot[]
   */
  findActive(): Observable<Depot[]> {
    return this.http.get<Depot[]>(`${this.host}/depot/active-list`)
  }

   /**
   * get list of active  Depot without depot zero
   * @returns Depot[]
   */
    findActiveWithoutDepotZero(): Observable<Depot[]> {
      return this.http.get<Depot[]>(`${this.host}/depot/active-list-whithout-depot-zero`)
    }

  /**
   * get list of active  Depot without depot zero and depot in inventory state
   * @returns Depot[]
   */
  findActiveWithoutDepotZeroAndDepotInInventory(): Observable<Depot[]> {
        return this.http.get<Depot[]>(`${this.host}/depot/active-list-whithout-inventory-depot`)
  }
  
    

  /**
   *  get all paginated Depot 
   * @param data 
   * @returns 
   */
  findAll(data): Observable<PageList> {

    let queryParams = {};

    queryParams = {
      params: new HttpParams()
        .set('page', data['page'])
        .set('size', data['size'] ?? "")
        .set('name', data['name'])
        .set('isActive', data['isActive'] ?? "")
        .set('sort', data['sort'])
    };


    return this.http.get<PageList>(`${this.host}/depot/list`, queryParams)
  }

  /**
   *  create  a new  Depot
   * @param Depot 
   * @returns Depot
   */
  save(Depot: Depot): Observable<Depot> {
    return this.http.post<Depot>(`${this.host}/depot/add`, Depot)
  }

  /**
   *  update a Depot
   * @param Depot 
   * @returns Depot
   */
  update(Depot: Depot): Observable<Depot> {
    return this.http.put<Depot>(`${this.host}/depot/update/` + Depot.id, Depot)
  }


  /**
   * get depot detail by Id
   * @param depotId 
   * @returns 
   */

  getDepotDetails(name : string) : Observable<Depot>{
    return this.http.get<Depot>(`${this.host}/depot/get-detail/` +name)
  }

  /**
   * 
   * @param Depot 
   * @returns 
   */
setDepotInventoryState(Depot: Depot):Observable<Depot>{
  return this.http.put<Depot>(`${this.host}/depot/inventory/` + Depot.id, Depot)
 
}
}
