import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedatafromInvoiceToDeliveryService {
  private dataSource = new BehaviorSubject(false);
  currentSource = this.dataSource.asObservable();
    constructor() { }
  
    changeData(data : boolean){
      this.dataSource.next(data)
    }
}
