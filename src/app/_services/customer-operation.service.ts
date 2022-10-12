import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageList } from '../_models/page-list.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerOperationService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  
/********************START LIST OF ALL CUSTOMER OPERATION ************************ */
/**
   *  
   * Paginated list of all entries, credits and payments by customer 
   * @param data 
   * @returns PageList
   */
 findAllOperation(data): Observable<PageList> {

  let queryParams = {};

  queryParams = {
    params: new HttpParams()
      .set('date', data['date'])
      .set('customerId', data['customerId'])
      .set('page', data['page'])
      .set('size', data['size'] ?? "")
      .set('sort', data['sort'])
  };

  return this.http.get<PageList>(`${this.host}/cutomer-operation/list-all-follow-up`, queryParams)
}

/**
   *  
   * simple list of all entries, credits and payments by customer 
   * @param data 
   * @returns 
   */
 findList(data): Observable<any[]> {

  let queryParams = {};

  queryParams = {
    params: new HttpParams()
      .set('date', data['date'])
      .set('customerId', data['customerId'])
  };

  return this.http.get<any[]>(`${this.host}/cutomer-operation/list-all-simple-follow-up`, queryParams)
}


/********************END OF ALL CUSTOMER OPERATION************************ */


/********************START LIST OF CUSTOMER ASSET HISTORY************************ */
/**
   *  Paged list of asset history by client
   * @param data 
   * @returns PageList
   */
 findAllCustomerAssetHistory(data): Observable<PageList> {

  let queryParams = {};

  queryParams = {
    params: new HttpParams()
      .set('date', data['date'])
      .set('customerId', data['customerId'])
      .set('page', data['page'])
      .set('size', data['size'] ?? "")
      .set('sort', data['sort'])
  };

  return this.http.get<PageList>(`${this.host}/cutomer-operation/list-asset-follow-up`, queryParams)
}

/********************END OF CUSTOMER ASSET HISTORY************************ */

/********************START LIST CUSTOMER ENTRIES HISTORY************************ */
/**
   * 
Paged list of history Entries by client
   * @param data 
   * @returns PageList
   */
 findAllCustomerEntriesHistory(data): Observable<PageList> {

  let queryParams = {};

  queryParams = {
    params: new HttpParams()
      .set('date', data['date'])
      .set('customerId', data['customerId'])
      .set('page', data['page'])
      .set('size', data['size'] ?? "")
      .set('sort', data['sort'])
  };

  return this.http.get<PageList>(`${this.host}/cutomer-operation/list-follow-up`, queryParams)
}

/********************END CUSTOMER ENTRIES HISTORY************************ */


/********************START LIST CUSTOMER ALL SALE************************ */


/**
   * Paged list of all sale by customer 
   * @param data 
   * @returns 
   */
findAllCustomerSale(data): Observable<PageList> {

  let queryParams = {};

  queryParams = {
    params: new HttpParams()
      .set('date', data['date'])
      .set('customerId', data['customerId'])
      .set('page', data['page'])
      .set('size', data['size'] ?? "")
      .set('sort', data['sort'])
  };

  return this.http.get<PageList>(`${this.host}/cutomer-operation/list-sale`, queryParams)
}

/********************END CUSTOMER ALL SALE************************ */


getAllOperationWithPreviousBalance(operations: any[], customerBalance : number){
  let initialBalance = 0;
  let previousBalance = 0;
  let newOperations = [];
  for (let index = operations.length - 1; index >= 0; index--) {

    const element = operations[index];
    const nE = operations[index - 1];
    const operationType = element[13];

    if(index == operations.length - 1) {
      element[10] = customerBalance;
      if (operationType == 0) {
        previousBalance = customerBalance - element[3];
      } else {
        previousBalance =  customerBalance + element[3];
      }      
    } else {
      element[10] = previousBalance;
      if (operationType == 0) {
        previousBalance = previousBalance - element[3];
      } else {
        previousBalance =  previousBalance + element[3];
      }    
    }

    if(index == 0) {
      
      if (operationType == 0) {
        initialBalance  = element[10] - element[3];
      } else {
        initialBalance = element[10] + element[3];
      }   
    }
    newOperations[index] = element;
  }

  let response = [];
  response.push(newOperations);
  response.push(initialBalance);
  return response;
}
}
