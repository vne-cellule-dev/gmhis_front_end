import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Editor } from '../_models/editor.model';
import { PageList } from '../_models/page-list.model';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

 /**
  * get all editor
  * @param data 
  * @returns 
  */
  getEditor(data : any):Observable<PageList> {
    let queryParams : {};
    queryParams = {
      params : new HttpParams()
      .set('nom', data['nom'] ?? "")
      .set('page', data['page'] ?? "")
      .set('size', data['size'] ?? "")
      .set('sort', data['sort'] ?? "")
    };
  return this.http.get<PageList>(`${this.host}/editeur/list`, queryParams)
  }
  /**
   * create new 
   * @param editor 
   * @returns 
   */
  saveEditor(editor : Editor):Observable<Editor>{
    return this.http.post<Editor>(`${this.host}/editeur/add`, editor)
  }
/**
 * updated exiting editor
 * @param editor 
 * @returns 
 */
  updateEditor(editor : Editor):Observable<Editor>{
    return this.http.put<Editor>(`${this.host}/editeur/update/${editor.id}`, editor)
  }
/**
 * get existing editor details
 * @param editor 
 * @returns 
 */
  getEditorDetails(editor : Editor):Observable<Editor>{
    return this.http.get<Editor>(`${this.host}/editeur/detail/${editor.id}`)
  }

  /**
 * simple list
 * @param editor 
 * @returns 
 */
  getAllEditor():Observable<Editor[]>{
    return this.http.get<Editor[]>(`${this.host}/editeur/list-all`)
  }


}
