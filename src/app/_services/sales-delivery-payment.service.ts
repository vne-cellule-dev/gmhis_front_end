import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { salesDeliveryPayment } from '../_models/salesDeliveryPayment.model';

@Injectable({
  providedIn: 'root'
})
export class SalesDeliveryPaymentService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   *  get list of payments 
   * @returns 
   */
   findList(salesDeliveryId: number): Observable<salesDeliveryPayment[]> {
    return this.http.get<salesDeliveryPayment[]>(`${this.host}/sale-delivery-payment/list/`+salesDeliveryId)
  }

  /**
   *  create a new payment
   * @param Shipper 
   * @returns Shipper
   */
  save(data: any): Observable<salesDeliveryPayment> {
    return this.http.post<salesDeliveryPayment>(`${this.host}/sale-delivery-payment/add`, data)
  }

  /**
   * update a data
   * @param data 
   * @returns data
   */
  update(data: any): Observable<salesDeliveryPayment> {
    return this.http.put<salesDeliveryPayment>(`${this.host}/sale-delivery-payment/update/` + data.id, data)
  }

  /**
       * get details by Id
       * @param  paymentId
       * @returns 
       */
   getDetails(paymentId : number) : Observable<salesDeliveryPayment>{
    return this.http.get<salesDeliveryPayment>(`${this.host}/sale-delivery-payment/get-detail/` + paymentId)
  }

}
