import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InsuredServiceService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getInsuredByPatientId(patientId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/insured/list_by_patient/${patientId}`
    );
  }
}
