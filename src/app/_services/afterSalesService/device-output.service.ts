import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceOutput } from 'src/app/_models/deviceOutput.model';
import { PageList } from 'src/app/_models/page-list.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeviceOutputService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

 /**
  * get all device output
  * @param data 
  * @returns 
  */
  getDeviceOutput(data : any):Observable<PageList> {
    let queryParams : {};
    queryParams = {
      params : new HttpParams()
      .set('date', data['date'] ?? "")
      .set('receiverName', data['receiverName'] ?? "")
      .set('page', data['page'] ?? "")
      .set('size', data['size'] ?? "")
      .set('sort', data['sort'] ?? "")
    };
  return this.http.get<PageList>(`${this.host}/device-output/list`, queryParams)
  }
  /**
   * create new 
   * @param deviceOutput 
   * @returns 
   */
  saveDeviceOutput(deviceOutput : DeviceOutput):Observable<DeviceOutput>{
    return this.http.post<DeviceOutput>(`${this.host}/device-output/add`, deviceOutput)
  }
/**
 * updated exiting deviceOutput
 * @param deviceOutput 
 * @returns 
 */
  updateDeviceOutput(deviceOutput : DeviceOutput):Observable<DeviceOutput>{
    return this.http.put<DeviceOutput>(`${this.host}/device-output/update/${deviceOutput.id}`, deviceOutput)
  }
/**
 * get existing deviceOutput details
 * @param deviceOutput 
 * @returns 
 */
  getDeviceOutputDetails(deviceOutput : DeviceOutput):Observable<DeviceOutput>{
    return this.http.get<DeviceOutput>(`${this.host}/device-output/get-detail/${deviceOutput.id}`)
  }

  /**
   * simple list
   * @returns 
   */
  getAllDeviceOutput():Observable<DeviceOutput[]>{
    return this.http.get<DeviceOutput[]>(`${this.host}/device-output/list-all`)
  }
}
