import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Fundraising } from '../_models/fundraising.model';
import { PageList } from '../_models/page-list.model';

@Injectable({
  providedIn: 'root'
})
export class FundraisingService {


  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   *  get list of Fundraising
   * @returns Fundraising[]
   */
  findActive(): Observable<Fundraising[]> {
    return this.http.get<Fundraising[]>(`${this.host}/fundraising/active-list`)
  }


  /**
   * get all paginated Fundraising
   * @param data 
   * @returns PageList
   */
  findAll(data): Observable<PageList> {

    let customer = data['customer'] == null ? "" : data['customer'];
    let depot = data['depot'] == null ? "" : data['depot'];
    let collectedBy = data['collectedBy'] == null ? "" : data['collectedBy'];

    let queryParams = {};
    queryParams = {
      params: new HttpParams()
      .set('registerNumber', data['registerNumber'] ?? "")
      .set('date', data['date'])
      .set('customer', customer)
      .set('collectedBy', collectedBy)
      .set('page', data['page'])
      .set('size', data['size'] ?? "")
      .set('sort', data['sort'])
      .set('depot', depot)
    };

    return this.http.get<PageList>(`${this.host}/fundraising/list`, queryParams)
  }

  findAllSimpleList(data): Observable<any[]> {

    let customer = data['customer'] == null ? "" : data['customer'];
    let depot = data['depot'] == null ? "" : data['depot'];
    let collectedBy = data['collectedBy'] == null ? "" : data['collectedBy'];

    let queryParams = {};
    queryParams = {
      params: new HttpParams()
      .set('registerNumber', data['registerNumber'] ?? "")
      .set('date', data['date'])
      .set('customer', customer)
      .set('collectedBy', collectedBy)
      .set('depot', depot)
    };

    return this.http.get<any[]>(`${this.host}/fundraising/list-all`, queryParams)
  }

  /**
   * create a new Fundraising
   * @param Fundraising 
   * @returns Fundraising
   */
  save(fundraising: Fundraising): Observable<Fundraising> {
    return this.http.post<Fundraising>(`${this.host}/fundraising/add`, fundraising)
  }

  /**
   * update a Fundraising
   * @param Fundraising 
   * @returns Fundraising
   */
  update(fundraising: Fundraising): Observable<Fundraising> {
    return this.http.put<Fundraising>(`${this.host}/fundraising/update/` + fundraising.id, fundraising)
  }

  /**
     * get Fundraising details by Id
     * @param Fundraising 
     * @returns 
     */
   getFundraisingDetails(FundraisingId : number) : Observable<Fundraising>{
    return this.http.get<Fundraising>(`${this.host}/fundraising/get-detail/` + FundraisingId)
  }

   /**
     * get single Fundraising details by number
     * @param Fundraising 
     * @returns 
     */
    findByNumber(voucherNumber : string) : Observable<Fundraising>{
      return this.http.get<Fundraising>(`${this.host}/fundraising/find-by-number/${voucherNumber}`)
    }

  /**
   * revert a Fundraising
   * @param Fundraising 
   * @returns Fundraising
   */
  revert(id: number): Observable<Fundraising> {
    return this.http.get<Fundraising>(`${this.host}/fundraising/revert/${id}`)
  }

  /**
   * get all paginated Fundraising list
   * @param data 
   * @returns PageList
   */
   findCustomerActivity(data: any): Observable<Fundraising[]> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('customerId', data['customerId'])
        .set('date', data['date'] ?? "")
    };
    return this.http.get<Fundraising[]>(`${this.host}/fundraising/list-by-customer`, queryParams)
  }

}
