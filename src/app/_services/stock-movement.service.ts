import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageList } from '../_models/page-list.model';
import { StockMovment } from '../_models/stockMovement.model';

@Injectable({
  providedIn: 'root'
})
export class StockMovementService {
  private host = environment.apiUrl;

  constructor(private http : HttpClient) { }

    /**
   * get all paginated StockEntry
   * @param data 
   * @returns PageList
   */
     findAll(data): Observable<PageList> {

      let queryParams = {};
      queryParams = {
        params: new HttpParams()
        .set('page', data['page'])
        .set('size', data['size'] ?? "")
        .set('depot', data ['depot'] ?? 0)
        .set('dateMovement', data ['dateMovement'])
        .set('article', data ['article'] ?? "")
        .set('sort', data['sort'])
      };
  
      return this.http.get<PageList>(`${this.host}/stock-movement/list`, queryParams)
    }

    findAllSimpleList(data): Observable<StockMovment[]> {

      let queryParams = {};
      queryParams = {
        params: new HttpParams()
        .set('depot', data ['depot'])
        .set('dateMovement', data ['dateMovement'])
        .set('article', data ['article'] ?? "")
      };
  
      return this.http.get<StockMovment[]>(`${this.host}/stock-movement/list-stock-movement`, queryParams)
    }


    findArticleOperation(data): Observable<PageList> {

      let queryParams = {};
      queryParams = {
        params: new HttpParams()
        .set('page', data['page'])
        .set('size', data['size'] ?? "")
        .set('article', data['article'])
        .set('depot', data ['depot'])
        .set('sort', data['sort'])
        .set('date', data['date'])
        .set('movementType', data['movementType'])

      };
  
      return this.http.get<PageList>(`${this.host}/stock-movement/article-follow-up`, queryParams)
    }
}
