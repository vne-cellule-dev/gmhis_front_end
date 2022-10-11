import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { User } from '../_models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private host = environment.apiUrl;
  private token: string;
  private loggedInUsername: string;
  private jwtHelper = new JwtHelperService()

  constructor(private http: HttpClient) { }
  /**
   * 
   * @param user 
   * @returns User
   */
  public login(user: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(`${this.host}/user/login`, user, { observe: 'response' });
  }

  /**
   * user register
   * @param user 
   * @returns User
   */
  public register(user: User): Observable<User> {
    return this.http.post<User>(`${this.host}/register`, user);
  }


  /**
   * logOut function
   */
  public logOut(): void {
    this.token = null;
    this.loggedInUsername = null;
    localStorage.removeItem('user');
    // localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    localStorage.removeItem('users');

  }


  /**
   * create token auhtentication
   * @param token 
   */
  public saveToken(token: string): void {
    this.token = token;
    this.loggedInUsername = null;
    // localStorage.setItem('token', token);
    sessionStorage.setItem('token', token);
  }

  /**
   * add user information to localstrorage 
   * @param user 
   */
  public addUserToLocalStorage(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }


  /**
   * get user to localstorage
   * @returns user information in JSON format
   */
  public getUserFromLocalStorage(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  /**
   * get user token
   */
  public loadToken(): void {
    // this.token = localStorage.getItem('token');
    this.token = sessionStorage.getItem('token');
  }


  /**
   * get user token
   */

  public getToken(): string {
    return this.token;
  }


  /**
   * verify if user is logged in 
   * @returns 
   */
  public isLoggedIn(): boolean {
    this.loadToken()
    if (this.token != null && this.token !== '') {
      if (this.jwtHelper.decodeToken(this.token).sub != null || '') {
        if (!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token);
          return true;
        }
      }
    } else {
      this.logOut();
      return false;
    }
    return;
  }

}
