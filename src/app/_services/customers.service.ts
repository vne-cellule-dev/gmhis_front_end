import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../_models/customer.model';
import { CustomerFamily } from '../_models/customerFamily.model';
import { CustomerGarantee } from '../_models/customerGarantee.model';
import { PageList } from '../_models/page-list.model';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  
  private host = environment.apiUrl;

  constructor(private http : HttpClient ) { }

  /********************************* START CUSTOMER FAMILY SERVICE ***********************************/

 
 /**
  * get list of customerFamily active
  * @returns 
  */
  findCustomerFamilyActive():Observable<CustomerFamily[]>{
    return this.http.get<CustomerFamily[]>(`${this.host}/customer-family/active-list`) ;
  }
  
    
  /**
   *  get all paginated customerFamily
   * @param data 
   * @returns 
   */
  findAllCustomerFamily(data):Observable<PageList>{
  
    let queryParams = {};
    queryParams = {
        params: new HttpParams()
          .set('page', data['page'])
          .set('size', data['size'] ?? "")
          .set('name', data['name'])
          .set('isActive', data['isActive'] ?? "")
          .set('sort', data['sort'])
    };
    return this.http.get<PageList>(`${this.host}/customer-family/list`, queryParams) ;
  }
    
/**
 * save a customerFamily
 * @param customerFamily 
 * @returns 
 */
  saveCustomerFamily(customerFamily:CustomerFamily):Observable<CustomerFamily>{
    return this.http.post<CustomerFamily>(`${this.host}/customer-family/add`, customerFamily) ;
  }
    
  /**
   * update a customerFamily
   * @param customerFamily 
   * @returns 
   */
  updateCustomerFamily(customerFamily:CustomerFamily):Observable<CustomerFamily>{
      return this.http.put<CustomerFamily>(`${this.host}/customer-family/update/`+customerFamily.id, customerFamily) ;
  }

  /*END CUSTOMER FAMILY SERVICE */



  /****************************  START CUSTOMER  SERVICE **********************************************************/

  
  /**
   * get list of Customer active
   * @returns 
   */
   findActiveCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.host}/customer/active-list`);
  }

   
  /**
   * get list of Customer active
   * @returns 
   */
   findExternalActiveCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.host}/customer/external-active-list`);
  }

  /**
   * get list of Customer active
   * @returns 
   */
   findActiveExternalCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.host}/customer/external-active-list`);
  }

  /**
   * get list of Customer active
   * @returns 
   */
   findActiveInternalCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.host}/customer/internal-active-list`);
  }

   /**
   * get list of Customer active goup by family
   * @returns 
   */
    findActiveGroupByFamily(): Observable<any[]> {
      return this.http.get<any[]>(`${this.host}/customer/active-list-by-family`);
    }

  /**
   * get list of Customer active
   * @returns 
   */
   findActiveWithoutCustomerInInventory(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.host}/customer/active-list-without-customer-in-inventory`);
  }


  /**
   * get all paginated Customer 
   * @param data 
   * @returns 
   */
  findAllCustomers(data): Observable<PageList> {

    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('criteria', data['criteria'] ?? "")
        .set('criteriaType', data['criteriaType'])
        .set('page', data['page'])
        .set('size', data['size'] ?? "")
        .set('sort', data['sort'])
    };
    return this.http.get<PageList>(`${this.host}/customer/list`, queryParams);
  }

  /**
   * add a Customer
   * @param Customer 
   * @returns 
   */
  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.host}/customer/add`, customer);
  }

  /**
   * update a Customer
   * @param Customer 
   * @returns 
   */
  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.host}/customer/update/` + customer.id, customer);
  }


   /**
   * follow a Customer
   * @param id 
   * @returns 
   */
  followCustomer(id: number): Observable<Customer> {
      return this.http.get<Customer>(`${this.host}/customer/follow-up/` + id);
    }

    /**
     * get customer detail by Id
     * @param customerId 
     * @returns 
     */
    getCustomerDetails(customerId : number) : Observable<Customer>{
      return this.http.get<Customer>(`${this.host}/customer/get-detail/` +customerId)
    }

  /*END CUSTOMER SERVICE */

  /**
   * 
   * @param Depot 
   * @returns 
   */
setCustomerInventoryState(customer: Customer):Observable<Customer>{
  return this.http.put<Customer>(`${this.host}/customer/inventory/` + customer.id, customer)
 
}

/**
  * get last customer inventenrory and last payement
 * @param customer 
 * @returns 
 */
getLastAction(customer : Customer):Observable<any>{
  return this.http.get<any>(`${this.host}/customer/last_actions/` +customer.id)
}

/**
   * get all paginated Customer 
   * @param data 
   * @returns 
   */
 findCustomersByName(name): Observable<Customer[]> {

  let queryParams = {};
  queryParams = {
    params: new HttpParams()
      .set('name', name ?? "")
  };
  return this.http.get<Customer[]>(`${this.host}/customer/customer-list`, queryParams);
}


deleteCustomer(customer : Customer): Observable<Customer>{
    return this.http.delete<Customer>(`${this.host}/customer/delete/`+customer.id)
}

/********************************STAR CUSTOMER GARANTEE *******************************/
 addGaranteeToCustomer(customer:Customer, formData:FormData):Observable<CustomerGarantee | HttpErrorResponse>{
  return this.http.put<CustomerGarantee>(`${this.host}/customer/garantee/` + customer.id, formData)
 }


/**
  * 
  * @param customer 
  * @param guaranteeImageUrl 
  */
createCustomerGaranteeFormData(customerGarantee : CustomerGarantee, guaranteeImageUrl : File){
const formData = new FormData();
formData.append('guarantorFirstName', customerGarantee.guarantorFirstName);
formData.append('guarantorLastName', customerGarantee.guarantorLastName);
formData.append('guarantorContact', customerGarantee.guarantorContact);
formData.append('guaranteeImageUrl',guaranteeImageUrl);
return formData
}

deleteCustomerGarantee(customer : Customer):Observable<Customer>{
  return this.http.put<Customer>(`${this.host}/customer/delete-guarantee/`+customer.id, customer)
}
/******************************* END CUSTOMER GARANTEE *******************************/


/******************************* dormant customer account *****************************/
 /**
   * get list of Customer dormant accounts active
   * @returns 
   */
  findDormantAccount(data: any): Observable<PageList> {
    let queryParams = {};
    queryParams = {
        params: new HttpParams()
          .set('page', data['page'])
          .set('size', data['size'] ?? "")
          .set('tradeName', data['tradeName'] ?? "")
          .set('sort', data['sort'])
    };
    return this.http.get<PageList>(`${this.host}/customer/dormant-accounts`, queryParams);
  }

  /**
   * get number of Customer dormant accounts active
   * @returns 
   */
   getDormantAccountNumber(): Observable<number> {
    return this.http.get<number>(`${this.host}/customer/dormant-accounts-number`);
  }

  /******************************* End dormant customer account *****************************/
}
