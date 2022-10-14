import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContainerCost } from '../_models/containerCost.model';
import { PageList } from '../_models/page-list.model';

@Injectable({
  providedIn: 'root'
})
export class ContainercostService {


  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   *  get list of containerCost avtive
   * @returns containerCost[]
   */
  findActive(): Observable<ContainerCost[]> {
    return this.http.get<ContainerCost[]>(`${this.host}/container-cost/list-active`)
  }


  /**
   * get all paginated containerCost
   * @param data 
   * @returns PageList
   */
  findAll(): Observable<ContainerCost[]> {
    return this.http.get<ContainerCost[]>(`${this.host}/container-cost/list`)
  }

  /**
   *   create a new ContainerCost
   * @param ContainerCost 
   * @returns ContainerCost
   */
  save(containerCost: ContainerCost): Observable<ContainerCost> {
    return this.http.post<ContainerCost>(`${this.host}/container-cost/add`, containerCost)
  }

  /**
   * update a ContainerCost
   * @param ContainerCost 
   * @returns ContainerCost
   */
  update(containerCost: ContainerCost): Observable<ContainerCost> {
    return this.http.put<ContainerCost>(`${this.host}/container-cost/update/` + containerCost.id, containerCost)
  }

/**
 * grt container cost detail  by Id
 * @param containerCostId 
 * @returns 
 */
  getContainerCostDetails(containerCostId : number) : Observable<ContainerCost>{
    return this.http.get<ContainerCost>(`${this.host}/container-cost/get-detail/` +containerCostId)
  }

}
