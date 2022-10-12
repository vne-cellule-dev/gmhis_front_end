import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleReturnedService {

  
  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

    getListByAsset(assetId : number) : Observable<any[]>{
    return this.http.get<any[]>(`${this.host}/article-returned/list-by-asset/` + assetId)
  }

  deleteArticleReturned(id : number): Observable<any> {
    return this.http.delete<any>(`${this.host}/article-returned/delete-article-returned/`+id)
  }
}
