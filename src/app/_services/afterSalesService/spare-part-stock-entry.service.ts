import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageList } from 'src/app/_models/page-list.model';
import { SparePartStockEntry } from 'src/app/_models/sparePartStockEntry.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SparePartStockEntryService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

 /**
  * get all spare part stock entry
  * @param data 
  * @returns 
  */
  getSparePartStockEntry(data : any):Observable<PageList> {
    let queryParams : {};
    queryParams = {
      params : new HttpParams()
      .set('date', data['date'] ?? "")
      .set('sparePartId', data['sparePartId'] ?? "")
      .set('page', data['page'] ?? "")
      .set('size', data['size'] ?? "")
      .set('sort', data['sort'] ?? "")
    };
  return this.http.get<PageList>(`${this.host}/spare_part_stock_entry/list`, queryParams)
  }
  /**
   * create new 
   * @param sparePartStockEntry 
   * @returns 
   */
  saveSparePartStockEntry(sparePartStockEntry :SparePartStockEntry):Observable<SparePartStockEntry>{
    return this.http.post<SparePartStockEntry>(`${this.host}/spare_part_stock_entry/add`, sparePartStockEntry)
  }
/**
 * updated exiting sparePartStockEntry
 * @param sparePartStockEntry 
 * @returns 
 */
  updateSparePartStockEntry(sparePartStockEntry :SparePartStockEntry):Observable<SparePartStockEntry>{
    return this.http.put<SparePartStockEntry>(`${this.host}/spare_part_stock_entry/update/${sparePartStockEntry.id}`, sparePartStockEntry)
  }
/**
 * get existing sparePartStockEntry details
 * @param sparePartStockEntry 
 * @returns 
 */
  getSparePartStockEntryDetails(sparePartStockEntry :SparePartStockEntry):Observable<SparePartStockEntry>{
    return this.http.get<SparePartStockEntry>(`${this.host}/spare_part_stock_entry/get-detail/${sparePartStockEntry.id}`)
  }

  /**
   * simple list
   * @returns 
   */
  getAllSparePartStockEntry():Observable<SparePartStockEntry[]>{
    return this.http.get<SparePartStockEntry[]>(`${this.host}/spare_part_stock_entry/list-all`)
  }
}
