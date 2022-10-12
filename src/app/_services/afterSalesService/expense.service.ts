import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageList } from 'src/app/_models/page-list.model';
import { SavExpense } from 'src/app/_models/savExpense.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }
  
   /**
  * get all sav expense
  * @param data 
  * @returns 
  */
    getsavExpense(data : any):Observable<PageList> {
      let queryParams : {};
      queryParams = {
        params : new HttpParams()
        .set('date', data['date'] ?? "")
        .set('page', data['page'] ?? "")
        .set('size', data['size'] ?? "")
        .set('sort', data['sort'] ?? "")
      };
    return this.http.get<PageList>(`${this.host}/sav-expense/list`, queryParams)
    }
    /**
     * create new 
     * @param savExpense 
     * @returns 
     */
    savesavExpense(savExpense : SavExpense):Observable<SavExpense>{
      return this.http.post<SavExpense>(`${this.host}/sav-expense/add`, savExpense)
    }
  /**
   * updated exiting savExpense
   * @param savExpense 
   * @returns 
   */
    updatesavExpense(savExpense : SavExpense):Observable<SavExpense>{
      return this.http.put<SavExpense>(`${this.host}/sav-expense/update/${savExpense.id}`, savExpense)
    }
  /**
   * get existing savExpense details
   * @param savExpense 
   * @returns 
   */
    getsavExpenseDetails(savExpense : SavExpense):Observable<SavExpense>{
      return this.http.get<SavExpense>(`${this.host}/sav-expense/get-detail/${savExpense.id}`)
    }
  
    /**
     * simple list
     * @returns 
     */
    getAllsavExpense():Observable<SavExpense[]>{
      return this.http.get<SavExpense[]>(`${this.host}/sav-expense/list-all`)
    }

    deleteSavExpense(savExpense: SavExpense) {      
      return this.http.delete<SavExpense>(`${this.host}/sav-expense/delete/${savExpense.id}`)
    }

    getExpenseAssForPrint(data : any):Observable<any> {
      let queryParams : {};
      queryParams = {
        params : new HttpParams()
        .set('date', data['date'] ?? " ")
      };
    return this.http.get<any>(`${this.host}/sav-expense/list-simple`, queryParams)
    }
}
