import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Estimate } from '../_models/estimate.model';
import { PageList } from '../_models/page-list.model';

@Injectable({
  providedIn: 'root'
})
export class EstimateService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * get active list of devis
   * @returns Estimate[]
   */
   findActive(): Observable<Estimate[]> {
    return this.http.get<Estimate[]>(`${this.host}/estimate/active-list`)
  }

  /**
   * get all paginated Estimate list
   * @param data 
   * @returns PageList
   */
  findAll(data): Observable<PageList> {

    let queryParams = {};

    queryParams = {
      params: new HttpParams()
      .set('criteria', data['criteria']  ?? "")
      .set('criteriaType', data['criteriaType'] ?? "")
      .set('date', data['date'] ?? "")
      .set('page', data['page'])
      .set('size', data['size'] ?? "")
      .set('sort', data['sort'])
    };
    return this.http.get<PageList>(`${this.host}/estimate/list`, queryParams)
  }

  /**
   *  create a new Estimate
   * @param estimate 
   * @returns Estimate
   */
  save(estimate: Estimate): Observable<Estimate> {
    return this.http.post<Estimate>(`${this.host}/estimate/add`, estimate)
  }

  /**
   *  update a Estimate
   * @param estimate 
   * @returns Estimate
   */
  update(estimate: Estimate): Observable<Estimate> {
    return this.http.put<Estimate>(`${this.host}/estimate/update/` + estimate.id, estimate)
  }

  /**
   * get driver details by Estimate Id
   * @param estimateId 
   * @returns 
   */
  getEstimateDetails(estimateId : number) : Observable<Estimate>{
    return this.http.get<Estimate>(`${this.host}/estimate/get-detail/` + estimateId)
  }


  /**
 * 
 * @param Estimate 
 * @returns 
 */
deleteEstimate(estimate : Estimate): Observable<Estimate>{
  return this.http.delete<Estimate>(`${this.host}/estimate/delete/`+estimate.id)
}

}
