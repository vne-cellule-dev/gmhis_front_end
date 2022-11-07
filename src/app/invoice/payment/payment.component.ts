import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { PaymentTypeService } from 'src/app/payment-type/service/payment-type.service';
import { Invoice } from 'src/app/_models/invoice.model';
import { InvoiceSavService } from 'src/app/_services/afterSalesService/invoice-sav.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';
import { InvoiceService } from '../service/invoice.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  @Input()
  invoice: any;

  @Output('addPayment') addPayment: EventEmitter<any> = new EventEmitter();
  selectedSize: number;

  paymentTypeList = [
    { id: 'E', value: 'Espèce' },
    { id: 'M', value: 'Mobile Money' },
    { id: 'B', value: 'Bancaire' },
  ];

  public paymentForm!: FormGroup;
  patientInvoice: any;
  paymentTypes: any;

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private notificationService: NotificationService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private paymentTypeService: PaymentTypeService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    if (this.invoice) {
      this.patientInvoice = this.invoice;
    }
    this.initForm();
    console.log(this.invoice);
    this.findPaymentTypesActiveNameAndIds();
  }

  initForm() {
    this.paymentForm = this.fb.group({
      id: new FormControl(0),
      code: new FormControl(null),
      cashRegister: new FormControl(1),
      paymentType: new FormControl(''),
      bill: new FormControl(null),
      admissionNumber: new FormControl({ value: '', disabled: true }),
    });
  }

  collectAmount() {
    let cashRegister = this.paymentForm.get('cashRegister').value;
    let paymentType = this.paymentForm.get('paymentType').value;

    let data = {
      cashRegister: cashRegister,
      bill: this.patientInvoice.id,
      paymentType: paymentType,
    };
    console.log(data);

    this.invoiceService.collectAmount(data).subscribe(
      (response: any) => {
        this.addPayment.emit();
      },
      (errorResponse: HttpErrorResponse) => {
        this.notificationService.notify(
          NotificationType.ERROR,
          errorResponse.error.message
        );
      }
    );
  }

  private findPaymentTypesActiveNameAndIds() {
    this.paymentTypeService
      .findPaymentTypesActiveNameAndIds()
      .subscribe((response: any) => {
        this.paymentTypes = response;
      });
  }
}
