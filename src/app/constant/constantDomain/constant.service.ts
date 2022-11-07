import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageList } from '../../_models/page-list.model';
import { IConstant } from './constant.model';

@Injectable({
  providedIn: 'root',
})
export class ConstantService {
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
      `${this.apiUrl}/constant_domain/list`,
      queryParams
    );
  }

  // findConstantnameAndIdList(): Observable<IConstant[]> {
  //   return this.http.get<IConstant[]>(
  //     `${this.apiUrl}/cashRegister/active_cash_register_name`
  //   );
  // }

  createConstantDomain(constant: IConstant): Observable<IConstant> {
    return this.http.post<IConstant>(
      `${this.apiUrl}/constant_domain/add`,
      constant
    );
  }

  updateConstantDomain(constant: IConstant): Observable<IConstant> {
    return this.http.put<IConstant>(
      `${this.apiUrl}/constant_domain/update/${constant.id}`,
      constant
    );
  }

  getConstantDomainDetail(constant: IConstant): Observable<IConstant> {
    return this.http.get<IConstant>(
      `${this.apiUrl}/constant_domain/get-detail/${constant.id}`
    );
  }

  getNameAndIdOfConstanteDomainActive(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/constant_domain/active_constante_domain_name_id`
    );
  }
}
