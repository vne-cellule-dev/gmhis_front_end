import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Row } from 'jspdf-autotable';
import { ActService } from 'src/app/act/act/service/act.service';
import { IAdmission } from 'src/app/admission/model/admission';
import { CashRegisterService } from 'src/app/cash-register/cash-register.service';
import { ConventionService } from 'src/app/convention/convention.service';
import { InsuranceService } from 'src/app/insurance/insurance.service';
import { InsuredServiceService } from 'src/app/insured/service/insured-service.service';
import { PaymentTypeService } from 'src/app/payment-type/service/payment-type.service';
import { PracticianService } from 'src/app/practician/practician.service';
import { INameAndId } from 'src/app/shared/models/name-and-id';
import { Invoice } from 'src/app/_models/invoice.model';
import { User } from 'src/app/_models/user.model';
import { NotificationService } from 'src/app/_services/notification.service';
import { UserService } from 'src/app/_services/user.service';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';
import { IInvoiceDto } from '../models/invoice-dto';
import { InvoiceService } from '../service/invoice.service';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {

  @Output('addInvoice') addInvoice: EventEmitter<any> =
    new EventEmitter();
  @Output('updateInvoice') updateInvoice: EventEmitter<any> =
    new EventEmitter();

  @Output('addPayment') addPayment: EventEmitter<any> =
    new EventEmitter();
  @Input()
  admission: IAdmission;

  admissionForTemplate: IAdmission;

  @Input()
  makeInvoice: boolean;

  @Input()
  invoice: Invoice;

  public invoiceForm!: FormGroup;

  public cashRegisters: INameAndId[];

  public paymentTypes: any;

  public invoiceDto: IInvoiceDto = {
    id: null,
    admission: null,
    billType: null,
    convention: null,
    discountInCfa: null,
    discountInPercentage: null,
    insured: null,
    patientType: null,
    acts: [],
    insuredList: []
  };

  patientTypes = [
    { id: 'A', value: 'Assuré' },
    { id: 'C', value: 'Comptant' },
  ]

  public patientInsurances: any[] = [];

  public patientInsurances2: any[] = [];


  public patientInsurancesSinceCnam: any[] = [];


  public patientInsurancesForTemplate: any;

  public calculConsommableRate: any;

  public cashRegisterComponent: any;

  public conventions: any;

  public invoiceId: any;

  public: any;

  public practicians: any;

  actsList: INameAndId[];

  insured = null;

  actionToDo: string;

  public user: User;

  showActAddButton: boolean = false;

  currentDate: Date;

  public cnamInsured: any;
  public totalInvoice: number = 0;
  public partPEC: number = 0;
  public partPecByCNAM: number = 0;
  public partPecByOthherInsurance: number = 0;
  public partientPart: number = 0;
  public totalAmountToPay: number = 0;



  constructor(
    private fb: FormBuilder,
    private cashRegisterService: CashRegisterService,
    private insuranceService: InsuranceService,
    private conventionService: ConventionService,
    private actService: ActService,
    private practicianService: PracticianService,
    private insuredService: InsuredServiceService,
    private paymentTypeService: PaymentTypeService,
    private invoiceService: InvoiceService,
    private notificationService: NotificationService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.currentDate = new Date();
    this.user = this.userService.getUserFromLocalCache();
    this.initForm();

    if (this.admission) {
      console.log(this.admission);
      this.admissionForTemplate = this.admission;
      this.invoiceForm.get('admissionNumber').setValue(this.admission.admissionNumber);
      this.invoiceForm.get('admission').setValue(this.admission.id);
      this.invoiceForm.get('patientExternalId').setValue(this.admission.patientExternalId);
      this.invoiceForm.get('patientName').setValue(this.admission.patientFirstName);
      this.invoiceForm.get('service').setValue(this.admission.service);
      // this.invoiceForm.get('insurance').setValue(this.admission.insuranceId);
      this.invoiceForm.get('invoiceDate').setValue(this.dateOutputFormat(new Date()));
      this.insuredService.getInsuredByPatientId(this.admission.patientId).subscribe(
        (response: any[]) => {
          this.patientInsurances = response;
          this.cnamInsured = this.patientInsurances.find(function(el){
            return el["insuranceName"].toLowerCase() == "cnam";
          })  
         

          if (this.patientInsurances.length != 0) {
            this.invoiceForm.get('insurance').setValue(this.patientInsurances[0].insuranceId);
            this.firstInsuredRow(this.patientInsurances);

            this.setInsuranceData();
          }
          this.patientInsurancesForTemplate = this.patientInsurances[0];

          if (this.patientInsurances.length != 0) {
            this.invoiceForm.get('patientType').setValue('A');
          } else {
            this.invoiceForm.get('patientType').setValue('C');
          }
        }
      )
      if (this.makeInvoice) {
        this.addActs();
        this.acts.at(0).get('act').setValue(this.admission["actId"]);
        this.acts.at(0).get('cost').setValue(this.admission.actCost);
        this.acts.at(0).get('pratician').setValue(this.admission["practicianId"]);
      }

    }

    if (this.invoice) {

      this.invoice["billActs"].forEach((element, i) => {
        this.addActs();
        if (element["act"]) this.acts.at(i).get('act').setValue(element["act"]["id"]);
        this.acts.at(i).get('cost').setValue(element["actCost"]);
        if (element["practician"]) this.acts.at(i).get('pratician').setValue(element["practician"]["id"]);
      })
      this.invoiceForm.get('id').setValue(this.invoice.id);
      this.invoiceForm.get('admissionNumber').setValue(this.invoice["admission"].admissionNumber);
      this.invoiceForm.get('admission').setValue(this.invoice["admission"].id);
      this.invoiceForm.get('patientExternalId').setValue(this.invoice["patient"].patientExternalId);
      this.invoiceForm.get('patientName').setValue(this.invoice["patient"].firstName);
      this.invoiceForm.get('service').setValue(this.invoice["patient"].service);
      this.invoiceForm.get('patientType').setValue(this.invoice["patientType"]);
      this.invoiceForm.get('insurance').setValue(this.invoice["insurance"].id);
      this.invoiceForm.get('patientPart').setValue(this.invoice["patientPart"]);
      this.invoiceForm.get('partTakenCareOf').setValue(this.invoice["partTakenCareOf"]);
      this.invoiceForm.get('total').setValue(this.invoice["totalAmount"]);

      this.insuredService.getInsuredByPatientId(this.invoice["patient"].id).subscribe(
        (response: any[]) => {
          this.patientInsurances = response;
          this.cnamInsured = this.patientInsurances.find(function (el) {
            return el["insuranceName"].toLowerCase() == "cnam";
          })
          console.log(this.cnamInsured);

          this.setInsuranceData()
        }
      )
      this.showActAddButton = true;
    }
    this.findCashRegisternameAndIdList();
    // this.findInsuranceNameAndIdList();
    this.findConventionNameAndIdList();
    this.findActsNameAndIdList();
    this.findPracticianSimpleList();
    this.findPaymentTypesActiveNameAndIds();
  }

  setInsuranceData() {
    let insurance = this.invoiceForm.get("insurance").value;
    let subscriber = this.patientInsurances.find(e => e.insuranceId === insurance)['subscriberName'];
    let coverRate = this.patientInsurances.find(e => e.insuranceId === insurance)['coverage'];
    let society = this.patientInsurances.find(e => e.insuranceId === insurance)['society'];
    this.insured = this.patientInsurances.find(e => e.insuranceId === insurance)['id'];
    this.invoiceForm.get('coverRate').setValue(coverRate);
    this.invoiceForm.get('subscriber').setValue(subscriber);
    this.invoiceForm.get('society').setValue(society);
    // let consumableRate = 100 - coverRate;
    // this.invoiceForm.get('consumableRate').setValue(consumableRate);
  }

  dateOutputFormat(date: Date): string {

    let newDate = new Date(date);
    let day = ("0" + newDate.getDate()).slice(-2);
    let month = ("0" + (newDate.getMonth() + 1)).slice(-2);
    let year = newDate.getFullYear();

    return day + '/' + month + '/' + year;
  }

  initForm() {
    this.invoiceForm = this.fb.group({
      id: new FormControl(0),
      admission: new FormControl(0),
      admissionNumber: new FormControl({ value: '', disabled: true }),
      patientExternalId: new FormControl({ value: '', disabled: true }),
      patientName: new FormControl({ value: '', disabled: true }),
      service: new FormControl({ value: '', disabled: true }),
      invoiceDate: new FormControl(''),
      patientType: new FormControl(null, Validators.required),
      insurance: new FormControl(null),
      subscriber: new FormControl({ value: '', disabled: true }),
      coverRate: new FormControl(''),
      society: new FormControl({ value: '', disabled: true }),
      consumableRate: new FormControl(0),
      discountInPercentage: new FormControl(0),
      discountInCfa: new FormControl(0),
      total: new FormControl(0),
      cashRegister: new FormControl(null),
      // partTakenCareOfNumber: new FormControl(''),
      patientPart: new FormControl(0),
      partTakenCareOf: new FormControl(0),
      // partTakenCareOfDate: new FormControl(''),
      // accountNumber: new FormControl(''),
      invoiceEdition: new FormControl(''),
      convention: new FormControl(null),
      paymentType: new FormControl(null),
      insuredList: this.fb.array([]),
      acts: this.fb.array([])
    });
  }

  private createActsGroups(): FormGroup {
    return this.fb.group({
      act: [null],
      pratician: [null],
      admission: [this.invoiceForm.get('admission').value],
      cost: [{ value: null, disabled: true }],
    })
  }

  private createInsuredListGroups(): FormGroup {
    return this.fb.group({
      bill: [""],
      insurrance: [null],
      insured: [null],
      subscriber: [{ value: null, disabled: true }],
      society: [{ value: null, disabled: true }],
      insuredCcoverage: [{ value: null, disabled: true }],

    })
  }

  // save(){
  //   if ( this.actionToDo == "makeInvoice") {
  //     this.onInvoice()
  //   }else{
  //     this.collectAmount();
  //   }
  // }

  onInvoice() {
    this.actionToDo = "makeInvoice";
    // this.invoiceDto.acts = this.invoiceForm.get('acts').value;
    // this.invoiceDto.admission = this.invoiceForm.get('admission').value;
    // this.invoiceDto.convention = this.invoiceForm.get('convention').value;
    // this.invoiceDto.discountInCfa = this.invoiceForm.get('discountInCfa').value;
    // this.invoiceDto.id = this.invoiceForm.get('id').value;
    // this.invoiceDto.discountInPercentage = this.invoiceForm.get('discountInPercentage').value;
    // this.invoiceDto.insured = this.insured;
    // this.invoiceDto.patientType = this.invoiceForm.get('patientType').value;
    // console.log(this.invoiceForm.getRawValue());

    this.invoiceDto = this.invoiceForm.getRawValue();

    console.log(this.invoiceDto);

    // this.invoiceService.createInvoice(this.invoiceDto).subscribe(
    //   (response : any) => {
    //     this.addInvoice.emit();
    //   },
    //   (errorResponse: HttpErrorResponse) => {
    //     // this.showloading = false;
    //     this.notificationService.notify(
    //       NotificationType.ERROR,
    //       errorResponse.error.message
    //     );
    //   }
    // )
  }




  public get acts(): FormArray {
    return this.invoiceForm.get('acts') as FormArray;
  }

  public addActs(): void {
    this.acts.push(this.createActsGroups())
  }
  public deleteAct(index: number) {
    this.acts.removeAt(index);
    this.acts.markAsDirty();
  }




  public get insureds(): FormArray {
    return this.invoiceForm.get('insuredList') as FormArray;
  }

  firstInsuredRow(insured: any[]) {
    this.addInsured();
    console.log(insured);
    let cnamInsured = insured.find(function (el) {
      return el["insuranceName"].toLowerCase() == "cnam";
    })
    console.log(cnamInsured);

    this.insureds.controls[0].get('insurrance').setValue(cnamInsured["insuranceId"]);
    this.insureds.controls[0].get('insured').setValue(cnamInsured["id"]);
    this.insureds.controls[0].get('insurrance').disable();
    this.insureds.controls[0].get('subscriber').setValue(cnamInsured["subscriberName"]);
    this.insureds.controls[0].get('society').setValue(cnamInsured["society"]);
    this.insureds.controls[0].get('insuredCcoverage').setValue(cnamInsured["coverage"]);

  }
  public addInsured(): void {
    this.insureds.push(this.createInsuredListGroups());
  }

  deleteInsured(index: number) {
    this.insureds.removeAt(index);
    this.insureds.markAsDirty();
  }


  private findCashRegisternameAndIdList() {
    this.cashRegisterService.findCashRegisternameAndIdList().subscribe(
      (response: INameAndId[]) => {
        this.cashRegisters = response;
      }
    )
  }

  // private findInsuranceNameAndIdList(){
  //   this.insuranceService.findInsuranceSimpleList().subscribe(
  //     (response : INameAndId[]) =>{
  //      this.patientInsurances = response;

  //     }
  //   )
  // }

  private findConventionNameAndIdList() {
    this.conventionService.findConventionSimpleList().subscribe(
      (response: INameAndId[]) => {
        this.conventions = response;
      }
    )
  }

  private findActsNameAndIdList() {
    this.actService.getListOfActiveAct().subscribe(
      (response: INameAndId[]) => {
        this.actsList = response;
      }
    )
  }


  private findPracticianSimpleList() {
    this.practicianService.findPracticianSimpleList().subscribe(
      (response: any) => {
        this.practicians = response;
        console.log(this.practicians);
      }
    )
  }


  private findPaymentTypesActiveNameAndIds() {
    this.paymentTypeService.findPaymentTypesActiveNameAndIds().subscribe(
      (response: any) => {
        this.paymentTypes = response;
      }
    )
  }

  onActSelect(row) {
    let data = {
      "act": this.acts.value[row]["act"],
      "convention": this.invoiceForm.get('convention').value
    }
    this.invoiceService.getActCost(data).subscribe(res => {
      this.acts.controls[row].get('cost').setValue(res);
    });

  }

  onInsurranceSelect(row) {
    this.insureds.controls[row].get('subscriber').setValue(row["insured"]);

  }

  onInsuredSelect(index, event) {
    let insured = this.patientInsurances.find(function (el) {
      return el["insuranceId"] == event
    })
    this.insureds.controls[index].get('insured').setValue(insured["id"]);
    this.insureds.controls[index].get('subscriber').setValue(insured["subscriberName"]);
    this.insureds.controls[index].get('society').setValue(insured["society"]);
    this.insureds.controls[index].get('insuredCcoverage').setValue(insured["coverage"]);
    console.log(index, event, insured);

    // let data = {
    //   "act" : this.acts.value[row]["act"],
    //   "convention" : this.invoiceForm.get('convention').value
    // } 
  }

  getInsured(insured, row) {
    return insured["insuranceId"] == row;
  }

  calculInvoiceCost() {
    let invoiceFormValue = this.invoiceForm.getRawValue();
    let acts = invoiceFormValue["acts"];
  
    acts.forEach((el, index) => {
      this.totalInvoice = + el["cost"];
    })

    this.partPecByCNAM = (this.totalInvoice*this.cnamInsured["coverage"])/100;
    let remaingAfterCnamReduction = this.totalInvoice -  this.partPecByCNAM;
    let partPecByOthherInsurance = remaingAfterCnamReduction; 
    let totalpartPecByOthherInsurance = 0;
    console.log(remaingAfterCnamReduction);
    
    for (let index = 1; index < invoiceFormValue["insuredList"].length; index++) {
      const element = invoiceFormValue["insuredList"][index];
        partPecByOthherInsurance = (remaingAfterCnamReduction*element["insuredCcoverage"])/100;
        totalpartPecByOthherInsurance = totalpartPecByOthherInsurance + partPecByOthherInsurance;
        remaingAfterCnamReduction = remaingAfterCnamReduction - partPecByOthherInsurance;
        // partPecByOthherInsurance = partPecByOthherInsurance + remaingAfterCnamReduction;
        console.log(totalpartPecByOthherInsurance);
        
       console.log(remaingAfterCnamReduction);
      //  console.log(partPecByOthherInsurance);

    }

    this.partPecByOthherInsurance = totalpartPecByOthherInsurance;
    this.partientPart = remaingAfterCnamReduction;

    // insuredList.forEach((el,index) => {
    //   remaingAfterCnamReduction = (remaingAfterCnamReduction*el["coverage"])/100;
    // })
    // this.partPecByOthherInsurance = remaingAfterCnamReduction;
    // let data = this.invoiceDto;
    // this.invoiceDto.acts = this.invoiceForm.get('acts').value;
    // this.invoiceDto.admission = this.invoiceForm.get('admission').value;
    // this.invoiceDto.convention = this.invoiceForm.get('convention').value;
    // this.invoiceDto.discountInCfa = this.invoiceForm.get('discountInCfa').value;
    // this.invoiceDto.id = this.invoiceForm.get('id').value;
    // this.invoiceDto.discountInPercentage = this.invoiceForm.get('discountInPercentage').value;
    // this.invoiceDto.insured = this.insured;
    // this.invoiceDto.insuredList = this.invoiceForm.get('insuredList').value;
    // this.invoiceDto.patientType = this.invoiceForm.get('patientType').value;
    // this.invoiceService.getCost(data).subscribe(res => {      
    //   this.invoiceForm.get("partTakenCareOf").setValue(res.partTakenCareOf);
    //   this.invoiceForm.get("patientPart").setValue(res.patientPart);
    //   this.invoiceForm.get("total").setValue(res.totalAmount);
    // })
  }

  collectAmount() {

    this.actionToDo = "makePayment";

    this.invoiceForm.get("cashRegister").clearValidators();
    this.invoiceForm.get("paymentType").clearValidators();
    this.invoiceForm.get("cashRegister").setValidators([Validators.required]);
    this.invoiceForm.get("paymentType").setValidators([Validators.required]);
    this.invoiceForm.get("cashRegister").updateValueAndValidity();
    this.invoiceForm.get("paymentType").updateValueAndValidity();


    let cashRegister = this.invoiceForm.get("cashRegister").value
    let paymentType = this.invoiceForm.get("paymentType").value

    let data = {
      "cashRegister": cashRegister,
      "bill": this.invoiceForm.get("id").value,
      "paymentType": paymentType,
    }
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
}


