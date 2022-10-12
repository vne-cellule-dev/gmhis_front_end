import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TransfertService } from './transfert.service';

@Injectable({
  providedIn: 'root'
})
export class NotifService {

/****************start transfert notification*********************/
/**
 * variable de type subject à envoyé qui est récupérable partout dans le système
 */
public transfertNotifcationSubject = new Subject<number>();
public DepotageNotificationSubject = new Subject<number>();
public stockEntryNotificationSubject = new Subject<number>();
public PromotionNotificationSubject = new Subject<number>();
public sideBarNotificationSubject = new Subject<string>();

  constructor(private transferService : TransfertService) { }
/**
 * function pour envoyer dans le système la donnée transfertNotification qui pourra etre récuperé n'import ou dans 
 * le système
 * @param transfertNotification 
 */
sendTransfertNotificationMsg(transfertNotification : number){
  this.transfertNotifcationSubject.next(transfertNotification)
}
/**
 * function appélé dans le systàme pour récupéper la valeur envoyé par la fonction sendTransfertNotificationMsg
 * @returns 
 */
getTransfertNotificationMsg(){
  return this.transfertNotifcationSubject.asObservable();
}
/****************End transfert notification*********************/

/****************Start stock notification********************** */
sendDepotageNotificationMsg(depotageNotification : number){
  this.DepotageNotificationSubject.next(depotageNotification)
}

getDepotageNotificationMsg(){
  return this.DepotageNotificationSubject.asObservable();
}
/***** */
sendStockEntryNotificationMsg(stockEntryNotification : number){
  this.stockEntryNotificationSubject.next(stockEntryNotification)
}

getStockEntryNotificationMsg(){
  return this.stockEntryNotificationSubject.asObservable();
}

/****************END stock notification************************* */


/*****************START sidebar notification********* */
sendsideBarNotificationMsg(sideBarNotification : string){
  this.sideBarNotificationSubject.next(sideBarNotification)
}

getsideBarNotificationMsg(){
  return this.sideBarNotificationSubject.asObservable();
}

/****************************END sidebar notification******** */
/** */
sendPromotionNotificationMsg(promotionNotification : number){
  this.PromotionNotificationSubject.next(promotionNotification)
}

getPromotionNotificationMsg(){
  return this.PromotionNotificationSubject.asObservable();
}
}
