import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Expense } from '../_models/expense.model';
import { PageList } from '../_models/page-list.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * get active list of Dépense
   * @returns Expense[]
   */
   findActive(): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.host}/expense/active-list`)
  }

  /**
   * get all paginated Expense list
   * @param data 
   * @returns PageList
   */
  findAll(data): Observable<PageList> {

    let queryParams = {};

    queryParams = {
      params: new HttpParams()
      .set('criteria', data['criteria']  ?? "")
      .set('criteriaType', data['criteriaType'] ?? "")
      .set('expenseDate', data['expenseDate'])
      .set('expenseNumber', data['expenseNumber'])
      .set('depot', data['depot'])
      .set('page', data['page'])
      .set('size', data['size'] ?? "")
      .set('sort', data['sort'])
    };
    return this.http.get<PageList>(`${this.host}/expense/list`, queryParams)
  }
/**
 * for print
 * @param data 
 * @returns 
 */
  findAllSimplePage(data): Observable<any[]> {

    let queryParams = {};

    queryParams = {
      params: new HttpParams()
      .set('criteria', data['criteria']  ?? "")
      .set('criteriaType', data['criteriaType'] ?? "")
      .set('expenseDate', data['expenseDate'])
      .set('depot', data['depot'])
    };
    return this.http.get<any[]>(`${this.host}/expense/list-all`, queryParams)
  }
  /**
   *  create a new Expense
   * @param Expense 
   * @returns Expense
   */
  save(Expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(`${this.host}/expense/add`, Expense)
  }

  /**
   *  update a Expense
   * @param Expense 
   * @returns Expense
   */
  update(Expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(`${this.host}/expense/update/` + Expense.id, Expense)
  }

  /**
   * get driver details by Expense Id
   * @param ExpenseId 
   * @returns 
   */
  getExpenseDetails(ExpenseId : number) : Observable<Expense>{
    return this.http.get<Expense>(`${this.host}/expense/get-detail/` + ExpenseId)
  }

   

     findByNumber(expenseNumber : string) : Observable<Expense>{
      return this.http.get<Expense>(`${this.host}/expense/get-detail-by-number/${expenseNumber}`)
    }


    deleteExpense(expense : any): Observable<Expense> {
      return this.http.delete<Expense>(`${this.host}/expense/delete/`+expense.id)
    }


}
