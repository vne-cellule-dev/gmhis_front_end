import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CashRegister } from '../_models/cashRegister.model';
import { User } from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class CommercialsService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   *  get list of commercial 
   * @returns User[]
   */

  findAllCommercialActive(): Observable<User[]> {
    return this.http.get<User[]>(`${this.host}/user/list-commercials`)
  }
}
