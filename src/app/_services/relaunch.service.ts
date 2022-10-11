import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageList } from '../_models/page-list.model';

@Injectable({
  providedIn: 'root'
})
export class RelaunchService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }
    /**
   * get all paginated relaunch list
   * @param data 
   * @returns PageList
   */
     findAll(data): Observable<PageList> {

      let queryParams = {};
  
      queryParams = {
        params: new HttpParams()
        .set('customerId', data['customerId']  ?? "")
        .set('invoiceNumber', data['invoiceNumber']  ?? "")
        .set('deliveryNumber', data['deliveryNumber']  ?? "")
        .set('page', data['page'])
        .set('size', data['size'] ?? "")
        .set('sort', data['sort'])
      };
      return this.http.get<PageList>(`${this.host}/sales-delivery/list-expired`, queryParams)
    }

    getNumberOfInvoiceTorelaunch(){
      return this.http.get<number>(`${this.host}/sales-delivery/sale-to-relaunch`)
    }
}
