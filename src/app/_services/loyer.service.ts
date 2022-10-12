import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Loyer } from '../_models/loyer';

@Injectable({
  providedIn: 'root'
})
export class LoyerService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDetails(numQuittance : number):Observable<Loyer>{    
    return this.http.get<Loyer>(`${this.host}/loyer/detail/${numQuittance}`)
  }

  saveLoyer(local : Loyer):Observable<Loyer>{
    console.log(local);
    return this.http.post<Loyer>(`${this.host}/loyer/add`, local)
  }

  updateLoyer(data : any):Observable<any>{  
    console.log(data);
    return this.http.put<any>(`${this.host}/loyer/update/${data.id}`, data)
  }

  deleteLoyer(loyer : Loyer):Observable<any>{
    return this.http.delete<any>(`${this.host}/loyer/delete/${loyer.id}`)
  }

}
