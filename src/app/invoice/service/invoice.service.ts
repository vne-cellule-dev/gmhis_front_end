import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageList } from 'src/app/_models/page-list.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private readonly apiUrl = environment.apiUrl;
 
  constructor(private http: HttpClient) {}

  createInvoice(invoice: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/bill/add`, invoice);
  }

  findAll(data): Observable<PageList> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('billNumber', data['billNumber'])
        .set('admissionNumber', data['admissionNumber'])
        .set('firstName', data['firstName'] ?? '')
        .set('lastName', data['lastName'] ?? '')
        .set('patientExternalId', data['patientExternalId'] ?? '')
        .set('cellPhone', data['cellPhone'] ?? '')
        .set('cnamNumber', data['cnamNumber'] ?? '')
        .set('idCardNumber', data['idCardNumber'] ?? '')
        .set('convention', data['convention'] ?? '')
        .set('insurance', data['insurance'] ?? '')
        .set('subscriber', data['subscriber'] ?? '')
        .set('fromDate', data['fromDate'] ?? '')
        .set('toDate', data['toDate'] ?? '')
        .set('billStatus', data['billStatus'] ?? '')
        .set('page', data['page'])
        .set('size', data['size'] ?? '')
        .set('sort', data['sort']),
    };

    return this.http.get<PageList>(
      `${this.apiUrl}/bill/p_list`,
      queryParams
    );
  }

  findAllInsuranceBil(data): Observable<PageList> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('insuranceId', data['insuranceId'])
        .set('date', data['date'])
        .set('page', data['page'])
        .set('size', data['size'] ?? '')
        .set('sort', data['sort']),
    };

    return this.http.get<PageList>(
      `${this.apiUrl}/bill/BillHasInsure_p_list`,
      queryParams
    );
  }

  getActCost(data: object): Observable<any[]> {

    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('conventionId', data['convention'] ?? '')
        .set('actId', data['act'])
    };

    return this.http.get<any[]>(environment.apiUrl + '/bill/get-act-cost', queryParams);

  }

  getCost(invoice: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/bill/get_cost', invoice);
  }

  collectAmount(payment: Object): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/bill/collect/', payment);
  }

    getInvoiceDetail(invoiceId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/bill/detail/${invoiceId}`);
  }

}


