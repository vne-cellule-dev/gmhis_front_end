import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageList } from 'src/app/_models/page-list.model';
import { RepairEstimate } from 'src/app/_models/repairEstimate.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RepairEstimateService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

 /**
  * get all repair estimate
  * @param data 
  * @returns 
  */
  getRepairEstimate(data : any):Observable<PageList> {
    let queryParams : {};
    queryParams = {
      params : new HttpParams()
      .set('date', data['date'] ?? "")
      .set('articleSav', data['articleSav'] ?? "")
      .set('customerName', data['customerName'] ?? "")
      .set('page', data['page'] ?? "")
      .set('size', data['size'] ?? "")
      .set('sort', data['sort'] ?? "")
    };
  return this.http.get<PageList>(`${this.host}/repair-estimate/list`, queryParams)
  }
  /**
   * create new 
   * @param repairEstimate 
   * @returns 
   */
  saveRepairEstimate(repairEstimate :RepairEstimate):Observable<RepairEstimate>{
    return this.http.post<RepairEstimate>(`${this.host}/repair-estimate/add`, repairEstimate)
  }
/**
 * updated exiting repairEstimate
 * @param repairEstimate 
 * @returns 
 */
  updateRepairEstimate(repairEstimate :RepairEstimate):Observable<RepairEstimate>{
    return this.http.put<RepairEstimate>(`${this.host}/repair-estimate/update/${repairEstimate.id}`, repairEstimate)
  }
/**
 * get existing repairEstimate details
 * @param repairEstimate 
 * @returns 
 */
  getRepairEstimateDetails(repairEstimate :RepairEstimate):Observable<RepairEstimate>{
    return this.http.get<RepairEstimate>(`${this.host}/repair-estimate/get-detail/${repairEstimate.id}`)
  }

  /**
   * simple list
   * @returns 
   */
  getAllRepairEstimate():Observable<RepairEstimate[]>{
    return this.http.get<RepairEstimate[]>(`${this.host}/repair-estimate/list-all`)
  }
}
