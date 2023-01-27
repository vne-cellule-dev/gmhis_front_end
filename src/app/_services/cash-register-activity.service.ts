import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICashRegisterActivity } from '../_models/cash-register-activity';
import { PageList } from '../_models/page-list.model';

@Injectable({
  providedIn: 'root'
})
export class CashRegisterActivityService {

  private readonly apiUrl = environment.apiUrl;
  constructor(private http : HttpClient) { }


 /**
  * It returns an observable of type PageList, which is a class that contains a list of CrActivity
  * objects and a pagination object
  * @param data - {
  * @returns A paginated list of CrActivity objects.
  */
   public getPaginatedListOfCrActivity(data) : Observable<PageList>{
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
      .set('page', data['page'])
      .set('size', data['size'] ?? '')
      .set('cashier', data['cashier'])
      .set('cashRegister', data['cashRegister'])
      .set('state', data['state'] ?? '')
      .set('sort', data['sort'])
    }
    return this.http.get<PageList>(`${this.apiUrl}/api/v1/cashRegisterManagement`, queryParams);
  }



 /**
  * This function is used to get the cash register activity by id
  * @param {number} crActivity - The id of the cash register activity you want to get.
  * @returns The getCrActivityById method returns an observable of type any.
  */
  public getCrActivityById(crActivity : number): Observable<any>{
    return this.http.get(`${this.apiUrl}/api/v1/cashRegisterManagement/${crActivity}`);
  }


 /**
  * It takes a `ICashRegisterActivity` object as a parameter, and returns an
  * `Observable<ICashRegisterActivity>` object
  * @param {ICashRegisterActivity} crActivityDto - This is the object that we are going to send to the
  * server.
  * @returns Observable<ICashRegisterActivity>
  */
  public createAct(crActivityDto : ICashRegisterActivity): Observable<ICashRegisterActivity>{    
    return this.http.post<ICashRegisterActivity>(`${this.apiUrl}/api/v1/cashRegisterManagement`, crActivityDto)
  }

/**
 * This function takes in a CashRegisterActivity object and updates the database with the new values
 * @param {ICashRegisterActivity} crActivityDto - ICashRegisterActivity - this is the object that we
 * are sending to the server.
 * @returns Observable<ICashRegisterActivity>
 */
  public updateAct(crActivityDto : ICashRegisterActivity) : Observable<ICashRegisterActivity>{
    return this.http.put<ICashRegisterActivity>(`${this.apiUrl}/act/update/${crActivityDto.id}`, crActivityDto)
  }
}
