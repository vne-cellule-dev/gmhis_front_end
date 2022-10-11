import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Complaint } from 'src/app/_models/complaint.model';
import { PageList } from 'src/app/_models/page-list.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
 
  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

 /**
  * get all complaint
  * @param data 
  * @returns 
  */
  getComplaint(data : any):Observable<PageList> {
    let queryParams : {};
    queryParams = {
      params : new HttpParams()
      .set('date', data['date'] ?? "")
      .set('customer', data['customer'] ?? "")
      .set('article', data['article'] ?? "")
      .set('complaintNumber', data['complaintNumber'] ?? "")
      .set('customerName', data['customerName'] ?? "")
      .set('code', data['code'] ?? "")
      .set('complaintOut', data['complaintOut'] ?? "")
      .set('page', data['page'] ?? "")
      .set('size', data['size'] ?? "")
      .set('sort', data['sort'] ?? "")
    };
  return this.http.get<PageList>(`${this.host}/complaint-sav/list`, queryParams)
  }
  /**
   * create new 
   * @param complaint 
   * @returns 
   */
  saveComplaint(complaint : Complaint):Observable<Complaint>{
    return this.http.post<Complaint>(`${this.host}/complaint-sav/add`, complaint)
  }
/**
 * updated exiting complaint
 * @param complaint 
 * @returns 
 */
  updateComplaint(complaint : Complaint):Observable<Complaint>{
    return this.http.put<Complaint>(`${this.host}/complaint-sav/update/${complaint.id}`, complaint)
  }
/**
 * get existing complaint details
 * @param complaint 
 * @returns 
 */
  getComplaintDetails(complaint : Complaint):Observable<Complaint>{
    return this.http.get<Complaint>(`${this.host}/complaint-sav/get-details/${complaint.id}`)
  }

  deleteComplaint(complaint: Complaint) {
    return this.http.delete<Complaint>(`${this.host}/complaint-sav/delete/${complaint.id}`)
  }


  deleteComplaintByCodeAnsArticle(code: string, article: any) {
    let queryParams : {};
    queryParams = {
      params : new HttpParams()
      .set('code', code)
      .set('article', article)
    }
    return this.http.delete<Complaint>(`${this.host}/complaint-sav/delete-by-code`, queryParams)
  }


  getComplaintArticleQtyByCustomer(articleReference: String) {
    return this.http.get<any[]>(`${this.host}/complaint-sav/getComplaintArticleQtyByCustomer/${articleReference}`)
  }
}
