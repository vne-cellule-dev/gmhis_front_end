import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';  
import * as SockJS from 'sockjs-client'; 
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class WebsocketService {

  private host = "http://localhost:9090";

  constructor(private http: HttpClient) { }

  // Open connection with the back-end socket
  public connect() {
      let socket = new SockJS(`http://localhost:9090/socket`);

      let stompClient = Stomp.over(socket);

      return stompClient;
  }

  getArticleSalePriceUpdateNotification(): Observable<any> {
    return this.http.get<any>(`${this.host}/ws/article-sale-price-update/notify`)
  }
//ok
  getCustomerOrderNotification(): Observable<any> {
    return this.http.get<any>(`${this.host}/ws/customer-order/notify`)
  }
//ok
  getDepotageNotification(): Observable<any> {
    return this.http.get<any>(`${this.host}/ws/depotage/notify`)
  }
//ok
  getInventoryDepotNotification(): Observable<any> {
    return this.http.get<any>(`${this.host}/ws/inventory-depot/notify`)
  }
//ok
  getInventoryPlanningDepotNotification(): Observable<any> {
    return this.http.get<any>(`${this.host}/ws/inventory-planing/notify`)
  }
//ok
  getStockEntryNotification(): Observable<any> {
    return this.http.get<any>(`${this.host}/ws/stock-entry/notify`)
  }
  
  getSupplierOderNotification(): Observable<any> {
    return this.http.get<any>(`${this.host}/ws/supplier-order/notify`)
  }
//ok
  getTransferNotification(): Observable<any> {
    return this.http.get<any>(`${this.host}/ws/transfer/notify`)
  }

  getPromotionNotification(): Observable<any> {
    return this.http.get<any>(`${this.host}/ws/promotion/notify`)
  }

  getRelaunchNotification(): Observable<any> {
    return this.http.get<any>(`${this.host}/ws/sale-relaunch/notify`)
  }

  getongoingNotification(): Observable<any> {
    return this.http.get<any>(`${this.host}/ws/ongoing-supplier-order/notify`)
  }

  getContainerInSeaNotification(): Observable<any> {
    return this.http.get<any>(`${this.host}/ws/container/notify`)
  }

  getAssetNotification(): Observable<any> {
    return this.http.get<any>(`${this.host}/ws/assets/notify`)
  }
}