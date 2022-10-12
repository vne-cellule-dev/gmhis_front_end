import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FundraisingPurchaseService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  findAllFundraisingByYear(data): Observable<any> {

    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('year', data['year'])
    };

    return this.http.get<any>(`${this.host}/stat/list-fundraising`, queryParams)
  }

  findAllPurchaseByYear(data): Observable<any> {

    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('year', data['year'])
    };

    return this.http.get<any>(`${this.host}/stat/list-purchase`, queryParams)
  }

  findStatYear(): Observable<any[]> {
    return this.http.get<any[]>(`${this.host}/stat/list-year`)
  }

  /**
   * Return the evolution of delivery in the fiscal years
   * @returns 
   */
  deliveryEvolution(): Observable<any[]> {
    return this.http.get<any[]>(`${this.host}/stat/delivery-evolution`)
  }

  /**
   * Return the evolution of fundraising in the fiscal years
   * @returns 
   */
  fundraisingEvolution(): Observable<any[]>{
    return this.http.get<any[]>(`${this.host}/stat/fundraising-evolution`) 
  }
/**
 *  Return the evolution of fundraising and delivery in the fiscal years
 * @returns 
 */
  fundraisingSaleEvolution(data): Observable<any[]>{
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('year', data['year'])
    };
    return this.http.get<any[]>(`${this.host}/stat/fundraising-sales-evolution`, queryParams) 
  }

  expensePerMonth(){
    

  }

}
