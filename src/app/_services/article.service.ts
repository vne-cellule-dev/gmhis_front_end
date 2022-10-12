import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageList } from '../_models/page-list.model';
import { ArticleFamily } from '../_models/ArticleFamily.model';
import { ArticleSubFamily } from '../_models/ArticleSubFamily.model';
import { Article } from '../_models/article.model';
import { ArticleCost } from '../_models/articleCost.model';
@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /********************** START ARTICLE FAMILY SERVICE ****************************************/

  /**
   * get list of ArticleFamily active
   * @returns 
   */
  findArticleFamilyActive(): Observable<ArticleFamily[]> {
    return this.http.get<ArticleFamily[]>(`${this.host}/article-family/active-list`)
  }

  /*
    get all paginated ArticleFamily 
  */
  findAllArticleFamily(data): Observable<PageList> {

    let queryParams = {};
    
    queryParams = {
      params: new HttpParams()
        .set('page', data['page'])
        .set('size', data['size'] ?? "")
        .set('name', data['name'])
        .set('isActive', data['isActive'] ?? "")
        .set('sort', data['sort'])
    };
    return this.http.get<PageList>(`${this.host}/article-family/list`, queryParams)
  }

  /*
    save a ArticleFamily
  */
  saveArticleFamily(articleFamily: ArticleFamily): Observable<ArticleFamily> {
    return this.http.post<ArticleFamily>(`${this.host}/article-family/add`, articleFamily)
  }

  /*
    update a ArticleFamily
  */
  updateArticleFamily(articleFamily: ArticleFamily): Observable<ArticleFamily> {
    return this.http.put<ArticleFamily>(`${this.host}/article-family/update/` + articleFamily.id, articleFamily)
  }


  /**
   * get article Family Details by Id 
   * @param articleFmailyId 
   * @returns 
   */
  getArticleFamilyDetails(articleFmailyId : number) : Observable<ArticleFamily>{
    return this.http.get<ArticleFamily>(`${this.host}/article-family/get-detail/` +articleFmailyId)
  }


  /***************************END ARTICLE FAMILY SERVICE *******************************/

  /*************************** START SUB ARTICLE  SERVICE ******************************/
/**
 *  get list of sub ArticleFamily active
 * @returns ArticleSubFamily[]
 */
  findArticleSubFamilyActive(): Observable<ArticleSubFamily[]> {
    return this.http.get<ArticleSubFamily[]>(`${this.host}/article-sub-family/active-list`)
  }

  /**
   * find article Sub family by familyId
   * @param familyId 
   * @returns 
   */

  findArticleSubFamilyActiveByFamily(familyId):Observable<ArticleSubFamily[]> {
    return this.http.get<ArticleSubFamily[]>(`${this.host}/article-sub-family/find-by-family/`+familyId)
  }

 /**
  * get all paginated sub ArticleFamily 
  * @param data 
  * @returns PageList
  */
  findAllArticleSubFamily(data): Observable<PageList> {

    let queryParams = {};
    queryParams = {
      params: new HttpParams()
        .set('page', data['page'])
        .set('size', data['size'] ?? "")
        .set('name', data['name'])
        .set('familyId', data['familyId'] ?? "")
        .set('isActive', data['isActive'] ?? "")
        .set('sort', data['sort'])
    };
    return this.http.get<PageList>(`${this.host}/article-sub-family/list`, queryParams)
  }

 /**
  * save a sub ArticleFamily
  * @param articlesubFamily 
  * @returns ArticleSubFamily
  */
  saveArticleSubFamily(articlesubFamily: ArticleSubFamily): Observable<ArticleSubFamily> {
    return this.http.post<ArticleSubFamily>(`${this.host}/article-sub-family/add`, articlesubFamily)
  }

