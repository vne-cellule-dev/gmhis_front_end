import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ArticleOrdered } from '../_models/articleOrdered.model';
import { ArticleSold } from '../_models/articleSold.model';
import { customerArticleOrdered } from '../_models/customerArticleOrdered.model';
import { CustomerOrder } from '../_models/customerOder.model';
import { Delivery } from '../_models/delivery.model';
import { PageList } from '../_models/page-list.model';
import { ShowroomSale } from '../_models/showroomSale.model';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }
  /**
   * find all paginated Delivery 
   * @param data 
   * @returns PageList
   */
   findAll(data): Observable<PageList> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('page', data['page'])
        .set('date', data['date'] ?? "")
        .set('size', data['size'] ?? "")
        .set('criteria', data['criteria'] ?? "")
        .set('criteriaType', data['criteriaType'])
        .set('depot', data['depot'])
        .set('sort', data['sort'])
    };
    return this.http.get<PageList>(`${this.host}/sales-delivery/list`, queryParams)
  }

   /**
   * get article Delivery detail by Delivery id
   * @param DeliveryId 
   * @returns 
   */
    geDeliveryDetails(DeliveryId : number) : Observable<customerArticleOrdered[]>{
      return this.http.get<customerArticleOrdered[]>(`${this.host}/sales-delivery/list-article-sold/` +DeliveryId)
    }

  /**
   * save a Delivery 
   * @param Delivery 
   * @returns Delivery
   */
  saveDelivery(Delivery: Delivery): Observable<Delivery> {
    return this.http.post<Delivery>(`${this.host}/sales-delivery/add`, Delivery)
  }

  /**
   * update a Delivery 
   * @param Delivery 
   * @returns Delivery 
   */
  updateDelivery(Delivery: Delivery): Observable<Delivery> {
    return this.http.put<Delivery>(`${this.host}/sales-delivery/update/` + Delivery.id, Delivery)
  }

  /**
   * update a Delivery invoice
   * @param Delivery 
   * @returns Delivery 
   */
   updateDeliveryInvoice(data: any): Observable<Delivery> {
    return this.http.put<Delivery>(`${this.host}/sales-delivery/update-sale-invoice/` + data.id, data)
  }
  

  getCustomerSaleDeliveryActivity(data: any): Observable<any[]> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('customerId', data['customerId'])
        .set('date', data['date'] ?? "")
    };
    return this.http.get<any[]>(`${this.host}/sales-delivery/list-by-customer`, queryParams)
  }
 
  /**
   * 
   */

  getArticleOrderedNoDelivery(customerOderId: number): Observable<customerArticleOrdered[]> {
    return this.http.get<customerArticleOrdered[]>(`${this.host}/customer-order/list-cutomer-article-ordered-no-delivery/${customerOderId}`)
  }

  /**
   * 
   * @param delivery 
   * @returns 
   */
  getArticleSoldByDeliveryId(delivery: Delivery | ShowroomSale): Observable<any[]> {
    return this.http.get<any[]>(`${this.host}/sales-delivery/list-article-sold/${delivery.id}`)
  }

  getDeliveryHistory(data : string): Observable<any[]>{
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('date', data)
    };
    return this.http.get<any[]>(`${this.host}/customer-order/list-history`, queryParams)
  }

  /*****START SHOWROOM SALE************** */
  /**
   * 
   * @param data 
   * @returns 
   */
  findAllShowroomSale(data): Observable<PageList> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('page', data['page'])
        .set('size', data['size'] ?? "")
        .set('date', data['date'] ?? "")
        .set('criteria', data['criteria'] ?? "")
        .set('criteriaType', data['criteriaType'])
        .set('depot', data['depot'])
        .set('sort', data['sort'])
    };
    return this.http.get<PageList>(`${this.host}/sales-delivery/list-showroom-sale`, queryParams)
  }

  findAllShowroomSaleSimplePage(data): Observable<ShowroomSale[]> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('criteria', data['criteria'] ?? "")
        .set('criteriaType', data['criteriaType'])
        .set('depot', data['depot'])
    };
    return this.http.get<ShowroomSale[]>(`${this.host}/sales-delivery/list-sale-showroom`, queryParams)
  }
  /**
   * 
   * @param ShowroomSale 
   * @returns 
   */
  saveShowroomSale(ShowroomSale: ShowroomSale): Observable<ShowroomSale> {
    return this.http.post<ShowroomSale>(`${this.host}/sales-delivery/add-showroom-sale`, ShowroomSale)
  }

  /**
   * 
   * @param ShowroomSale 
   * @returns 
   */
  updateShowroomSale(ShowroomSale: ShowroomSale): Observable<ShowroomSale> {
    return this.http.put<ShowroomSale>(`${this.host}/sales-delivery/update-showroom-sale/` + ShowroomSale.id, ShowroomSale)
  }

  /*****END SHOWROOM SALE************** */

 /**
  * 
  * @param saleDeliveryId 
  * @returns 
  */
  getSaleDeliveryDetails(saleDeliveryId : number) : Observable<Delivery | ShowroomSale>{
    return this.http.get<Delivery | ShowroomSale>(`${this.host}/sales-delivery/get-detail/` +saleDeliveryId)
  }

  
  findAllArticleSoldbyDelivery(data:any): Observable<any> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('salesDeliveryId', data)
       
    };
    return this.http.get<any>(`${this.host}/sales-delivery/list-article-sold-by-delivery`, queryParams)
  }

  findAllDeliveryByBlNumber(data:string): Observable<Delivery> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('deliveryNumber', data)
       
    };
    return this.http.get<Delivery>(`${this.host}/sales-delivery/find-by-number`, queryParams)
  }

/**
 * List all unpaid deliveries by customer
 * @param customerOderId 
 * @returns 
 */
  public getAllUnpaidDeliveryByCustomerId(data): Observable<Delivery[]> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('customerId', data)
       
    };
    return this.http.get<Delivery[]>(`${this.host}/sales-delivery/delivery-unpaid-list`,queryParams)
  }


/**
  * 
  * @param saleId 
  * @returns 
  */
   balanceTheInvoice(saleId : number) : Observable<Delivery>{
    return this.http.get<Delivery>(`${this.host}/sales-delivery/balance-invoice/` + saleId)
  }
  
}
