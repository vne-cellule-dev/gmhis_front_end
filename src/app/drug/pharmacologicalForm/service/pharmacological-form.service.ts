import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageList } from 'src/app/_models/page-list.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PharmacologicalFormService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  findAll(data): Observable<PageList> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('page', data['page'])
        .set('size', data['size'] ?? '')
        .set('name', data['name'])
        .set('active', data['active'] ?? '')
        .set('sort', data['sort']),
    };

    return this.http.get<PageList>(`${this.apiUrl}/drug_pharmacological_form/list`, queryParams);
  }
  /**
   * It returns an Observable of an array of any type
   * @returns An array of objects with the following properties:
   * - id
   * - name
   * - active
   */
  findActivePharmacologicalNameAndId(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/drug_pharmacological_form/active_pharmacological_form_name`);
  }

  createPharmacologicalForm(dci: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/drug_pharmacological_form/add`, dci);
  }

  updatePharmacologicalForm(dci: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/drug_pharmacological_form/update/${dci.id}`,
      dci
    );
  }

  getPharmacologicalFormDetails(dci: any): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/drug_pharmacological_form/get-detail/${dci.id}`
    );
  }
}
