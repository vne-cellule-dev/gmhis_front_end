import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageList } from '../_models/page-list.model';
import { Supplier } from '../_models/supplier.model';
import { SupplierFamily } from '../_models/supplierFamily.model';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /***************************************************** START SUPPLIER FAMILY SERVICE *******************************************/

  /**
   * get list of SupplierFamily active
   * @returns SupplierFamily[]
   */
  findActiveFamilies(): Observable<SupplierFamily[]> {
    return this.http.get<SupplierFamily[]>(`${this.host}/supplier-family/active-list`)
  }


  /**
   * find all paginated supplier families
   * @param data 
   * @returns PageList
   */
  findAllFamily(data): Observable<PageList> {

    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('page', data['page'])
        .set('size', data['size'] ?? "")
        .set('name', data['name'])
        .set('isActive', data['isActive'] ?? "")
        .set('sort', data['sort'])
    };
    return this.http.get<PageList>(`${this.host}/supplier-family/list`, queryParams)
  }

  /**
   * save a SupplierFamily
   * @param supplierFamily 
   * @returns SupplierFamily
   */
  saveFamily(supplierFamily: SupplierFamily): Observable<SupplierFamily> {
    return this.http.post<SupplierFamily>(`${this.host}/supplier-family/add`, supplierFamily)
  }

  /**
   * update a SupplierFamily
   * @param supplierFamily 
   * @returns SupplierFamily
   */
  updateFamily(supplierFamily: SupplierFamily): Observable<SupplierFamily> {
    return this.http.put<SupplierFamily>(`${this.host}/supplier-family/update/` + supplierFamily.id, supplierFamily)
  }

   /**
     * get stock SupplierFamily details by Id
     * @param stockEntryId 
     * @returns 
     */
    getSupplierFamilyDetails(supplierFamilyId : number) : Observable<SupplierFamily>{
      return this.http.get<SupplierFamily>(`${this.host}/supplier-family/get-detail/` + supplierFamilyId)
    }

  /*END SUPPLIER FAMILY SERVICE */


  /*********************************************START SUPPLIER  SERVICE ************************************************/

  /**
   * get list of Supplier active
   * @returns Supplier[]
   */
  findActiveSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${this.host}/supplier/active-list`)
  }


  /**
   * get all paginated Supplier 
   * @param data 
   * @returns PageList
   */
  findAllSuppliers(data): Observable<PageList> {

    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('criteria', data['criteria'])
        .set('criteriaType', data['criteriaType'])
        .set('page', data['page'])
        .set('size', data['size'] ?? "")
        .set('sort', data['sort'])
    };
    return this.http.get<PageList>(`${this.host}/supplier/list`, queryParams)
  }

  /**
   * add a Supplier
   * @param supplier 
   * @returns Supplier
   */
  addSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(`${this.host}/supplier/add`, supplier)
  }

  /**
   * update a Supplier
   * @param supplier 
   * @returns Supplier
   */
  updateSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.put<Supplier>(`${this.host}/supplier/update/` + supplier.id, supplier)
  }

    /**
       * get stock supplier details by Id
       * @param stockEntryId 
       * @returns 
       */
    getSupplierDetails(supplierId : number) : Observable<Supplier>{
      return this.http.get<Supplier>(`${this.host}/supplier/get-detail/` + supplierId)
    }

  /*END SUPPLIER  SERVICE */
}
