import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageList } from 'src/app/_models/page-list.model';
import { environment } from 'src/environments/environment';
import { IPatientConstantDto } from '../models/patient-constant-dto';

@Injectable({
  providedIn: 'root'
})
export class PatientConstantService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  findAll(data): Observable<PageList> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('patientId', data['patientId'])
        .set('date', data['date'])
        .set('size', data['size'] ?? '')
        .set('active', data['active'] ?? '')
        .set('sort', data['sort']),
    };

    return this.http.get<PageList>(
      `${this.apiUrl}/patient_constant/p_list`,
      queryParams
    );
  }

  // findConstantnameAndIdList(): Observable<IConstant[]> {
  //   return this.http.get<IConstant[]>(
  //     `${this.apiUrl}/cashRegister/active_cash_register_name`
  //   );
  // }

  createPatientConstant(constant: IPatientConstantDto): Observable<IPatientConstantDto> {
    return this.http.post<IPatientConstantDto>(
      `${this.apiUrl}/patient_constant/add`,
      constant
    );
  }

  updatePatientConstant(constant: IPatientConstantDto): Observable<IPatientConstantDto> {
    return this.http.put<IPatientConstantDto>(
      `${this.apiUrl}/patient_constant/update/${constant.id}`,
      constant
    );
  }

  getPatientConstantDetail(constant: IPatientConstantDto): Observable<IPatientConstantDto> {
    return this.http.get<IPatientConstantDto>(
      `${this.apiUrl}/patient_constant/get-detail/${constant.id}`
    );
  }

  getPatientConstantListByDate(data): Observable<any> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('patientId', data['patientId'])
        .set('takenAt', data['takenAt'])
    };
    return this.http.get<any>(
      `${this.apiUrl}/patient_constant/patientConstantListBydate`,
      queryParams
    );
  }

  getPatientConstantNumberByPatientId(patientId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/patient_constant/getPatientConstantNumber/${patientId}`);
  }
}
