import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Asset } from '../_models/asset.model';
import { PageList } from '../_models/page-list.model';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * get all paginated Assets
   * @param data 
   * @returns PageList
   */
  findAll(data): Observable<PageList> {

    let queryParams = {};
    queryParams = {
      params: new HttpParams()
      .set('blNumber', data['blNumber'] )
      .set('assetNumber', data['assetNumber'])
      .set('depot', data['depot'])
      .set('date', data['date'])
      .set('state', data['state'])
      .set('customer', data['customer'])
      .set('customer', data['customer'])
      .set('article', data['article'] ?? "")
      .set('page', data['page'])
      .set('size', data['size'] ?? "")
      .set('sort', data['sort'])
    };
    return this.http.get<PageList>(`${this.host}/assets/list`, queryParams)
  }

  /**
   * create a new Assets
   * @param Assets 
   * @returns Assets
   */
  save(assets: Asset): Observable<Asset> {
    return this.http.post<Asset>(`${this.host}/assets/add`, assets)
  }

  /**
   * create a new Asset
   * @param Asset
   * @returns Asset
   */
   saveAssetWithout(asset: Asset): Observable<Asset> {
    return this.http.post<Asset>(`${this.host}/assets/add-without-bl`, asset)
  }

  /**
   * update a assets
   * @param Assets 
   * @returns Assets
   */
  update(assets: Asset): Observable<Asset> {
    return this.http.put<Asset>(`${this.host}/assets/update/` + assets.id, assets)
  }

  getCustomerAssetActivity(data: any): Observable<any[]> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('customerId', data['customerId'])
        .set('date', data['date'] ?? "")
    };
    return this.http.get<any[]>(`${this.host}/assets/list-by-customer`, queryParams)
  }

 /**
  * get assets detail by Id
  * @param assetsId 
  * @returns 
  */
    getAssetDetails(assetsId : number) : Observable<Asset>{
      return this.http.get<Asset>(`${this.host}/assets/get-detail/` +assetsId)
    }

  /**
   *List all assets by asset number
  */
   findAllAssetsByAssetNumber(data:string): Observable<Asset[]> {
    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('assetNumber', data)
    };
    return this.http.get<Asset[]>(`${this.host}/assets/asset-list`, queryParams)
  }

   /**
   * canceled asset
   * @param transfert 
   * @returns 
   */
    canceledAsset(asset : Asset): Observable<Asset> {      
      return this.http.put<Asset>(`${this.host}/assets/cancel/`+ asset[0], asset)
    }

      /**
   * canceled asset
   * @param transfert 
   * @returns 
   */
       validatedAsset(asset : Asset): Observable<Asset> {
        return this.http.put<Asset>(`${this.host}/assets/consolidate/`+ asset[0], asset)
      }

      assetToConsolidate(): Observable<Number>{
        return this.http.get<number>(`${this.host}/assets/asset-to-consolidate`)
      }
}
