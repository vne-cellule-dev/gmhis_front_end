import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageList } from 'src/app/_models/page-list.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TherapeuticService {
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

    return this.http.get<PageList>(`${this.apiUrl}/drug_therapeutic_class/list`, queryParams);
  }
  /**
   * It returns an Observable of an array of any type
   * @returns An array of objects with the following properties:
   * - id
   * - name
   * - active
   */
  findActiveTherapeuticClassNameAndId(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/drug_therapeutic_class/active_drugTherapeutic_class_name`);
  }

  createTherapeuticClass(therapeuticClass: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/drug_therapeutic_class/add`, therapeuticClass);
  }

  updateTherapeuticClass(therapeuticClass: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/drug_therapeutic_class/update/${therapeuticClass.id}`,
      therapeuticClass
    );
  }

  getTherapeuticClassDetails(therapeuticClass: any): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/drug_therapeutic_class/get-detail/${therapeuticClass.id}`
    );
  }
}