/**
 * update a sub ArticleFamily
 * @param articleSubFamily 
 * @returns ArticleSubFamily
 */
  updateArticleSubFamily(articleSubFamily: ArticleSubFamily): Observable<ArticleSubFamily> {
    return this.http.put<ArticleSubFamily>(`${this.host}/article-sub-family/update/` + articleSubFamily.id, articleSubFamily)
  }


  /**
   * get sub article family Detail by Id
   * @param articleSubFamilyId 
   * @returns 
   */
  getSubArticleFamilyDetails(articleSubFamilyId : number) : Observable<ArticleSubFamily>{
    return this.http.get<ArticleSubFamily>(`${this.host}/article-sub-family/get-detail/` +articleSubFamilyId)
  }

  /*END SUB ARTICLE SERVICE */

  /*****************************START ARTICLE  SERVICE**************************/

  /**
   * get list of Article active
   * @returns Article[]
   */
  findArticleActive(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.host}/article/active-list`)
  }

  /**
   * get all paginated Article
   * @param data 
   * @returns PageList
   */
  findAllArticle(data): Observable<PageList> {

    let queryParams = {};
    queryParams = {
      params: new HttpParams()
      .set('criteria', data['criteria'] ?? "")
      .set('criteriaType', data['criteriaType'])
      .set('page', data['page'])
      .set('size', data['size'] ?? "")
      .set('sort', data['sort'])
    };
    return this.http.get<PageList>(`${this.host}/article/list`, queryParams)
  }

 /**
  * Create new  Article
  * @param formData 
  * @returns Article
  */
  public saveArticle(formData: FormData): Observable<Article | HttpErrorResponse> {
    return this.http.post<Article>(`${this.host}/article/add`, formData)
  }

/**
 * update a Article
 * @param formData 
 * @returns 
 */
  updateArticle(formData: FormData): Observable<Article | HttpErrorResponse> {
    
    return this.http.post<Article>(`${this.host}/article/update/`, formData)
  }

  /**
   * Article FormData
   * @param article 
   * @param articleImage 
   * @returns formData
   */
  createArticleFormData(currentReference:string, article: Article, articleImages: File[]): FormData {
    const formData = new FormData();
   
    formData.append('currentReference', currentReference);
    formData.append('name', article.name);
    formData.append('reference', article.reference);
    formData.append('description', article.description);
    formData.append('articleSubFamilyId', article.articleSubFamilyId);
    formData.append('qtyInStock', JSON.stringify(article.qtyInStock));
    formData.append('qtyMax', JSON.stringify(article.qtyMax));
    formData.append('qtyMin', JSON.stringify(article.qtyMin));
    formData.append('qtyAlert', JSON.stringify(article.qtyAlert));
    formData.append('costPrice ', JSON.stringify(article.costPrice ));
    formData.append('isActive', JSON.stringify(article.isActive));
    formData.append('priceDe', JSON.stringify(article.priceDe));
    formData.append('costEuro', JSON.stringify(article.costEuro));
    formData.append('dollardCost', JSON.stringify(article.dollardCost));
    formData.append('dormantStock', JSON.stringify(article.dormantStock));
    formData.append('qty40', JSON.stringify(article.qty40));
    formData.append('custom40', JSON.stringify(article.custom40));
    formData.append('cump40', JSON.stringify(article.cump40));
    formData.append('qty45 ', JSON.stringify(article.qty45 ));
    formData.append('custom45', JSON.stringify(article.custom45));
    formData.append('cump45', JSON.stringify(article.cump45));
    formData.append('qty20 ', JSON.stringify(article.qty20 ));
    formData.append('custom20', JSON.stringify(article.custom20));
    formData.append('cump20', JSON.stringify(article.cump20));
    formData.append('salesPriceLowerThanCostPrice', JSON.stringify(article.salesPriceLowerThanCostPrice));
    formData.append('promotionalPriceBelowCostPrice', JSON.stringify(article.promotionalPriceBelowCostPrice));
    formData.append('endPromotionalSaleAtLoss', article.endPromotionalSaleAtLoss);
    formData.append('endOfSaleAtLoss',article.endOfSaleAtLoss);
    
    for (let file of articleImages) {
      formData.append('images', file);

    }
    return formData
  }

  /**
   * update article costs
   * @param article_id 
   * @param articleCosts 
   * @returns String
   */
  updateCosts(article_id: number , articleCosts: ArticleCost[]): Observable<String | HttpErrorResponse>{
    return this.http.post<string>(`${this.host}/article/add-cost/${article_id}`, articleCosts);
  }


  /**
   * get article detail by articleiD
   * @param articleId 
   * @returns 
   */
  getArticleDetails(articleId : number) : Observable<Article>{
    return this.http.get<Article>(`${this.host}/article/get-detail/` +articleId)
  }

   /**
  * 
  * @param customerId 
  * @returns 
  */
    getarticleStockByCustomer(customerId : number) : Observable<any[]>{
      return this.http.get<any[]>(`${this.host}/article/get-cost-by-customer/${customerId}`)
    }

    /**
 * 
 * @param depotId 
 * @returns 
 */
getarticleStockByDepot(name : string) : Observable<any[]>{
  return this.http.get<any[]>(`${this.host}/stock/for-inventaire/${name}`)
}


deleteArticle(article : Article): Observable<Article>{
  return this.http.delete<Article>(`${this.host}/article/delete/`+article.id)
}

deleteArticleImage(article_id: number, fileName : String): Observable<any>{
  return this.http.delete<any>(`${this.host}/article/delete-image/`+article_id+'/'+fileName)
}

  /**************** ARTICLE CATALOGUE *************************************/

   getCatalogueStockState() : Observable<any>{
    return this.http.get<any>(`${this.host}/article/catalogue-stock-state/`)
  }

  getCatalogue(customerId: number) : Observable<any>{
    return this.http.get<any>(`${this.host}/article/get-catalogue/${customerId}`)
  }

  getCatalogueBySubFamily(customerId: number) : Observable<any>{
    return this.http.get<any>(`${this.host}/article/get-catalogue-by-family/${customerId}`)
  }
  

  /**************************END ARTICLE SERVICE *************************/
}
