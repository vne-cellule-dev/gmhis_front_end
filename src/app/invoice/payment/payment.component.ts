import { Component, Input, OnInit } from '@angular/core';
import { Invoice } from 'src/app/_models/invoice.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  @Input()
  invoice : Invoice;


  constructor() { }

  ngOnInit(): void {
    console.log(this.invoice);
    
  }

}
