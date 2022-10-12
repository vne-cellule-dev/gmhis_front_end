import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageList } from 'src/app/_models/page-list.model';
import { SparePartOutPut } from 'src/app/_models/sparePartOutPut.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SparePartOutPutService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
  * get all spare part stock out put
  * @param data 
  * @returns 
  */
   getSparePartStockOutPut(data : any):Observable<PageList> {
    let queryParams : {};
    queryParams = {
      params : new HttpParams()
      .set('date', data['date'] ?? "")
      .set('transferNumber', data['transferNumber'] ?? "")
      .set('page', data['page'] ?? "")
      .set('size', data['size'] ?? "")
      .set('sort', data['sort'] ?? "")
    };
  return this.http.get<PageList>(`${this.host}/spare-part-out/list`, queryParams)
  }
  /**
   * create new 
   * @param sparePartStockOutPut 
   * @returns 
   */
  saveSparePartStockOutPut(sparePartStockOutPut :SparePartOutPut):Observable<SparePartOutPut>{
    return this.http.post<SparePartOutPut>(`${this.host}/spare-part-out/add`, sparePartStockOutPut)
  }
}
