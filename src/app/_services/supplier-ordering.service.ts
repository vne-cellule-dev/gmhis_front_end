import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ArticleOrdered } from '../_models/articleOrdered.model';
import { BillOfLading } from '../_models/billOfLading.model';
import { BillOfLadingContainerCost } from '../_models/billOfLadingContainerCost.model';
import { blContainer } from '../_models/blContainer.model';
import { ContainerTracking } from '../_models/containerTracking.model';
import { FreightForwarder } from '../_models/freightForwarder.model';
import { PageList } from '../_models/page-list.model';
import { supplierOrdering } from '../_models/supplier-ordering.model';
import { SupplierPayement } from '../_models/supplierPayment.model';

@Injectable({
  providedIn: 'root'
})
export class SupplierOrderingService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /***********************ORDER SERVICE*******************/
  /**
   * find all paginated supplier orderings
   * @param data 
   * @returns PageList
   */
  findAllOrder(data): Observable<PageList> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('page', data['page'])
        .set('date', data['date'] ?? "")
        .set('size', data['size'] ?? "")
        .set('criteria', data['criteria'] ?? "")
        .set('criteriaType', data['criteriaType'])
        .set('sort', data['sort'])
    };
    return this.http.get<PageList>(`${this.host}/supplier-order/list`, queryParams)
  }

  /**
  * get article ordered detail by articleiD
  * @param articleOrderedId 
  * @returns 
  */
  geArticleOrderedDetails(articleOrderedId: number): Observable<ArticleOrdered> {
    return this.http.get<ArticleOrdered>(`${this.host}/article-ordered/get-detail/` + articleOrderedId)
  }

  /**
   * save a Supplier Ordering
   * @param supplierOrdering 
   * @returns SupplierOrdering
   */
  saveOrder(supplierOrdering: supplierOrdering): Observable<supplierOrdering> {
    return this.http.post<supplierOrdering>(`${this.host}/supplier-order/add`, supplierOrdering)
  }

  /**
   * update a Supplier Ordering
   * @param supplierOrdering 
   * @returns Supplier Ordering
   */
  updateOrder(supplierOrdering: supplierOrdering): Observable<supplierOrdering> {
    return this.http.put<supplierOrdering>(`${this.host}/supplier-order/update/` + supplierOrdering.id, supplierOrdering)
  }

  /**
   * get detail of a supplier order
   * @param billOfLading 
   * @returns 
   */
  getSupplierOrderDetail(id: number): Observable<supplierOrdering> {
    return this.http.get<supplierOrdering>(`${this.host}/supplier-order/get-detail/${id}`)
  }


  /**
   * delete a supplier order
   * @param billOfLading 
   * @returns 
   */
  deleteSupplierOrder(id: number): Observable<any> {
    return this.http.delete<any>(`${this.host}/supplier-order/delete/${id}`)
  }


  /***********************END ORDER SERVICE*******************/


  /***********START BILL OF LADING***************************/

  findAllBillOfLading(data): Observable<PageList> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('page', data['page'])
        .set('date', data['date'] ?? "")
        .set('size', data['size'] ?? "")
        .set('criteria', data['criteria'] ?? "")
        .set('criteriaType', data['criteriaType'])
        .set('sort', data['sort'])
    };
    return this.http.get<PageList>(`${this.host}/bill-of-lading/list`, queryParams)
  }

  /**
   * get All of bill of lading uncompleted
   * @returns BillOfLading[]
   */
  getAllBillOfLadingUncompleted(): Observable<BillOfLading[]> {
    return this.http.get<BillOfLading[]>(`${this.host}/bill-of-lading/get-uncompleted`)
  }

  /**
   * save a bill of lading 
   * @param billOfLading 
   * @returns 
   */
  saveBillOfLading(billOfLading: BillOfLading): Observable<BillOfLading> {
    return this.http.post<BillOfLading>(`${this.host}/bill-of-lading/add`, billOfLading)
  }

  /**
   * update a bill of lading 
   * @param billOfLading 
   * @returns 
   */
  updateBillOfLading(billOfLading: BillOfLading): Observable<BillOfLading> {
    return this.http.put<BillOfLading>(`${this.host}/bill-of-lading/update/` + billOfLading.id, billOfLading)
  }

  /**
   * get a bill of lading details by id
   * @param BillOfLadingId 
   * @returns 
   */
  getBillOfLadingDetail(BillOfLadingId: number): Observable<BillOfLading> {
    return this.http.get<BillOfLading>(`${this.host}/bill-of-lading/get-detail/${BillOfLadingId}`)
  }

  /**
   * get a list of bill of lading details by billNumber
   * @param BillOfLadingNumber 
   * @returns 
   */
  getBillOfLadingDetailByNumber(BillOfLadingNumber: string): Observable<BillOfLading[]> {
    return this.http.get<BillOfLading[]>(`${this.host}/bill-of-lading/find-by-number/${BillOfLadingNumber}`)
  }

  /**
   * get a bill of lading details by billNumber
   * @param BillOfLadingNumber 
   * @returns 
   */
   getSingleBlDetailByNumber(BillOfLadingNumber: string): Observable<BillOfLading> {
    return this.http.get<BillOfLading>(`${this.host}/bill-of-lading/get-detail-by-number/${BillOfLadingNumber}`)
  }

  /**
   * set a bill of lading containers cost
   * @param billOfLading 
   * @returns 
   */
  setCost(containerCost: BillOfLadingContainerCost): Observable<BillOfLading> {
    return this.http.put<BillOfLading>(`${this.host}/bill-of-lading/set-cost/` + containerCost.billOfLading, containerCost)
  }

  /**
   * get not calculated average cost Bill of lading
   * @returns BillOfLading[]
   */
  getNotCalculatedAveraveCostBl(): Observable<any[]> {
    return this.http.get<any[]>(`${this.host}/bill-of-lading/average-cost-to-calculate`)
  }

  /**
   * get not calculated average cost Bill of lading
   * @returns BillOfLading[]
   */
   getNotCalculatedAveraveCostBlByBl(billNumber: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.host}/bill-of-lading/average-cost-to-calculate/`+billNumber)
  }

  /**
     * update the everageCost of all article of a bill of lading
     * @param averageCostDto 
     * @returns SupplierOrdering
     */
  updateArticleAverageCost(averageCostDto: any): Observable<any> {
    return this.http.post<any>(`${this.host}/bill-of-lading/calculate-average-cost`, averageCostDto)
  }

  /**
     * update the everageCost of all article of a bill of lading
     * @param averageCostDto 
     * @returns SupplierOrdering
     */
   updateArticleAverageCostByContainer(averageCostByContainerDto: any): Observable<any> {
    return this.http.post<any>(`${this.host}/bill-of-lading/cump-by-container`, averageCostByContainerDto)
  }

  /**
   * Revert the everageCost update of all article of a bill of lading
   * @param averageCostDto 
   * @returns SupplierOrdering
   */
  revertArticleAverageCost(billOfLading: number): Observable<any> {
    return this.http.post<any>(`${this.host}/bill-of-lading/revert-average-cost`, billOfLading)
  }

  /**
   * Revert the everageCost update of all article of a bill of lading container
   * @param averageCostDto 
   * @returns SupplierOrdering
   */
   revertContainerAverageCost(billOfLadingContainer: number): Observable<any> {
    return this.http.post<any>(`${this.host}/bill-of-lading/revert-cump-by-container`, billOfLadingContainer)
  }
  

  /**
   * get containers by bl
   * @param billOfLadingId 
   * @returns 
   */
  getBlContainers(billOfLadingId: number): Observable<any[]> {
    return this.http.get<any>(`${this.host}/bill-of-lading/containers/` + billOfLadingId)
  }

/**
   * get containers by bl
   * @param billOfLadingId 
   * @returns 
   */
 getBlDistinctContainers(billOfLadingId: number): Observable<any[]> {
  return this.http.get<any>(`${this.host}/bill-of-lading/distincts-containers/` + billOfLadingId)
}
  

  /**
    * delete a bill of lading
    * @param billOfLading 
    * @returns 
    */
  deleteBillOfLading(id: number) {
    return this.http.delete<any>(`${this.host}/bill-of-lading/delete/${id}`)
  }


  /**
     * delete a supplier order
     * @param billOfLading 
     * @returns 
     */
  deleteBlContainer(id: number): Observable<any> {
    return this.http.delete<any>(`${this.host}/bill-of-lading/delete-container/${id}`)
  }

  findAllBillOfLadingForPrint(data): Observable<any> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('date', data['date'] ?? "")
        .set('criteria', data['criteria'] ?? "")
        .set('criteriaType', data['criteriaType'])
    };
    return this.http.get<any>(`${this.host}/bill-of-lading/simple-list`, queryParams)
  }

  /***********END BILL OF LADING****************************/


  /********************START FREIGHT FORWAEDER  SERVICE*********/


  findActiveFreightForwarder(): Observable<FreightForwarder[]> {
    return this.http.get<FreightForwarder[]>(`${this.host}/freightForwarder/list-active`)
  }
  /********************END FREIGHT FORWAEDER  SERVICE*********/

  /*************START CONTAINER TYPE SERVICE**************** */

  findActiveContainerType(): Observable<any[]> {
    return this.http.get<any[]>(`${this.host}/containerType/list-active`)
  }
  /*************END CONTAINER TYPE SERVICE**************** */




  /***********************ARTICLE ORDERD SERVICE*******************/

  /**
     * find all paginated supplier orderings
     * @param data 
     * @returns PageList
     */
  findAllArticleOrdered(data): Observable<PageList> {

    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('page', data['page'])
        .set('size', data['size'] ?? "")
        .set('criteria', data['criteria'] ?? "")
        .set('criteriaType', data['criteriaType'])
        .set('sort', data['sort'])
    };
    return this.http.get<PageList>(`${this.host}/article-ordered/list`, queryParams)
  }

  /**
   * update a Supplier Ordering
   * @param supplierOrdering 
   * @returns Supplier Ordering
   */
  updateArticleOrdered(articleOrdered: ArticleOrdered): Observable<ArticleOrdered> {
    return this.http.put<ArticleOrdered>(`${this.host}/article-ordered/update/` + articleOrdered.id, articleOrdered)
  }

  /**
   * find a list of article ordered by supplier Id
   * @param SupplierOrderId 
   * @returns 
   */
  findArticleOrderedByOrder(SupplierOrderId: number): Observable<ArticleOrdered[]> {
    return this.http.get<ArticleOrdered[]>(`${this.host}/article-ordered/find-by-order/` + SupplierOrderId)

  }

  /**
   * find a article ordered by order id and article id
   * @param SupplierOrderId 
   * @returns 
   */
  findArticleOrderedByOrderAndArticle(orderId: number, articleId: number): Observable<ArticleOrdered> {
    return this.http.get<ArticleOrdered>(`${this.host}/article-ordered/find-by-order-and-article/` + orderId + `/` + articleId);

  }

  /**
     * delete a article ordered
     * @param billOfLading 
     * @returns 
     */
  deleteArticleOrdered(id: number): Observable<any> {
    return this.http.delete<any>(`${this.host}/article-ordered/delete/${id}`)
  }


  /***********************END ARTICLE ORDERD SERVICE*******************/


  /**********************START CONTAINER TRACKING SERVICE*********************/
  /**
   * find all paginated container tracking
   * @param data 
   * @returns PageList
   */
  findAllContainerTracking(data): Observable<PageList> {

    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('page', data['page'])
        .set('size', data['size'] ?? "")
        .set('criteria', data['criteria'] ?? "")
        .set('criteriaType', data['criteriaType'])
        .set('sort', data['sort'])
    };
    return this.http.get<PageList>(`${this.host}/supplier-order-loading/list`, queryParams)
  }

  /**
     * save a Container Tracking
     * @param containerTracking 
     * @returns SupplierOrdering
     */
  saveContainerTracking(containerTracking: ContainerTracking): Observable<ContainerTracking> {
    return this.http.post<ContainerTracking>(`${this.host}/supplier-order-loading/add`, containerTracking)
  }

  /**
   * update a Supplier Ordering
   * @param supplierOrdering 
   * @returns Supplier Ordering
   */
  updateContainerTracking(containerTracking: ContainerTracking): Observable<ContainerTracking> {
    return this.http.put<ContainerTracking>(`${this.host}/supplier-order-loading/update/` + containerTracking.id, containerTracking)
  }


  /**********************END CONTAINER TRACKING SERVICE*********************/



  /***********************SUPPLIER ORDER STOCK*******************/
  /**
     * find all paginated supplier order stock
     * @param data 
     * @returns PageList
     */
  findOrderStock(data): Observable<PageList> {

    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('page', data['page'])
        .set('size', data['size'] ?? "")
        .set('name', data['name'] ?? "")
        .set('reference', data['reference'])
        .set('articleSubFamily', data['articleSubFamily'] ?? "")
        .set('sort', data['sort'])
    };
    return this.http.get<PageList>(`${this.host}/supplier-order-stock/find-all`, queryParams)
  }
  /**
   * for print
   * @param data 
   * @returns 
   */
  findOrderStockSimplePage(data): Observable<PageList> {

    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('name', data['name'] ?? "")
        .set('reference', data['reference'])
        .set('articleSubFamily', data['articleSubFamily'] ?? "")
    };
    return this.http.get<PageList>(`${this.host}/supplier-order-stock/list`, queryParams)
  }

  /***********************END SUPPLIER ORDER STOCK*******************/

  /***************START SUPPLIER PAYEMENT*******************/
  /**
     * find all paginated supplier payement
     * @param data 
     * @returns PageList
     */
  findAllSupplierPayement(data): Observable<PageList> {

    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('date', data['date'] ?? "")
        .set('page', data['page'])
        .set('size', data['size'] ?? "")
        .set('criteria', data['criteria'] ?? "")
        .set('criteriaType', data['criteriaType'])
        .set('sort', data['sort'])
    };
    return this.http.get<PageList>(`${this.host}/supplier-payment/list`, queryParams)
  }

  /**
     * save a Supplier Payement
     * @param SupplierPayement 
     * @returns SupplierPayement
     */
  saveSupplierPayement(supplierPayement: SupplierPayement): Observable<SupplierPayement> {
    return this.http.post<SupplierPayement>(`${this.host}/supplier-payment/add`, supplierPayement)
  }

  /**
   * update a Supplier Payement
   * @param SupplierPayement 
   * @returns Supplier Payement
   */
  updateSupplierPayement(supplierPayement: SupplierPayement): Observable<SupplierPayement> {
    return this.http.put<SupplierPayement>(`${this.host}/supplier-payment/update/` + supplierPayement.id, supplierPayement)
  }

  getSupplierPayementDetail(blId: number): Observable<SupplierPayement[]> {
    return this.http.get<SupplierPayement[]>(`${this.host}/supplier-payment/get-by-bill-of-lading/` + blId)
  }
  /***************END SUPPLIER PAYEMENT*******************/

  /***** */

  getNumberOfongoingSupplierOrder() {
    return this.http.get<number>(`${this.host}/supplier-order/ongoing-supplier-order`)
  }

  getNumberOContainerInSea() {
    return this.http.get<number>(`${this.host}/bill-of-lading/container-in-sea`)
  }

  getNumberOfBlInProgress() {
    return this.http.get<number>(`${this.host}/bill-of-lading/get-number-in-progress`)
  }
  

  /**
   * get container in sea by article
   * @returns 
   */
   getContainerInSeaByArticle(articleId: number):Observable<any[]>{
    return this.http.get<any[]>(`${this.host}/bill-of-lading/container-in-sea-by-article/`+ articleId)
  }

   /**
   * get last containers by article
   * @returns 
   */
    getLastContainersByArticle(data):Observable<any[]>{

      let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('articleId', data['articleId'])
        .set('supplierId', data['supplierId'] ?? "")
    };
      return this.http.get<any[]>(`${this.host}/bill-of-lading/last-purchase-price`, queryParams)
    }

}
