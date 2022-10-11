import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceType } from 'src/app/_models/device-type.model';
import { PageList } from 'src/app/_models/page-list.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeviceTypeService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

 /**
  * get all device type
  * @param data 
  * @returns 
  */
  getDeviceType(data : any):Observable<PageList> {
    let queryParams : {};
    queryParams = {
      params : new HttpParams()
      .set('name', data['name'] ?? "")
      .set('isActive', data['isActive'] ?? "")
      .set('page', data['page'] ?? "")
      .set('size', data['size'] ?? "")
      .set('sort', data['sort'] ?? "")
    };
  return this.http.get<PageList>(`${this.host}/device-type/list`, queryParams)
  }
  /**
   * create new 
   * @param deviceType 
   * @returns 
   */
  saveDeviceType(deviceType : DeviceType):Observable<DeviceType>{
    return this.http.post<DeviceType>(`${this.host}/device-type/add`, deviceType)
  }
/**
 * updated exiting deviceType
 * @param deviceType 
 * @returns 
 */
  updateDeviceType(deviceType : DeviceType):Observable<DeviceType>{
    return this.http.put<DeviceType>(`${this.host}/device-type/update/${deviceType.id}`, deviceType)
  }
/**
 * get existing deviceType details
 * @param deviceType 
 * @returns 
 */
  getDeviceTypeDetails(deviceType : DeviceType):Observable<DeviceType>{
    return this.http.get<DeviceType>(`${this.host}/device-type/get-details/${deviceType.id}`)
  }

  /**
   * simple list
   * @returns 
   */
  getAllDeviceType():Observable<DeviceType[]>{
    return this.http.get<DeviceType[]>(`${this.host}/device-type/list-all`)
  }
}
