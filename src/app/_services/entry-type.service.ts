import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EntryType } from '../_models/entryType.model';
import { PageList } from '../_models/page-list.model';

@Injectable({
  providedIn: 'root'
})
export class EntryTypeService {


  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * get active list of entry type
   * @returns EntryType[]
   */
   findActive(): Observable<EntryType[]> {
    return this.http.get<EntryType[]>(`${this.host}/entry-type/active-list`)
  }

  /**
   * get all paginated EntryType list
   * @param data 
   * @returns PageList
   */
  findAll(data): Observable<PageList> {

    let queryParams = {};

    queryParams = {
      params: new HttpParams()
      .set('criteria', data['criteria'] )
      .set('criteriaType', data['criteriaType'] ?? "")
      .set('page', data['page'])
      .set('size', data['size'] ?? "")
      .set('sort', data['sort'])
    };
    return this.http.get<PageList>(`${this.host}/entry-type/list`, queryParams)
  }

  /**
   *  create a new EntryType
   * @param EntryType 
   * @returns EntryType
   */
  save(EntryType: EntryType): Observable<EntryType> {
    return this.http.post<EntryType>(`${this.host}/entry-type/add`, EntryType)
  }

  /**
   *  update a EntryType
   * @param EntryType 
   * @returns EntryType
   */
  update(EntryType: EntryType): Observable<EntryType> {
    return this.http.put<EntryType>(`${this.host}/entry-type/update/` + EntryType.id, EntryType)
  }

  /**
   * get driver details by EntryType Id
   * @param EntryTypeId 
   * @returns 
   */
  getEntryTypeDetails(EntryTypeId : number) : Observable<EntryType>{
    return this.http.get<EntryType>(`${this.host}/entry-type/get-detail/` + EntryTypeId)
  }


  /**
 * 
 * @param EntryType 
 * @returns 
 */
deleteEntryType(EntryType : EntryType): Observable<EntryType>{
  return this.http.delete<EntryType>(`${this.host}/entry-type/delete/`+EntryType.id)
}

}
