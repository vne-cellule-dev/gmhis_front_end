import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppParam } from '../_models/app-param.model';

@Injectable({
  providedIn: 'root'
})
export class AppParamService {

  constructor(private http: HttpClient) { }

  private host = environment.apiUrl;

 
   getDetail() : Observable<AppParam>{
    return this.http.get<AppParam>(`${this.host}/application-parameter/detail`)
  }
}
