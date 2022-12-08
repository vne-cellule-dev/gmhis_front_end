import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicalAnalysisSpecialityService {

  private readonly apiUrl = environment.apiUrl;
  constructor(private http : HttpClient) { }

  public getListOfActiveMedicaleAnalysis() : Observable<any>{
    return this.http.get(`${this.apiUrl}/medicalAnalysisSpecilaty/active_medical_analysis_speciality_name`);
  }
}
