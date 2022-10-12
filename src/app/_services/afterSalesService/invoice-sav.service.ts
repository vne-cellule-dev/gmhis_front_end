import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InvoiceSaa } from 'src/app/_models/invoiceSaa.model';
import { PageList } from 'src/app/_models/page-list.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceSavService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

 /**
  * get all invoiceSaa
  * @param data 
  * @returns 
  */
  getAllInvoiceSaa(data : any):Observable<PageList> {
    let queryParams : {};
    queryParams = {
      params : new HttpParams()
      .set('customer', data['customer'] ?? "")
      .set('invoiceNumber', data['invoiceNumber'] ?? "")
      .set('date', data['date'] ?? " ")
      .set('page', data['page'] ?? "")
      .set('size', data['size'] ?? "")
      .set('sort', data['sort'] ?? "")
    };
  return this.http.get<PageList>(`${this.host}/invoice-ass/list`, queryParams)
  }
  /**
   * create new   
   * @param invoiceSaa 
   * @returns 
   */
  saveInvoiceSaa(invoiceSaa : InvoiceSaa):Observable<InvoiceSaa>{
    return this.http.post<InvoiceSaa>(`${this.host}/invoice-ass/add`, invoiceSaa)
  }
/**
 * updated exiting invoiceSaa
 * @param invoiceSaa 
 * @returns 
 */
  updateInvoiceSaa(invoiceSaa : InvoiceSaa):Observable<InvoiceSaa>{
    return this.http.put<InvoiceSaa>(`${this.host}/invoice-ass/update/${invoiceSaa.id}`, invoiceSaa)
  }
/**
 * get existing invoiceSaa details
 * @param invoiceSaa 
 * @returns 
 */
  getInvoiceSaaDetails(invoiceSaa : InvoiceSaa):Observable<InvoiceSaa>{
    return this.http.get<InvoiceSaa>(`${this.host}/invoice-ass/get-detail/${invoiceSaa.id}`)
  }

  /**
   * 
   * @returns 
   */
  getInvoiceSaaSimpleList():Observable<InvoiceSaa[]>{
    return this.http.get<InvoiceSaa[]>(`${this.host}/invoice-ass/list-all`)
  }

  getAllInvoiceAssForPrint(data : any):Observable<any> {
    let queryParams : {};
    queryParams = {
      params : new HttpParams()
      .set('customer', data['customer'] ?? "")
      .set('invoiceNumber', data['invoiceNumber'] ?? "")
      .set('date', data['date'] ?? " ")
    };
  return this.http.get<any>(`${this.host}/invoice-ass/simple-list`, queryParams)
  }
}
