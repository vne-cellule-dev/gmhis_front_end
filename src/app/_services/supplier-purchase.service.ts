import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageList } from '../_models/page-list.model';
import { SupplierPurchase } from '../_models/supplierPurchase.model';

@Injectable({
  providedIn: 'root'
})
export class SupplierPurchaseService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public findAllSupplierPurchases(data): Observable<PageList> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('page', data['page'])
        .set('date', data['date'] ?? "")
        .set('supplier', data['supplier'] ?? "")
        .set('createdBy', data['createdBy'] ?? "")
        .set('orderNumber', data['orderNumber'] ?? "")
        .set('invoiceNumber', data['invoiceNumber'] ?? "")
        .set('deliveryNoteNumber', data['deliveryNoteNumber'] ?? "")
        .set('size', data['size'] ?? "")
        .set('sort', data['sort'])
    };
    return this.http.get<PageList>(`${this.host}/supplier-purchase/list`, queryParams)
  }

  /**
   * get supplier purchase by id
   * @param supplierPurchase 
   * @returns 
   */
   public geSupplierPurchaseDetails(supplierPurchase: SupplierPurchase): Observable<SupplierPurchase> {
    return this.http.get<SupplierPurchase>(`${this.host}/supplier-purchase/get-details/` + supplierPurchase.id)
  }

  /**
   * create new supplier purchase
   * @param supplierPurchase 
   * @returns SupplierPurchase 
   */
  public saveSupplierPurchase(supplierPurchase : SupplierPurchase):Observable<SupplierPurchase>{
    return this.http.post<SupplierPurchase>(`${this.host}/supplier-purchase/add`, supplierPurchase);
  }

  /**
   * updated existing supplier purchase
   * @param supplierPurchase 
   * @returns SupplierPurchase
   */
  public updateSupplierPurchase(supplierPurchase : SupplierPurchase):Observable<SupplierPurchase>{
    return this.http.put<SupplierPurchase>(`${this.host}/supplier-purchase/update/`+supplierPurchase.id, supplierPurchase);
  }

  /**
   * delete existing supplier purchase
   * @param supplierPurchase 
   * @returns boolean
   */
  public deleteSupplierPurchase(supplierPurchase : SupplierPurchase):Observable<SupplierPurchase>{
    return this.http.delete<SupplierPurchase>(`${this.host}/supplier-purchase/delete/`+supplierPurchase.id);
  }

  
}
