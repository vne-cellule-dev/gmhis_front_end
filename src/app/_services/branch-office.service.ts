import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BranchOffice } from '../_models/branchOffice.model';
import { Customer } from '../_models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class BranchOfficeService {

  private host = environment.apiUrl;

  constructor(private http : HttpClient) { }

  /**
 * get list of branchOffice
 * @returns BranchOffice[]
 */
   findallBranchOffice(customerId : number): Observable<BranchOffice[]> {
    return this.http.get<BranchOffice[]>(`${this.host}/branch-office/list-by-customer/${customerId}`)
  }

    /**
       *  create a new BranchOffice
       * @param BranchOffice 
       * @returns BranchOffice
       */
     save(branchOffice: BranchOffice): Observable<BranchOffice> {
      return this.http.post<BranchOffice>(`${this.host}/branch-office/add`, branchOffice)
    }

    /**
       *  update a branchOffice
       * @param branchOffice 
       * @returns branchOffice
       */
     update(branchOffice: BranchOffice): Observable<BranchOffice> {
      return this.http.put<BranchOffice>(`${this.host}/branch-office/update/` + branchOffice.id, branchOffice)
    }

      /**
       * get branchOfficeId details by branchOfficeId Id
       * @param branchOfficeIdId 
       * @returns 
       */
       getDetails(branchOfficeId : number) : Observable<BranchOffice>{
        return this.http.get<BranchOffice>(`${this.host}/branch-office/get-detail/` + branchOfficeId)
      }
}
