import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Currency } from '../_models/currency.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   *  get list of Bank 
   * @returns Bank[]
   */
  findAll(): Observable<Currency[]> {
    return this.http.get<Currency[]>(`${this.host}/currency/list`)
  }
}
