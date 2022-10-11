import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageList } from '../_models/page-list.model';
import { TechnicianAss } from '../_models/TechnicianAss.model';

@Injectable({
  providedIn: 'root'
})
export class TechnicianAssService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * get active list of TechnicianAss
   * @returns TechnicianAss[]
   */
  findActive(): Observable<TechnicianAss[]> {
    return this.http.get<TechnicianAss[]>(`${this.host}/technician-ass/active-list`)
  }


  /**
   * get all paginated TechnicianAss list
   * @param data 
   * @returns PageList
   */
  findAll(data): Observable<PageList> {

    let queryParams = {};

    queryParams = {
      params: new HttpParams()
        .set('page', data['page'])
        .set('size', data['size'] ?? "")
        .set('firstName', data['firstName'])
        .set('lastName', data['lastName'])
        .set('phone', data['phone'])
        .set('sort', data['sort'])
    };


    return this.http.get<PageList>(`${this.host}/technician-ass/list`, queryParams)
  }

  /**
   *  create  a new  TechnicianAss
   * @param TechnicianAss 
   * @returns TechnicianAss
   */
  save(TechnicianAss: TechnicianAss): Observable<TechnicianAss> {
    return this.http.post<TechnicianAss>(`${this.host}/technician-ass/add`, TechnicianAss)
  }

  /**
   *  update a TechnicianAss
   * @param TechnicianAss 
   * @returns TechnicianAss
   */
  update(TechnicianAss: TechnicianAss): Observable<TechnicianAss> {
    return this.http.put<TechnicianAss>(`${this.host}/technician-ass/update/` + TechnicianAss.id, TechnicianAss)
  }

  /**
   * get TechnicianAss details by TechnicianAss Id
   * @param TechnicianAssId 
   * @returns 
   */
  getTechnicianAssDetails(TechnicianAssId : number) : Observable<TechnicianAss>{
    return this.http.get<TechnicianAss>(`${this.host}/technician-ass/get-detail/` + TechnicianAssId)
  }
}
