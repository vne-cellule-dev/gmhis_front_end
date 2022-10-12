import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { BranchOffice } from '../_models/branchOffice.model';
import { Customer } from '../_models/customer.model';


@Injectable({
  providedIn: 'root'
})
export class SharedatabetweenlistandformBrancheofficeService {
  private dataSource = new Subject();
  currentSource = this.dataSource.asObservable();
    constructor() { }
  
   sendbranchOffice(branchOffice : BranchOffice){
     this.dataSource.next(branchOffice)
   }

   getBranchOffice(){
     return this.dataSource.asObservable()
   }
}
