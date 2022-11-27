import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageList } from 'src/app/_models/page-list.model';
import { environment } from 'src/environments/environment';
import { IPrescriptionDto } from '../models/prescription-dto';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  findAll(data): Observable<PageList> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('patient', data['patient'])
        .set('page', data['page'])
        .set('size', data['size'] ?? '')
        .set('active', data['active'] ?? '')
        .set('sort', data['sort']),
    };

    return this.http.get<PageList>(`${this.apiUrl}/prescription/p_list/by_patient`, queryParams);
  }



 

  findActiveFacilityCategoryNameAndId(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/facility_category/active_facilitiesCategory_name`);
  }

  createPrescription(prescriptionDto: IPrescriptionDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/prescription/add`, prescriptionDto);
  }

  // updateFacility(faciityDto: IFacilityDto): Observable<any> {
  //   return this.http.put<any>(
  //     `${this.apiUrl}/facility/update/${faciityDto.id}`,
  //     faciityDto
  //   );
  // }

  getPrescriptionItemByPrescriptionId(prescriptionId: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/prescription/getPrescriptionItems/${prescriptionId}`
    );
  }

  getPrescriptionNumberByPatientId(patientId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/prescription/getPrescriptionNumber/${patientId}`);
  }

  getPrescriptionDetails(prescriptionId: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/prescription/get-detail/${prescriptionId}`
    );
  }

  getPrescriptionDetailsByPrescriptionNumber(prescriptionNumber: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/prescription/prescriptionByPrescriptionNumber/${prescriptionNumber}`
    );
  }

  setPrescriptionItems(prescriptionitems: string[]): Observable<any> {    
    return this.http.post<any>(`${this.apiUrl}/prescription/SetPrescriptionItems/`, prescriptionitems);
  }
}
