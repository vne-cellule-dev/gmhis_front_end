import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageList } from 'src/app/_models/page-list.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DciService {

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

    return this.http.get<PageList>(`${this.apiUrl}/drugDci/list`, queryParams);
  }
  /**
   * It returns an Observable of an array of any type
   * @returns An array of objects with the following properties:
   * - id
   * - name
   * - active
   */
  findActiveDciNameAndId(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/drugDci/active_dci_name`);
  }

  createDci(dci: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/drugDci/add`, dci);
  }

  updateDci(dci: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/drugDci/update/${dci.id}`,
      dci
    );
  }

  getDciDetails(dci: any): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/drugDci/get-detail/${dci.id}`
    );
  }
}
