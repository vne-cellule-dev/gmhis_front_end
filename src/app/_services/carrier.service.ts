import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Carrier } from '../_models/carrier.model';
import { PageList } from '../_models/page-list.model';

@Injectable({
  providedIn: 'root'
})
export class CarrierService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   *  get list of Carrier 
   * @returns Carrier[]
   */
  findActive(): Observable<Carrier[]> {
    return this.http.get<Carrier[]>(`${this.host}/carrier/active-list`)
  }


  /**
   * get all paginated Carrier
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

    return this.http.get<PageList>(`${this.host}/carrier/list`, queryParams)
  }

  /**
   * create a new Carrier
   * @param Carrier 
   * @returns Carrier
   */
  save(carrier: Carrier): Observable<Carrier> {
    return this.http.post<Carrier>(`${this.host}/carrier/add`, carrier)
  }

  /**
   * update a Carrier
   * @param Carrier 
   * @returns Carrier
   */
  update(carrier: Carrier): Observable<Carrier> {
    return this.http.put<Carrier>(`${this.host}/carrier/update/` + carrier.id, carrier)
  }

 /**
  * get carrier detail by Id
  * @param carrierId 
  * @returns 
  */
    getCarrierDetails(carrierId : number) : Observable<Carrier>{
      return this.http.get<Carrier>(`${this.host}/carrier/get-detail/` +carrierId)
    }
}
