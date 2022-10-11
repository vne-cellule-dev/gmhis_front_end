import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComplaintPlanning } from 'src/app/_models/complaintPlanning.model';
import { PageList } from 'src/app/_models/page-list.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComplaintPlanningService {


  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

 /**
  * get all complaint planning
  * @param data 
  * @returns 
  */
  getComplaintPlanning(data : any):Observable<PageList> {
    let queryParams : {};
    queryParams = {
      params : new HttpParams()
      .set('date', data['date'] ?? "")
      .set('complaintNumber', data['complaintNumber'] ?? "")
      .set('page', data['page'] ?? "")
      .set('size', data['size'] ?? "")
      .set('sort', data['sort'] ?? "")
    };
  return this.http.get<PageList>(`${this.host}/complaint-sav-planing/list`, queryParams)
  }
  /**
   * create new 
   * @param complaintPlannig 
   * @returns 
   */
  saveComplaintPlanning(complaintPlannig :ComplaintPlanning):Observable<ComplaintPlanning>{
    return this.http.post<ComplaintPlanning>(`${this.host}/complaint-sav-planing/add`, complaintPlannig)
  }
/**
 * updated exiting complaintPlannig
 * @param complaintPlannig 
 * @returns 
 */
  updateComplaintPlanning(complaintPlannig :ComplaintPlanning):Observable<ComplaintPlanning>{
    return this.http.put<ComplaintPlanning>(`${this.host}/complaint-sav-planing/update/${complaintPlannig.id}`, complaintPlannig)
  }
/**
 * get existing complaintPlannig details
 * @param complaintPlannig 
 * @returns 
 */
  getComplaintPlanningDetails(complaintPlannig :ComplaintPlanning):Observable<ComplaintPlanning>{
    return this.http.get<ComplaintPlanning>(`${this.host}/complaint-sav-planing/get-detail/${complaintPlannig.id}`)
  }

  /**
   * simple list
   * @returns 
   */
  getAllComplaintPlanning():Observable<ComplaintPlanning[]>{
    return this.http.get<ComplaintPlanning[]>(`${this.host}/complaint-sav-planing/list-all`)
  }
}
