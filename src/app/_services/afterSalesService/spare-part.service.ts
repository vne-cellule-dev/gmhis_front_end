import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageList } from 'src/app/_models/page-list.model';
import { SparePart } from 'src/app/_models/sparePart.model';
import { SparePartStockMovement } from 'src/app/_models/sparePartStockMovement.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SparePartService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

 /**
  * get all sparePart type
  * @param data 
  * @returns 
  */
  getSparePart(data : any):Observable<PageList> {
    let queryParams : {};
    queryParams = {
      params : new HttpParams()
      .set('name', data['name'] ?? "")
      .set('family', data['family'] ?? "")
      .set('page', data['page'] ?? "")
      .set('size', data['size'] ?? "")
      .set('sort', data['sort'] ?? "")
    };
  return this.http.get<PageList>(`${this.host}/spare-part/list`, queryParams)
  }
  /**
   * create new 
   * @param sparePart 
   * @returns 
   */
  saveSparePart(sparePart : SparePart):Observable<SparePart>{
    return this.http.post<SparePart>(`${this.host}/spare-part/add`, sparePart)
  }
/**
 * updated exiting sparePart
 * @param sparePart 
 * @returns 
 */
  updateSparePart(sparePart : SparePart):Observable<SparePart>{
    return this.http.put<SparePart>(`${this.host}/spare-part/update/${sparePart.id}`, sparePart)
  }
/**
 * get existing sparePart details
 * @param sparePart 
 * @returns 
 */
  getSparePartDetails(sparePart : SparePart):Observable<SparePart>{
    return this.http.get<SparePart>(`${this.host}/spare-part/get-details/${sparePart.id}`)
  }

  /**
   * simple list
   * @returns 
   */
  getAllSparePart():Observable<SparePart[]>{
    return this.http.get<SparePart[]>(`${this.host}/spare-part/list-all`)
  }

  findAllSparePartStockMovement(data): Observable<PageList> {

    let queryParams = {};
    queryParams = {
      params: new HttpParams()
      .set('date', data ['date'])
      .set('sparePartId', data ['sparePartId'] ?? "")
      .set('page', data['page'])
      .set('size', data['size'] ?? "")
      .set('sort', data['sort'])
    };

    return this.http.get<PageList>(`${this.host}/spare-part-stock-movement/list`, queryParams)
  }

  sparePartStockMovementSimpleList(data): Observable<SparePartStockMovement[]> {

    let queryParams = {};
    queryParams = {
      params: new HttpParams()
      .set('date', data ['date'])
      .set('sparePartId', data ['sparePartId'] ?? "")
    };

    return this.http.get<SparePartStockMovement[]>(`${this.host}/spare-part-stock-movement/simple-list`, queryParams)
  }
}
