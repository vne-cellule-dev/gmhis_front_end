import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InventoryPlanning } from '../_models/inventorPlanning.model';
import { Inventory } from '../_models/inventory.model';
import { InventoryCustomer } from '../_models/inventoryCustomer.model';
import { PageList } from '../_models/page-list.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private host = environment.apiUrl;

  constructor(private http : HttpClient) { }
/*****************STAR SHOWROOM INVENTORY ***************/


  /**
   * get active list of showroom inventory
   * @returns Inventory[]
   */
   findActive(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(`${this.host}/inventory/active-list`)
  }

  /**
   * get all paginated inventory list
   * @param data 
   * @returns PageList
   */
  findAll(data): Observable<PageList> {

    let queryParams = {};

    queryParams = {
      params: new HttpParams()
      
      .set('criteria', data['criteria']  ?? "")
      .set('date', data['date']  ?? "")
      .set('criteriaType', data['criteriaType'] ?? "")
      .set('depot', data['depot'])
      .set('page', data['page'])
      .set('size', data['size'] ?? "")
      .set('sort', data['sort'])
    };
    return this.http.get<PageList>(`${this.host}/inventory/list`, queryParams)
  }

  /**
   *  create a new inventory
   * @param Invnetory 
   * @returns Invnetory
   */
  save(inventory: Inventory): Observable<Inventory> {
    return this.http.post<Inventory>(`${this.host}/inventory/add`, inventory)
  }

  /**
   *  update a Invnetory
   * @param Invnetory 
   * @returns Invnetory
   */
  update(invnetory: Inventory): Observable<Inventory> {
    return this.http.put<Inventory>(`${this.host}/inventory/update/` + invnetory.id, invnetory)
  }

  /**
   * get driver details by invnetory Id
   * @param invnetoryId 
   * @returns 
   */
  getInventoryDetails(invnetoryId : number) : Observable<Inventory>{
    return this.http.get<Inventory>(`${this.host}/inventory/get-detail/` + invnetoryId)
  }

  getInventoryArticles(invnetoryId : number) : Observable<any[]>{
    return this.http.get<any[]>(`${this.host}/inventory/get-articles/` + invnetoryId)
  }

  /**
   * 
   * @param inventory 
   * @returns 
   */
  public inventoryConsolidation(inventory : Inventory) : Observable<Inventory>{
    return this.http.put<Inventory>(`${this.host}/inventory/consolidate/` + inventory.id, inventory)
  }

  /**
  * 
  * @returns 
  */
  public getInventoryShowroomToConsolidate() : Observable<number>{
    return this.http.get<number>(`${this.host}/inventory/inventory-to-consolidate/`)
  }

public deleteInventoriedArticle(inventoriedArticleId : any) : Observable<any> {
  return this.http.delete<any>(`${this.host}/inventory/delete-inventoried-article/`+ Number(inventoriedArticleId))
}

public deleteInventory(inventory : Inventory) : Observable<any> {
  return this.http.delete<any>(`${this.host}/inventory/delete-inventory/`+ inventory.id)
}

/*****************END SHOWROOM INVENTORY*****************/
/*****************STAR CUSTMOER INVENTORY***************/

/**
 * 
 * @param data 
 * @returns 
 */
public findAllCustomerInventories(data):Observable<PageList>{
  let queryParams = {};

  queryParams = {
    params: new HttpParams()
    .set('date', data['date']  ?? "")
    .set('criteria', data['criteria'] ?? "")
    .set('criteriaType', data['criteriaType'] ?? "")
    .set('page', data['page'])
    .set('size', data['size'] ?? "")
    .set('sort', data['sort'])
  };
  return this.http.get<PageList>(`${this.host}/inventory-customer/list`, queryParams)
}

/**
 * 
 * @param customerInventory 
 * @returns 
 */
saveCustomerInventory(customerInventory : InventoryCustomer):Observable<InventoryCustomer>{
  return this.http.post<InventoryCustomer>(`${this.host}/inventory-customer/add`,customerInventory)
}


/**
 * 
 * @param customerInventory 
 * @returns 
 */
updateCustomerInventory(customerInventory : InventoryCustomer): Observable<InventoryCustomer>{
  return this.http.put<InventoryCustomer>(`${this.host}/inventory-customer/update/`+customerInventory.id, customerInventory)
}

/**
 * 
 * @param customerInventoryId 
 * @returns 
 */
getCustomerInventoryDetails(customerInventoryId : number) : Observable<InventoryCustomer>{
  return this.http.get<InventoryCustomer>(`${this.host}/inventory-customer/get-detail/` + customerInventoryId)
}


getCustomerInventoryArticles(customerInventoryId : number) : Observable<any[]>{
  return this.http.get<any[]>(`${this.host}/inventory-customer/list-article/`+ customerInventoryId)
}

public deleteCustomerInventoriedArticle(inventoriedArticleId : any) : Observable<any> {
  return this.http.delete<any>(`${this.host}/inventory-customer/delete-inventoried-article/`+ Number(inventoriedArticleId))
}
/***
/*****************END CUSTOMER INVENTORY****************/
/*****************START PLANNING INVENTORY****************/

/**
 * 
 * @param data 
 * @returns 
 */
 public findAllplanningInventories(data):Observable<PageList>{
  let queryParams = {};

  queryParams = {
    params: new HttpParams()
    .set('criteria', data['criteria'] ?? "")
    .set('date', data['date'] ?? "")
    .set('criteriaType', data['criteriaType'] ?? "")
    .set('page', data['page'])
    .set('size', data['size'] ?? "")
    .set('sort', data['sort'])
  };
  return this.http.get<PageList>(`${this.host}/inventory-planning/list`, queryParams)
}

/**
 * 
 * @param planningInventory 
 * @returns 
 */
savePlanningInventory(planningInventory : InventoryPlanning):Observable<InventoryPlanning>{
  return this.http.post<InventoryPlanning>(`${this.host}/inventory-planning/add`,planningInventory)
}


/**
 * 
 * @param planningInventory 
 * @returns 
 */
updatePlanningInventory(planningInventory : InventoryPlanning): Observable<InventoryPlanning>{
  return this.http.put<InventoryPlanning>(`${this.host}/inventory-planning/update/`+planningInventory.id, planningInventory)
}

/**
 * 
 * @param planningInventoryId 
 * @returns 
 */
getInventoryPlanningDetails(planningInventoryId : number) : Observable<InventoryPlanning>{
  return this.http.get<InventoryPlanning>(`${this.host}/inventory-planning/get-detail/` + planningInventoryId)
}
/**
 * 
 */
validatePlanningInventory(planningInventory : InventoryPlanning) : Observable<InventoryPlanning>{
  return this.http.put<InventoryPlanning>(`${this.host}/inventory-planning/make-as-perform/` + planningInventory.id, planningInventory)
}

getInventoryPlanningToPerform() : Observable<number>{
  return this.http.get<number>(`${this.host}/inventory-planning/inventory-to-perform`)
}

/*****************END PLANNING INVENTORY****************/

/**
 * 
 * @param planningInventory 
 * @returns 
 */
deletePlanningInventory(planningInventory : InventoryPlanning): Observable<InventoryPlanning>{
  return this.http.delete<InventoryPlanning>(`${this.host}/inventory-planning/delete/`+planningInventory.id)
}

}
