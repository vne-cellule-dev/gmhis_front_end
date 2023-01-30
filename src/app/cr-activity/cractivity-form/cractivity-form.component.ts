import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ICashRegisterActivity } from 'src/app/_models';
import { SubSink } from 'subsink';

import {NotificationService, CashRegisterActivityService,UserService} from 'src/app/_services';
import { CashRegisterService } from 'src/app/cash-register/cash-register.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';


@Component({
  selector: 'app-cractivity-form',
  templateUrl: './cractivity-form.component.html',
  styleUrls: ['./cractivity-form.component.scss']
})
export class CractivityFormComponent implements OnInit {


  private subs = new SubSink();

  @Input()
  crActivity : ICashRegisterActivity;

  @Output('addCrActivity') addCrActivity: EventEmitter<any> = new EventEmitter();
  @Output('updateCrActivity') updateCrActivity: EventEmitter<any> = new EventEmitter();

  @Input()
  details: boolean;
  
  public crActivityForm : FormGroup;

  public invalidForm = false;

  public formSubmitted = false;

  showLoader: boolean = false;

   /**
   * the form valid state
   */
    public invalidFom = false;
    
  public errorMessage!: string;
  cashRegistersNameAndId: any;
  cashiers: any;
 
  constructor(
    private crActivityService : CashRegisterActivityService,
    private notificationService: NotificationService,
    private cashRegisterService : CashRegisterService,
    private cashierService : UserService, 
  ) { }

  ngOnInit(): void {
    this.findActiveCashRegisterNameAndId();
    this.findActiveUserNameAndId();
    this.initForm();

    if (this.crActivity) {
      this.crActivityForm.patchValue(this.crActivity);
      this.crActivityForm.get('openingDate').setValue(new Date(this.crActivity.openingDate));

   }
  }

  initForm(){
    this.crActivityForm = new FormGroup({
      id: new FormControl(null),
      cashRegister: new FormControl(null),
      cashier: new FormControl(null),
      openingBalance: new FormControl(null),
      openingDate: new FormControl()
    })
  }


  save(){
    this.invalidForm = !this.crActivityForm.valid;
    this.formSubmitted = true;

    if (this.crActivityForm.valid) {
      this.showLoader = true;
      this.crActivity = this.crActivityForm.value;

      if (this.crActivity.id) {
          this.subs.add(
            this.crActivityService.updateCrActivity(this.crActivity).subscribe(
              (response: ICashRegisterActivity) => {
                this.showLoader = false;
                this.updateCrActivity.emit();
              },
              (errorResponse: HttpErrorResponse) => {
                this.showLoader = false;
                this.notificationService.notify(
                  NotificationType.ERROR,
                  errorResponse.error.message
                );
              } 
            )
          )
      }else{
        this.subs.add(
          this.crActivityService.createCrActivity(this.crActivity).subscribe(
            (response: ICashRegisterActivity) => {
              this.showLoader = false;
              this.addCrActivity.emit();
            },
            (errorResponse: HttpErrorResponse) => {
              this.showLoader = false;
              this.notificationService.notify(
                NotificationType.ERROR,
                errorResponse.error.message
              );
            }
          )
        )
      }
    }
  }

  private findActiveCashRegisterNameAndId(){
    this.cashRegisterService.findCashRegisternameAndIdList().subscribe(
      (response : any) => {
        this.cashRegistersNameAndId = response;        
      },
      (errorResponse : HttpErrorResponse) => {
        this.showLoader = false;
        this.notificationService.notify(
          NotificationType.ERROR,
          errorResponse.error.message
        ); 
      }
    )
  }

  private findActiveUserNameAndId(){
    this.cashierService.findAllActive().subscribe(
      (response : any) => {
        this.cashiers = response;
        console.log(this.cashiers);
                
      },
      (errorResponse : HttpErrorResponse) => {
        this.showLoader = false;
        this.notificationService.notify(
          NotificationType.ERROR,
          errorResponse.error.message
        ); 
      }
    )
  }
  

}
