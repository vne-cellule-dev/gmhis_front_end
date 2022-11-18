import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageList } from 'src/app/_models/page-list.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdmissionService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  findAll(data): Observable<PageList> {
    console.log(data);
    
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('patientExternalId', data['patientExternalId'])
        .set('admissionNumber', data['admissionNumber'])
        .set('admissionStatus', data['admissionStatus'])
        .set('firstName', data['firstName'] ?? '')
        .set('lastName', data['lastName'] ?? '')
        .set('cellPhone', data['cellPhone'] ?? '')
        .set('cnamNumber', data['cnamNumber'] ?? '')
        .set('idCardNumber', data['idCardNumber'] ?? '')
        .set('practician', data['practician'] ?? '')
        .set('service', data['service'] ?? '')
        .set('act', data['act'] ?? '')
        .set('facilityId', data["faciliTyId"] ?? '')
        .set('fromDate', data['fromDate'] ?? '')
        .set('toDate', data['toDate'] ?? '')
        .set('page', data['page'])
        .set('size', data['size'] ?? '')
        .set('sort', data['sort']),
    };

    return this.http.get<PageList>(
      `${this.apiUrl}/admission/p_list`,
      queryParams
    );
  }

  findAdmissionQueue(data: object): Observable<PageList> {

    let queryParams = {};
    queryParams = {
      params: new HttpParams().set('admissionNumber', data['admissionNumber'])
        .set('patientExternalId', data['patientExternalId'])
        .set('admissionNumber', data['admissionNumber'])
        .set('firstName', data['firstName'] ?? '')
        .set('lastName', data['lastName'] ?? '')
        .set('cellPhone', data['cellPhone'] ?? '')
        .set('cnamNumber', data['cnamNumber'] ?? '')
        .set('idCardNumber', data['idCardNumber'] ?? '')
        .set('practician', data['practician'] ?? '')
        .set('service', data['service'] ?? '')
        .set('act', data['act'] ?? '')
        .set('fromDate', data['fromDate'] ?? '')
        .set('toDate', data['toDate'] ?? '')
        .set('waitingRoom', data['waitingRoom'])
        .set('page', data['page'])
        .set('size', data['size'] ?? '')
        .set('sort', data['sort'])
       
    };

    return this.http.get<PageList>(environment.apiUrl + '/admission/queue/p_list', queryParams);

  }

  findAdmission(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admission/p_list`);
  }

  createAdmission(admission: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admission/add`, admission);
  }

  updateAdmission(admission: any): Observable<any> {
    console.log(admission);
    
    return this.http.put<any>(
      `${this.apiUrl}/admission/update/${admission.id}`,
      admission
    );
  }

  getAdmissionDetail(admission: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admission/get-detail/${admission.id}`);
  }

  getAdmissionDetailById(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admission/get-detail/${id}`);
  }


}
