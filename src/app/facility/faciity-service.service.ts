import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageList } from '../_models/page-list.model';
import { IFacility } from './models/facility';
import { IFacilityDto } from './models/facility-dto';

@Injectable({
  providedIn: 'root'
})
export class FaciityServiceService {
  
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  findAll(data): Observable<PageList> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('page', data['page'])
        .set('size', data['size'] ?? '')
        .set('name', data['name'])
        .set('active', data['active'] ?? '')
        .set('sort', data['sort']),
    };

    return this.http.get<PageList>(`${this.apiUrl}/facility/p_list`, queryParams);
  }

  /**
   * It returns an Observable of an array of any type
   * @returns An array of objects with the following properties:
   * - id
   * - name
   * - active
   */
  findActiveFacilityNameAndId(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/facility/active_facilities_name`);
  }

  findActiveFacilityTypeNameAndId(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/facility_type/active_facilities_name`);
  }

  findActiveFacilityCategoryNameAndId(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/facility_category/active_facilitiesCategory_name`);
  }

  createFaciity(facilityDto: IFacilityDto): Observable<IFacility> {
    return this.http.post<IFacility>(`${this.apiUrl}/facility/add`, facilityDto);
  }

  updateFacility(faciityDto: IFacilityDto): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/facility/update/${faciityDto.id}`,
      faciityDto
    );
  }

  getFacilityDetails(faciityDto: IFacilityDto): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/facility/get-detail/${faciityDto.id}`
    );
  }
}
