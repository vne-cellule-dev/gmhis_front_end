import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../_models/customer.model';
import { PageList } from '../_models/page-list.model';
import { Promotion } from '../_models/promotion.model';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

    
      private host = environment.apiUrl;

      constructor(private http: HttpClient) { }

      /**
       * get active list no expired of promotion
       * @returns Promotion[]
       */
      findNonExpired(): Observable<Promotion[]> {
        return this.http.get<Promotion[]>(`${this.host}/promotion/list-no-expired`)
      }

      /**
       * get all paginated Promotion list
       * @param data 
       * @returns PageList
       */
      findAll(data): Observable<PageList> {

        let queryParams = {};

        queryParams = {
          params: new HttpParams()
          .set('criteria', data['criteria']  ?? "")
          .set('criteriaType', data['criteriaType'] ?? "")
          .set('page', data['page'])
          .set('size', data['size'] ?? "")
          .set('sort', data['sort'])
        };
        return this.http.get<PageList>(`${this.host}/promotion/list`, queryParams)
      }

      /**
       *  create a new Promotion
       * @param Promotion 
       * @returns Promotion
       */
      save(promotion: Promotion): Observable<Promotion> {
        return this.http.post<Promotion>(`${this.host}/promotion/add`, promotion)
      }

      /**
       *  update a promotion
       * @param Promotion 
       * @returns promotion
       */
      update(promotion: Promotion): Observable<Promotion> {
        return this.http.put<Promotion>(`${this.host}/promotion/update/` + promotion.id, promotion)
      }

      /**
       * get year details by promotion Id
       * @param promotionId 
       * @returns 
       */
      getPromotionDetails(promotionId : number) : Observable<Promotion>{
        return this.http.get<Promotion>(`${this.host}/promotion/get-detail/` + promotionId)
      }


      /**
     * 
     * @param promotion 
     * @returns 
     */
    deletePromotion(promotion : Promotion): Observable<Promotion>{
      return this.http.delete<Promotion>(`${this.host}/promotion/delete/`+promotion.id)
    }
    /**
     * Assign a promotion to a client
     */

    assignPromotiontoCustomer(customer : Customer, promotion : Promotion ): Observable<any>{
      let promotionId = 0;
      if (promotion.id) {
        promotionId  = promotion.id;
      }      
      return this.http.put<any>(`${this.host}/promotion/assign-promotion/` + `${customer.id}, ${promotionId}`, customer )
    }


    getNumberOfPromotionIncourse(){
      return this.http.get<Promotion>(`${this.host}/promotion/number-ongoing-promotion`)
    }
}
