import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Complaint } from 'src/app/_models/complaint.model';
import { DeviceReception } from 'src/app/_models/deviceRecption.model';
import { PageList } from 'src/app/_models/page-list.model';
import { SparePart } from 'src/app/_models/sparePart.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeviceReceptionService {
 
  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

 /**
  * get all device reception
  * @param data 
  * @returns 
  */
  getDeviceReception(data : any):Observable<PageList> {
    let queryParams : {};
    queryParams = {
      params : new HttpParams()
      .set('date', data['date'] ?? "")
      .set('voucherNumber', data['voucherNumber'] ?? "")
      .set('complaint', data['complaint'] ?? "")
      .set('page', data['page'] ?? "")
      .set('size', data['size'] ?? "")
      .set('sort', data['sort'] ?? "")
    };
  return this.http.get<PageList>(`${this.host}/device-reception/list`, queryParams)
  }
  /**
   * create new 
   * @param deviceType 
   * @returns 
   */
  saveDeviceReception(deviceType : DeviceReception):Observable<DeviceReception>{
    return this.http.post<DeviceReception>(`${this.host}/device-reception/add`, deviceType)
  }
/**
 * updated exiting deviceType
 * @param deviceType 
 * @returns 
 */
  updateDeviceReception(deviceType : DeviceReception):Observable<DeviceReception>{
    return this.http.put<DeviceReception>(`${this.host}/device-reception/update/${deviceType.id}`, deviceType)
  }
/**
 * get existing deviceType details
 * @param deviceType 
 * @returns 
 */
  getDeviceReceptionDetails(deviceType : DeviceReception):Observable<DeviceReception>{
    return this.http.get<DeviceReception>(`${this.host}/device-reception/get-detail/${deviceType.id}`)
  }

  /**
   * simple list
   * @returns 
   */
  getAllDeviceReception():Observable<DeviceReception[]>{
    return this.http.get<DeviceReception[]>(`${this.host}/device-reception/list-all`)
  }

  getSparePartByReception(deviceReception : DeviceReception):Observable<SparePart[]>{
    return this.http.get<SparePart[]>(`${this.host}/device-reception/list-spare-part-used/${deviceReception.complaintSav.id}`)
  }
}
