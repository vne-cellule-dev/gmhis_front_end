import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageList } from '../_models/page-list.model';
import { Planning } from '../_models/planning.model';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  private host = environment.apiUrl;
  
  constructor(private http : HttpClient) { }


/**
 * get list of Planing actif
 * @returns Planning[]
 */
  findActive(): Observable<Planning[]> {
    return this.http.get<Planning[]>(`${this.host}/planning/active-list`)
  }

   /**
   * get all paginated Bank
   * @param data 
   * @returns PageList
   */
    findAll(data): Observable<PageList> {

      let queryParams = {};
        queryParams = {
        params: new HttpParams()
          .set('page', data['page'])
          .set('size', data['size'] ?? "")
          .set('name', data['name'] ?? "")
          .set('sort', data['sort'])
      };
  
      return this.http.get<PageList>(`${this.host}/planning/list`, queryParams)
    }
  
 /**
   *   create a new Planning
   * @param Bank 
   * @returns Bank
   */
  save(planning: Planning): Observable<Planning> {
    return this.http.post<Planning>(`${this.host}/planning/add`, planning)
  }

   /**
   * update a planning
   * @param Planning 
   * @returns planning
   */
    update(planning:Planning): Observable<Planning> {
      return this.http.put<Planning>(`${this.host}/planning/update/` + planning.id, planning)
    }

    /**
     * get planning details by Id
     * @param planningId 
     * @returns 
     */
    getPlanningDetails(planningId : number) : Observable<Planning>{
      return this.http.get<Planning>(`${this.host}/planning/get-detail/` + planningId)
    }
}
