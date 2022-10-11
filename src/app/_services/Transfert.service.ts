import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ArticleTransfered } from '../_models/articleTransfered.model';
import { PageList } from '../_models/page-list.model';
import { Transfert } from '../_models/transfert.model';

@Injectable({
  providedIn: 'root'
})
export class TransfertService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * find all paginated Transfert orderings
   * @param data 
   * @returns PageList
   */
   findAllTransfert(data): Observable<PageList> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('page', data['page'])
        .set('size', data['size'] ?? "")
        .set('initialDepot', data['initialDepot'] ?? "")
        .set('finalDepot', data['finalDepot'] ?? "")
        .set('transferNumber', data['transferNumber'])
        .set('date', data['date'])
        .set('state', data['state'] ?? 0 )
        .set('sort', data['sort'])
    };
    return this.http.get<PageList>(`${this.host}/transfer/list`, queryParams)
  }

  /**
   * add new transfert
   * @param transfert 
   * @returns 
   */
  saveTransfert(transfert: Transfert): Observable<number> {
    return this.http.post<number>(`${this.host}/transfer/add`, transfert)
  }

  /**
   * update transfert
   * @param transfert 
   * @returns 
   */
  updateTransfert(transfert: Transfert): Observable<number> {
    return this.http.put<number>(`${this.host}/transfer/update/`+ transfert.id, transfert)
  }

  /**
   * validated transfer
   * @param transfert 
   * @returns 
   */
  valitedTransfert(transfert: any): Observable<Transfert> {
    return this.http.put<Transfert>(`${this.host}/transfer/validate/`+ transfert["id"], transfert )
  }

    /**
   * canceled transfer
   * @param transfert 
   * @returns 
   */
     canceledTransfert(transfer : any): Observable<Transfert> {
      return this.http.put<Transfert>(`${this.host}/transfer/cancel/`+ transfer[0], transfer)
    }

    deleteArticleTransfered(articleTransfered : ArticleTransfered): Observable<ArticleTransfered> {
      return this.http.delete<ArticleTransfered>(`${this.host}/transfer/delete-article/`+ articleTransfered.id)
    }

  getListOfArticleTransferedByTransfertId(transfertId) :Observable<any[]>{
    return this.http.get<any[]>(`${this.host}/transfer/list-article-transferred/`+transfertId)
  }

  getNumberOfTransfertToValidated(): Observable<number>{
    return this.http.get<number>(`${this.host}/transfer/transfer-to-validate`)
  }

  printTransferDeliveryNote(printDeliveryNote: any): Observable<Transfert>{
    return this.http.put<Transfert>(`${this.host}/transfer/print-delivery-note/`+ printDeliveryNote.transfer, printDeliveryNote);
  }
  
  /**
   * get detail of a transfert order
   * @param Transfert 
   * @returns 
   */
   getTransferDetail(TransfertId: number): Observable<Transfert> {
    return this.http.get<Transfert>(`${this.host}/transfer/get-detail/${TransfertId}`)
  }

  /**
   * List all transfers by transfer number
  */
  findAllTransfertByTransfertNumber(data:string): Observable<Transfert[]> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('transfertNumber', data)
       
    };
    return this.http.get<Transfert[]>(`${this.host}/transfer/transfert-list`, queryParams)
  }

  /**
   * List single transfer by transfer number
   */
   findSingleByTransfertNumber(number : string): Observable<Transfert> {
    return this.http.get<Transfert>(`${this.host}/transfer/find-by-number/${number}`)
  }

  getTranfertHistory(data : string): Observable<any[]>{
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('date', data)
    };
    return this.http.get<any[]>(`${this.host}/transfer/list-history`, queryParams)
  }

  getAllTansferredArticle(data : any): Observable<PageList>{
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('date', data['date'])
        .set('article', data['article'])
        .set('initialDepot', data['initialDepot'])
        .set('finalDepot', data['finalDepot'])
        .set('page', data['page'])
        .set('size', data['size'] ?? "")
    };
    console.log(queryParams);
    return this.http.get<PageList>(`${this.host}/transfer/list-transferred-article`, queryParams)
  }

  getTansferredArticleSimpleList(data : any): Observable<any[]>{
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('date', data['date'])
        .set('article', data['article'])
        .set('initialDepot', data['initialDepot'])
        .set('finalDepot', data['finalDepot'])
    };
    console.log(queryParams);
    return this.http.get<any[]>(`${this.host}/transfer/simple-list-transferred-article`, queryParams)
  }
  
}

