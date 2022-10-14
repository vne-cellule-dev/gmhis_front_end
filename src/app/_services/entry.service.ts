import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Entry } from '../_models/entry.model';
import { PageList } from '../_models/page-list.model';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  
  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * get active list of entry type
   * @returns Entry[]
   */
   findActive(): Observable<Entry[]> {
    return this.http.get<Entry[]>(`${this.host}/entry/active-list`)
  }

  /**
   * get all paginated Entry list
   * @param data 
   * @returns PageList
   */
  findAll(data): Observable<PageList> {

    let queryParams = {};

    queryParams = {
      params: new HttpParams()
      .set('criteria', data['criteria'] )
      .set('criteriaType', data['criteriaType'] ?? "")
      .set('entryDate', data['entryDate'])
      .set('page', data['page'])
      .set('size', data['size'] ?? "")
      .set('sort', data['sort'])
    };
    return this.http.get<PageList>(`${this.host}/entry/list`, queryParams)
  }

  /**
   *  create a new Entry
   * @param Entry 
   * @returns Entry
   */
  save(Entry: Entry): Observable<Entry> {
    return this.http.post<Entry>(`${this.host}/entry/add`, Entry)
  }

  /**
   *  update a Entry
   * @param Entry 
   * @returns Entry
   */
  update(Entry: Entry): Observable<Entry> {
    return this.http.put<Entry>(`${this.host}/entry/update/` + Entry.id, Entry)
  }

  /**
   * get driver details by Entry Id
   * @param EntryId 
   * @returns 
   */
  getEntryDetails(EntryId : number) : Observable<Entry>{
    return this.http.get<Entry>(`${this.host}/entry/get-detail/` + EntryId)
  }


  /**
 * 
 * @param Entry 
 * @returns 
 */
deleteEntry(Entry : Entry): Observable<Entry>{
  return this.http.delete<Entry>(`${this.host}/entry/delete/`+Entry.id)
}

  /**
   *List all entries by entry number
  */
   findAllEntriesByEntryNumber(data:string): Observable<Entry> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('number', data)
    };
    return this.http.get<Entry>(`${this.host}/entry/entry-list`, queryParams)
  }
}
