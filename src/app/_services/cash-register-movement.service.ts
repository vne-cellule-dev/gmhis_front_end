import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageList } from '../_models/page-list.model';

@Injectable({
  providedIn: 'root'
})
export class CashRegisterMovementService {

  private readonly apiUrl = environment.apiUrl;
  constructor(private http : HttpClient) { }


 /**
  * It returns an Observable of type PageList, which is a class that contains a list of CrMovement and
  * a pagination object
  * @param data - {
  * @returns A list of cash register movements
  */
  public getPaginatedListOfCrMovement(data) : Observable<PageList>{
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
      .set('page', data['page'])
      .set('size', data['size'] ?? '')
      .set('cashRegister', data['cashRegister'])
      .set('prestationNumber', data['prestationNumber'])
      .set('state', data['state'] ?? '')
      .set('sort', data['sort'])
    }
    return this.http.get<PageList>(`${this.apiUrl}/api/v1/cashRegisterMovement`, queryParams);
  }
}
