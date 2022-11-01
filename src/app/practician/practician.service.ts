import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PracticianService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private http : HttpClient) {

    
  }

  findPracticianSimpleList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/practician/active_practicians_name`);
  }
}
