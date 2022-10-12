import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageList } from '../_models/page-list.model';
import { Shipper } from '../_models/shipper.model';

@Injectable({
  providedIn: 'root'
})
export class ShipperService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   *  get list of Shipper 
   * @returns Shipper[]
   */
  findActive(): Observable<Shipper[]> {
    return this.http.get<Shipper[]>(`${this.host}/shipper/active-list`)
  }


  /**
   * get all paginated Shipper
   * @param data 
   * @returns PageList
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

    return this.http.get<PageList>(`${this.host}/shipper/list`, queryParams)
  }

  /**
   *   create a new Shipper
   * @param Shipper 
   * @returns Shipper
   */
  save(Shipper: Shipper): Observable<Shipper> {
    return this.http.post<Shipper>(`${this.host}/shipper/add`, Shipper)
  }

  /**
   * update a Shipper
   * @param Shipper 
   * @returns Shipper
   */
  update(shipper: Shipper): Observable<Shipper> {
    return this.http.put<Shipper>(`${this.host}/shipper/update/` + shipper.id, shipper)
  }

   /**
     * get shipper details by Id
     * @param shipperId 
     * @returns 
     */
    getShipperDetails(shipperId : number) : Observable<Shipper>{
      return this.http.get<Shipper>(`${this.host}/shipper/get-detail/` + shipperId)
    }
}
