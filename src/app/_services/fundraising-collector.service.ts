import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FundraisingCollectorService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   *  get list of fundraising collector 
   * @returns User[]
   */
  
  findfundraisingCollectorActive(): Observable<User[]> {
    return this.http.get<User[]>(`${this.host}/user/list-collected-by`)
  }
}
