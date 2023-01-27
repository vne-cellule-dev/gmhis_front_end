import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpResponse } from '../_models/custom-http-response';
import { User } from '../_models/user.model';
import { resetPassword } from '../_models/reset-password.model';
import { PageList } from '../_models/page-list.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }
  /**
   * get list of User active
   * @returns User[]
   */
  findAllActive(): Observable<User[]> {
    return this.http.get<User[]>(`${this.host}/user/active_user_name`)
  }


  /**
   * get all user paginate list 
   * @param data 
   * @returns PageList
   */
  findAll(data): Observable<PageList> {
    let queryParams = {};
    let depot = data['depot'] === null ? '' : data['depot'];
    queryParams = {
      params: new HttpParams()
        .set('page', data['page'])
        .set('size', data['size'] ?? "")
        .set('firstName', data['firstName'])
        .set('lastName', data['lastName'])
        .set('tel', data['tel'])
        .set('depot', depot)
        .set('sort', data['sort'])
    };

    return this.http.get<PageList>(`${this.host}/user/list`, queryParams)
  }


  /**
   * find user by id
   * @param id 
   * @returns User
   */
  public findById(id: number): Observable<User> {
    return this.http.get<User>(`${this.host}/user/detail/${id}`)
  }
  /**
   * Create new user
   * @param formData 
   * @returns User
   */
  public addUser(userDto: User): Observable<User | HttpErrorResponse> {
    return this.http.post<User>(`${this.host}/user/add`, userDto)
  }
  /**
   * update user
   * @param FormData 
   * @returns User
   */
  public updateUser(userDto: User): Observable<User | HttpErrorResponse> {    
    return this.http.put<User>(`${this.host}/user/update/${userDto.id}`, userDto)
  }
  /**
   * reset user password 
   * @param data 
   * @returns User
   */
  public resetPassword(data: resetPassword): Observable<HttpResponse<User>> {
    return this.http.post<User>(`${this.host}/user/resetpassword/` + data.currentUsername, data, { observe: 'response' })
  }

  /**
   * update profil image
   * @param FormData 
   * @returns User
   */
  public updateProfilImage(FormData: FormData): Observable<HttpEvent<User> | HttpErrorResponse> {
    return this.http.post<User>(`${this.host}/user/updateProfilImage`, FormData,
      {
        reportProgress: true,
        observe: 'events'
      })
  }

  /**
   * delete user
   * @param userId 
   * @returns 
   */
  public deleteUser(userId): Observable<CustomHttpResponse | HttpErrorResponse> {
    return this.http.delete<CustomHttpResponse>(`${this.host}/user/delete/${userId}`)
  }
  /**
   * add user to local cache
   * @param user 
   */
  public addUserToLocalCache(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }
  /**
   * get user informtion from local cache
   * @returns user information in JSON form
   */
  public getUserFromLocalCache(): User {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user'));
    }
    return null;
  }


  /**
   * reset and send password to user
   * @param username 
   * @returns 
   */
  public resetAndSendPassword(username: String): Observable<HttpResponse<String>> {
    return this.http.post<HttpResponse<String>>(`${this.host}/user/send-new-password/` + username, { observe: 'response' });
  }


  /**
   * Create formadata used for data who contain file
   * @param loggedInUsername 
   * @param user 
   * @param profileImage 
   * @returns 
   */
  public createUserFormdData(loggedInUsername: string, user: User, profileImage: File): FormData {
    const formData = new FormData();
    formData.append('currentUsername', loggedInUsername);
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('email', user.email);
    formData.append('tel', user.tel);
    formData.append('roles', user.role);
    formData.append('profileImage', profileImage);
    formData.append('isActive', JSON.stringify(user.isActive));
    formData.append('isNonLocked', JSON.stringify(user.isNonLocked));
    formData.append('passwordMustBeChange', JSON.stringify(user.passwordMustBeChange));
    return formData
  }


  /**
   * check user authority for acces to certain part of application 
   * @param authority 
   * @returns 
   */
  public checkAuthority(authority) {
    let user = this.getUserFromLocalCache();
    let role = user.role;
    let authorities = user.authorities;

    if (authorities == 'aucun') {
      return false;
    }

    if (authorities == 'tous') {
      return true;
    }

    return authorities.split(",").includes(authority);

  }

  /**
   * get detail of a User order
   * @param User 
   * @returns 
   */
   getUserDetail(userId: number): Observable<User> {
    return this.http.get<User>(`${this.host}/user/detail/${userId}`)
  } 

}
