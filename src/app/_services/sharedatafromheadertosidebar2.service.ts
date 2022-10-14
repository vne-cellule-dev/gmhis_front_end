import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Sharedatafromheadertosidebar2Service {
private dataSource = new BehaviorSubject(false);
currentSource = this.dataSource.asObservable();
  constructor() { }

  changeData(data : boolean){
    this.dataSource.next(data)
  }
}
