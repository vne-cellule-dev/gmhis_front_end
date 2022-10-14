import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FreightForwarder } from '../_models/freightForwarder.model';
import { PageList } from '../_models/page-list.model';

@Injectable({
  providedIn: 'root'
})
export class FreightForwarderService {

  
  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * get list of FreightForwarder active
   * @returns FreightForwarder[]
   */
  findActive(): Observable<FreightForwarder[]> {
    return this.http.get<FreightForwarder[]>(`${this.host}/freightForwarder/active-list`)
  }

  /**
   *  get all paginated FreightForwarder 
   * @param data 
   * @returns 
   */
  findAll(data): Observable<PageList> {

    let queryParams = {};

    queryParams = {
      params: new HttpParams()
      .set('criteria', data['criteria'])
      .set('criteriaType', data['criteriaType'])
      .set('page', data['page'])
      .set('size', data['size'] ?? "")
      .set('sort', data['sort'])
    };

    return this.http.get<PageList>(`${this.host}/freightForwarder/list`, queryParams)
  }

  /**
   *  create  a new  FreightForwarder
   * @param FreightForwarder 
   * @returns FreightForwarder
   */
  save(freightForwarder: FreightForwarder): Observable<FreightForwarder> {
    return this.http.post<FreightForwarder>(`${this.host}/freightForwarder/add`, freightForwarder)
  }

  /**
   *  update a FreightForwarder
   * @param FreightForwarder 
   * @returns FreightForwarder
   */
  update(freightForwarder: FreightForwarder): Observable<FreightForwarder> {
    return this.http.put<FreightForwarder>(`${this.host}/freightForwarder/update/` + freightForwarder.id, freightForwarder)
  }


  /**
   * get driver freight Forwarder by driver Id
   * @param freightForwarderId 
   * @returns 
   */
  getFreightForwarderDetails(freightForwarderId : number) : Observable<FreightForwarder>{
    return this.http.get<FreightForwarder>(`${this.host}/freightForwarder/get-detail/` + freightForwarderId)
  }
}
