import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentTypeService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private http : HttpClient) {   
  }

  findPaymentTypesActiveNameAndIds(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/payment_type/active_payment_types_name`);
  }
}
