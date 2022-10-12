import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Invoice } from '../_models/invoice.model';
import { InvoiceTax } from '../_models/invoiceTax.model';
import { PageList } from '../_models/page-list.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

    /**
   * get active list no expired of invoice
   * @returns invoice[]
   */
     findAllInvoice(): Observable<Invoice[]> {
      return this.http.get<Invoice[]>(`${this.host}/invoice/listAll`)
    }
    
  /**
   * get active list no expired of invoice
   * @returns invoice[]
   */
  findNonExpired(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.host}/invoice/list-no-expired`)
  }

  /**
   * get all paginated invoice list
   * @param data 
   * @returns PageList
   */
  findAll(data): Observable<PageList> {

    let queryParams = {};   
    queryParams = {
      params: new HttpParams()
      .set('invoiceNumber', data['invoiceNumber']  ?? "")
      .set('customer', data['customer']  ?? "" )
      .set('date', data['date'] ?? "")
      .set('page', data['page'])
      .set('size', data['size'] ?? "")
      .set('sort', data['sort'])
    };
    return this.http.get<PageList>(`${this.host}/invoice/list`, queryParams)
  }

  /**
   * for print
   * @param data 
   * @returns 
   */
  findAllSimplePage(data): Observable<Invoice[]> {

    let queryParams = {};   
    queryParams = {
      params: new HttpParams()
      .set('invoiceNumber', data['invoiceNumber']  ?? "")
      .set('customer', data['customer']  ?? "" )
      .set('date', data['date'] ?? "")
    };
    return this.http.get<Invoice[]>(`${this.host}/invoice/list-all`, queryParams)
  }

  /**
   *  create a new invoice
   * @param invoice 
   * @returns invoice
   */
  save(invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(`${this.host}/invoice/add`, invoice)
  }

  /**
   *  update a invoice
   * @param invoice 
   * @returns invoice
   */
  update(invoice: Invoice): Observable<Invoice> {
    return this.http.put<Invoice>(`${this.host}/invoice/update/` + invoice.id, invoice)
  }

  /**
   * get invoice details by invoice Id
   * @param invoiceId 
   * @returns 
   */
  getinvoiceDetails(invoiceId : number) : Observable<Invoice>{
    return this.http.get<Invoice>(`${this.host}/invoice/get-detail/` + invoiceId)
  }

  /**
   * get invoice article by invoice Id
   * @param invoiceId 
   * @returns 
   */
   getinvoiceArticles(invoiceId : number) : Observable<any[]>{
    return this.http.get<any[]>(`${this.host}/invoice/articles/` + invoiceId)
  }


/**
 * 
 * @param invoice 
 * @returns 
 */
deleteinvoice(invoice : Invoice): Observable<Invoice>{
  return this.http.delete<Invoice>(`${this.host}/invoice/delete/`+invoice.id)
}

/**
   * get invoice Tax by tax name
   * @param taxName
   * @returns 
   */
 getinvoiceTax(taxName : string) : Observable<InvoiceTax>{
  return this.http.get<InvoiceTax>(`${this.host}/invoice-tax/` + taxName)
}

/**
   *List all invoice by invoice number
  */
   findAllInvoiceByInvoiceNumber(data:string): Observable<Invoice[]> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('number', data)
    };
    return this.http.get<Invoice[]>(`${this.host}/invoice/invoice-list`, queryParams)
  }
}
