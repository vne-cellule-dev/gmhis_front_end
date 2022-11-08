import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageList } from '../_models/page-list.model';
import { IUniteMesure } from './unite-mesure.model';

@Injectable({
  providedIn: 'root',
})
export class UniteMesureService {
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
      `${this.apiUrl}/unit_of_measure/list`,
      queryParams
    );
  }

  findUniteMesure(): Observable<IUniteMesure[]> {
    return this.http.get<IUniteMesure[]>(`${this.apiUrl}/unit_of_measure/list`);
  }

  createUniteMesure(mesure: IUniteMesure): Observable<IUniteMesure> {
    return this.http.post<IUniteMesure>(
      `${this.apiUrl}/unit_of_measure/add`,
      mesure
    );
  }

  updateUniteMesure(mesure: IUniteMesure): Observable<IUniteMesure> {
    return this.http.put<IUniteMesure>(
      `${this.apiUrl}/unit_of_measure/update/${mesure.id}`,
      mesure
    );
  }

  getUniteMesureDetail(mesure: IUniteMesure): Observable<IUniteMesure> {
    return this.http.get<IUniteMesure>(
      `${this.apiUrl}/unit_of_measure/get-detail/${mesure}`
    );
  }
}
