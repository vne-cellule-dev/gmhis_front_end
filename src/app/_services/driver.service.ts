import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Driver } from '../_models/driver.model';
import { PageList } from '../_models/page-list.model';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * get active list of Driver
   * @returns Driver[]
   */
  findActive(): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${this.host}/driver/active-list`)
  }

  /**
   * get after sale service Drivers
   * @returns Driver[]
   */
   findAfterSaleServiceDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${this.host}/driver/after-sale-service-drivers`)
  }

  /**
   * get all paginated Driver list
   * @param data 
   * @returns PageList
   */
  findAll(data): Observable<PageList> {

    let queryParams = {};

    queryParams = {
      params: new HttpParams()
        .set('page', data['page'])
        .set('size', data['size'] ?? "")
        .set('firstName', data['firstName'])
        .set('lastName', data['lastName'])
        .set('phone', data['phone'])
        .set('afterSaleService', data['afterSaleService'])
        .set('sort', data['sort'])
    };


    return this.http.get<PageList>(`${this.host}/driver/list`, queryParams)
  }

  /**
   *  create  a new  Driver
   * @param Driver 
   * @returns Driver
   */
  save(driver: Driver): Observable<Driver> {
    return this.http.post<Driver>(`${this.host}/driver/add`, driver)
  }

  /**
   *  update a Driver
   * @param Driver 
   * @returns Driver
   */
  update(driver: Driver): Observable<Driver> {
    return this.http.put<Driver>(`${this.host}/driver/update/` + driver.id, driver)
  }

  /**
   * get driver details by driver Id
   * @param driverId 
   * @returns 
   */
  getDriverDetails(driverId : number) : Observable<Driver>{
    return this.http.get<Driver>(`${this.host}/driver/get-detail/` + driverId)
  }
}
