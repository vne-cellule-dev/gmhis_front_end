import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubFamilyService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * list sales by item and month for a given year
   * @param data 
   * @returns 
   */
  findSubFamilySynthesisByYear(data): Observable<any> {

    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('year', data['year'])
        .set('subFamilyId', data['subFamilyId'])
    };

    return this.http.get<any>(`${this.host}/stat/list-synthesis-sub-family`, queryParams)
  }

  bestSellerSubFamilyByYear(data, qty:boolean): Observable<any> {
    let URI : string = "";
     qty == true ? URI = 'stat/sub-family-ranking-by-qty': URI = 'stat/sub-family-ranking-by-margin';      
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('year', data['year'])
    };
    return this.http.get<any>(`${this.host}/${URI}`, queryParams)
  }

  bestSellerOfArticleBySubFamilyByYear(data, qty:boolean): Observable<any> {
    let URI : string = "";
     qty == true ? URI = 'stat/ranking-by-subfamily-and-qty': URI = 'stat/ranking-by-subfamily-and-margin';      
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('year', data['year'])
        .set('subFamily', data['subFamily'])
        .set('limit', data['limit'])
    };
    return this.http.get<any>(`${this.host}/${URI}`, queryParams)
  }
}
