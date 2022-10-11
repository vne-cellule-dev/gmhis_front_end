import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomerOrder } from '../_models/customerOder.model';
import { PageList } from '../_models/page-list.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerOrderService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }
  /**
   * find all paginated customer order
   * @param data 
   * @returns PageList
   */
   findAllOrder(data): Observable<PageList> {
    let queryParams = {};
    
    queryParams = {
      params: new HttpParams()
        .set('page', data['page'])
        .set('size', data['size'] ?? "")
        .set('date', data['date'] ?? "")
        .set('criteria', data['criteria'] ?? "")
        .set('criteriaType', data['criteriaType'])
        .set('depot', data['depot'])
        .set('sort', data['sort'])
    };
    return this.http.get<PageList>(`${this.host}/customer-order/list`, queryParams)
  }

   /**
   * get article ordered detail by articleiD
   * @param CustomerOrderId 
   * @returns 
   */
    geCustomerOrderDetails(CustomerOrderId : number) : Observable<CustomerOrder>{
      return this.http.get<CustomerOrder>(`${this.host}/customer-order/get-detail/` +CustomerOrderId)
    }

  /**
   * save a customer order
   * @param CustomerOrder 
   * @returns CustomerOrder
   */
  saveOrder(CustomerOrder: CustomerOrder): Observable<CustomerOrder> {
    return this.http.post<CustomerOrder>(`${this.host}/customer-order/add`, CustomerOrder)
  }

  /**
   * update a customer order
   * @param CustomerOrder 
   * @returns customer order
   */
  updateOrder(CustomerOrder: CustomerOrder): Observable<CustomerOrder> {
    return this.http.put<CustomerOrder>(`${this.host}/customer-order/update/` + CustomerOrder.id, CustomerOrder)
  }

  /**
   * get detail of a customer order
   * @param billOfLading 
   * @returns 
   */
     getcustomerOrderDetail(id: number): Observable<CustomerOrder> {
      return this.http.get<CustomerOrder>(`${this.host}/customer-order/get-detail/${id}`)
    }
    /**
 * 
 * @param Estimate 
 * @returns 
 */
deleteCustomerOrder(CustomerOrder : CustomerOrder): Observable<CustomerOrder>{
  return this.http.delete<CustomerOrder>(`${this.host}/customer-order/delete/`+CustomerOrder.id)
}

getCustomerArticleOrdered(customerOder : CustomerOrder) : Observable<any>{
  return this.http.get<any>(`${this.host}/customer-order/list-cutomer-article-ordered/${customerOder.id}`)
}

getCustomerOderToDelivery(): Observable<any>{
  return this.http.get<any>(`${this.host}/customer-order/order-to-delivery`)
}

MakeCustomerOrderAsCompleted(CustomerOrder : CustomerOrder): Observable<CustomerOrder>{
  return this.http.put<CustomerOrder>(`${this.host}/customer-order/make_as_perform/`+CustomerOrder.id, CustomerOrder)
}

}
