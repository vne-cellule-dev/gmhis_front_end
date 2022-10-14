import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageList } from '../_models/page-list.model';
import { Vehicule } from '../_models/vehicule.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {
 
  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * get active list of Vehicule
   * @returns Vehicule[]
   */
  findActive(): Observable<Vehicule[]> {
    return this.http.get<Vehicule[]>(`${this.host}/transport-vehicle/active-list`)
  }

  /**
   * get after sale service vehicle
   * @returns Driver[]
   */
   findAfterSaleServiceVehicle(): Observable<Vehicule[]> {
    return this.http.get<Vehicule[]>(`${this.host}/transport-vehicle/after-sale-service-vehicle`)
  }


  /**
   *  get all paginated Vehicule list
   * @param data 
   * @returns PageList
   */
  findAll(data): Observable<PageList> {

    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('page', data['page'])
        .set('size', data['size'] ?? "")
        .set('registerNum', data['registerNum'])
        .set('driverName', data['driverName'])
        .set('afterSaleService', data['afterSaleService'])
        .set('sort', data['sort'])
    };


    return this.http.get<PageList>(`${this.host}/transport-vehicle/list`, queryParams)
  }

  /**
   * Create new vehicule
   * @param Vehicule 
   * @returns 
   */
  save(Vehicule: Vehicule): Observable<Vehicule> {
    return this.http.post<Vehicule>(`${this.host}/transport-vehicle/add`, Vehicule)
  }

  /**
   * update vehicule
   * @param Vehicule 
   * @returns 
   */
  update(Vehicule: Vehicule): Observable<Vehicule> {
    return this.http.put<Vehicule>(`${this.host}/transport-vehicle/update/` + Vehicule.id, Vehicule)
  }

   /**
   * get detail of a vehicle order
   * @param Vehicule 
   * @returns 
   */
    getVehicleDetail(vehiculeId: number): Observable<Vehicule> {
      return this.http.get<Vehicule>(`${this.host}/transport-vehicle/get-detail/${vehiculeId}`)
    }    

}
