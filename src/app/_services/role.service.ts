import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageList } from '../_models/page-list.model';
import { RoleAuthorities } from '../_models/role-authorities.model';
import { Role } from '../_models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private host = environment.apiUrl;

  constructor(private http : HttpClient) { }

/**
 *  get list of Role active
 * @returns Role[]
 */
  findAllActive():Observable<Role[]>{
    return this.http.get<Role[]>(`${this.host}/role/active-list`) 
  }

 /**
  * get all paginated role 
  * @param data 
  * @returns PageList 
  */
  findAll(data):Observable<PageList>{
      let queryParams = {};
      queryParams = {
        params: new HttpParams()
          .set('page', data['page'])
          .set('size', data['size'] ?? "")
          .set('name', data['name'])
          .set('isActive', data['isActive'] ?? "")
          .set('sort', data['sort'])
      };

      return this.http.get<PageList>(`${this.host}/role/list`, queryParams) 
    }

  /**
   * Create new Role
   * @param role 
   * @returns Role
   */
  save(role:Role):Observable<Role>{
    return this.http.post<Role>(`${this.host}/role/add`, role) 
  }

 /**
  *  update a role
  * @param role 
  * @returns Role
  */
  update(role:Role):Observable<Role>{
      return this.http.put<Role>(`${this.host}/role/update/`+role.id, role) 
  }

  /**
   *  update a role
   * @param roleAuthorities 
   * @returns Role
   */
    setAuthorities(roleAuthorities: RoleAuthorities):Observable<Role>{
      return this.http.put<Role>(`${this.host}/role/set-authorities/`+roleAuthorities.role, roleAuthorities) 
  }

  
 /**
  * get list of Role active
  * @param role 
  * @returns number
  */
    findRoleAuthorityIds(role: Role):Observable<number[]>{
      return this.http.get<number[]>(`${this.host}/role/get-authority-ids/`+ role.id) 
    }

    getRoleDetails(roleId : number):Observable<Role>{
      return this.http.get<Role>(`${this.host}/role/get-detail/`+ roleId)
    }
}
