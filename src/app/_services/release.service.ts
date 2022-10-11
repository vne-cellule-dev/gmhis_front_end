import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageList } from '../_models/page-list.model';
import { Release } from '../_models/release';

@Injectable({
  providedIn: 'root'
})
export class ReleaseService {

  private host = environment.apiUrl;

  constructor(private http : HttpClient) { }

  findAllRelease(data : any):Observable<PageList>{
    let queryParams : {};
    queryParams = {
      params : new HttpParams()
      .set('locataireId', data['locataireId'] ?? "")
      .set('siteId', data['siteId'] ?? "")
      .set('etat', data['etat'] ?? "")
      .set('numQuittance', data['numQuittance'] ?? "")
      .set('page', data['page'] ?? "")
      .set('size', data['size'] ?? "")
      .set('sort', data['sort'] ?? "")
    }
    return this.http.get<PageList>(`${this.host}/liberation-quittance/list`, queryParams);
  }

  dischargeQuittance(releaseNumberTab : any):Observable<Release>{
     
    return this.http.post<Release>(`${this.host}/liberation-quittance/liberer/`, {numQuittance : releaseNumberTab})
  }



}
