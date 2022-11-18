import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IExaminationDto } from '../models/examination-dto';

@Injectable({
  providedIn: 'root'
})
export class ExaminationService {

  private readonly apiUrl = environment.apiUrl;
 
  constructor(private http: HttpClient) {}

  createExamination(examinationDto: IExaminationDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/examination/add`, examinationDto);
  }

  updateExamination(examinationDto : any):Observable<IExaminationDto>{
    return this.http.put<IExaminationDto>(`${this.apiUrl}/actCategory/update/${examinationDto.id}`, examinationDto)
  }

  getPatientExamination(data): Observable<any> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('patient', data['patient'])
        .set('page', data['page'])
        .set('size', data['size'] ?? '')
        .set('sort', data['sort']),
    };
    return this.http.get<any>(
      `${this.apiUrl}/examination/p_list/by_patient`,
      queryParams
    );
  }

  getExaminationNumberByAdmissionId(admissionId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/examination/getPatientExaminationNumber/${admissionId}`);
  }

}
