import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageList } from '../_models/page-list.model';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  findAll(data): Observable<PageList> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('patientExternalId', data['patientExternalId'])
        .set('firstName', data['firstName'] ?? '')
        .set('lastName', data['lastName'] ?? '')
        .set('cellPhone', data['cellPhone'] ?? '')
        .set('cnamNumber', data['cnamNumber'] ?? '')
        .set('idCardNumber', data['idCardNumber'] ?? '')
        .set('page', data['page'])
        .set('size', data['size'] ?? '')
        .set('sort', data['sort']),
    };

    return this.http.get<PageList>(
      `${this.apiUrl}/patient/p_list`,
      queryParams
    );
  }

  findPatient(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/patient/p_list`);
  }

  createPatient(patient: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/patient/add`, patient);
  }

  updatePatient(patient: any): Observable<any> {
    console.log(patient);
    
    return this.http.put<any>(
      `${this.apiUrl}/patient/update/${patient.id}`,
      patient
    );
  }

  getPatientDetail(patient: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/patient/detail/${patient}`);
  }

  getCountry(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/country/names`);
  }

  getCityByCountry(idCountry: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/country/cities_name/${idCountry}`
    );
  }

  
}
