import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageList } from 'src/app/_models/page-list.model';
import { environment } from 'src/environments/environment';
import { IConstantType } from './constant-type.model';

@Injectable({
  providedIn: 'root',
})
export class ConstantTypeService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

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

    return this.http.get<PageList>(
      `${this.apiUrl}/patient_constant_type/p_list`,
      queryParams
    );
  }

  // findConstantnameAndIdList(): Observable<IConstantType[]> {
  //   return this.http.get<IConstantType[]>(
  //     `${this.apiUrl}/cashRegister/active_cash_register_name`
  //   );
  // }

  createConstantType(constantType: IConstantType): Observable<IConstantType> {
    return this.http.post<IConstantType>(
      `${this.apiUrl}/patient_constant_type/add`,
      constantType
    );
  }

  updateConstantType(constantType: IConstantType): Observable<IConstantType> {
    return this.http.put<IConstantType>(
      `${this.apiUrl}/patient_constant_type/update/${constantType.id}`,
      constantType
    );
  }

  getNameAndIdOfConstanteTypeActive(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/patient_constant_type/active_constante_type_name`
    );
  }

  // getConstantTypeDetail(
  //   constantType: IConstantType
  // ): Observable<IConstantType> {
  //   return this.http.get<IConstantType>(
  //     `${this.apiUrl}/constant_domain/get-detail/${constantType.id}`
  //   );
  // }
}
