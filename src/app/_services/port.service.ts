import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageList } from '../_models/page-list.model';
import { Port } from '../_models/port.model';

@Injectable({
  providedIn: 'root'
})
export class PortService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   *  get list of Port 
   * @returns Port[]
   */
  findActive(): Observable<Port[]> {
    return this.http.get<Port[]>(`${this.host}/port/active-list`)
  }


  /**
   * get all paginated Port
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

    return this.http.get<PageList>(`${this.host}/port/list`, queryParams)
  }

  /**
   * create a new Port
   * @param Port 
   * @returns Port
   */
  save(port: Port): Observable<Port> {
    return this.http.post<Port>(`${this.host}/port/add`, port)
  }

  /**
   * update a Port
   * @param Port 
   * @returns Port
   */
  update(port: Port): Observable<Port> {
    return this.http.put<Port>(`${this.host}/port/update/` + port.id, port)
  }

  /**
     * get port details by Id
     * @param portId 
     * @returns 
     */
   getPortDetails(portId : number) : Observable<Port>{
    return this.http.get<Port>(`${this.host}/port/get-detail/` + portId)
  }
}
