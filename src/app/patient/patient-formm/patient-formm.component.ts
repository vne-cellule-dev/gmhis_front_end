import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChildren,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { InsuranceService } from 'src/app/insurance/insurance.service';
import { SubscriberService } from 'src/app/insurance/subscriber.service';
import { InsuredServiceService } from 'src/app/insured/service/insured-service.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';
import { SubSink } from 'subsink';
import { IPatient } from '../patient';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-patient-formm',
  templateUrl: './patient-formm.component.html',
  styleUrls: ['./patient-formm.component.scss'],
})
export class PatientFormmComponent implements OnInit {
  private subs = new SubSink();
  AddIcon = faTrash;

  @Input()
  patient: IPatient;

  @Input()
  details: boolean;

  @Output('addPatient') addPatient: EventEmitter<any> = new EventEmitter();
  @Output('updatePatient') updatePatient: EventEmitter<any> =
    new EventEmitter();

  /**
   * form
   */
  public patientForm: FormGroup;

  /**
   * the form valid state
   */
  public invalidFom = false;

  public invalidInsuranceFom = false;


  /**
   * check if the form is submitted
   */
  public formSubmitted = false;

  /**
   * define isActive options
   */
  states = [
    { id: true, value: 'Actif' },
    { id: false, value: 'En sommeil' },
  ];

  /**
   * handle the spinner
   */
  showloading: boolean = false;

  actives = [
    { id: true, value: 'Actif' },
    { id: false, value: 'Inactif' },
  ];

  genders = [
    { id: 'homme', value: 'Homme' },
    { id: 'femme', value: 'Femme' },
  ];

  civilitys = [
    { id: 'Mr', value: 'Monsieur' },
    { id: 'Mme', value: 'Madame' },
    { id: 'Mlle', value: 'Mademoiselle' },
  ];

  typePieces = [
    { id: 'CNI', value: 'Carte Nationale Identité' },
    { id: 'ATT', value: 'Attestation' },
    { id: 'PC', value: 'Permis de conduire' },
    { id: 'PP', value: 'Passport' },
  ];

  coverageRates = [
    { id: 10, value: '10' },
    { id: 20, value: '20' },
    { id: 30, value: '30' },
    { id: 40, value: '40' },
    { id: 50, value: '50' },
    { id: 60, value: '60' },
    { id: 70, value: '70' },
    { id: 80, value: '80' },
    { id: 90, value: '90' },
    { id: 100, value: '100' },

  ];

  statutMatrimonials = [
    { id: 'M', value: 'Marié(e)' },
    { id: 'C', value: 'Celibataire' },
    { id: 'V', value: 'Veuve' },
    { id: 'D', value: 'Divorcé(e)' },
  ];

  isPrincipalInsuredOptions = [
    { id: true, value: 'Oui' },
    { id: false, value: 'Non' },
  ];

  @ViewChildren(FormControlName, { read: ElementRef })
  inputElements!: ElementRef[];

  public errorMessage!: string;

  public formsErrors: { [key: string]: string } = {};

  private isFormSubmitted: boolean = false;
  public insuranceForm!: FormGroup;
  public insuranceFormGroup: any = new FormArray([]);
  countryList: any = [];
  cityList: any = [];
  insurances: any;
  insurancesSubscribers: any;

  patientInfo: boolean = true;

  constructor(
    private patientService: PatientService,
    private notificationService: NotificationService,
    private insuranceService: InsuranceService,
    private insuranceSubscriberService: SubscriberService,
    private insuredServiceService: InsuredServiceService,
    private datePipe : DatePipe
  ) {}

  // Unsubscribe when the component dies
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.initForm();
    if (this.patient) {
      console.log(this.patient);
      
      this.patientService
        .getPatientDetail(this.patient.id)
        .subscribe((response: IPatient) => {
          this.patientForm.patchValue(response);
          this.patientForm.get('country').setValue(response['country']['id']);
          this.onGetCityBycountry(response['country']['id']);
          this.patientForm.get('cityId').setValue(response['city']['id']);
          let date = this.datePipe.transform(response.birthDate, "yyyy-MM-dd")
          console.log(date);
          
          this.patientForm.get('birthDate').setValue(date);
          this.insuredServiceService
            .getInsuredByPatientId(response.id)
            .subscribe((res: any) => {              
              res.forEach((el, index) => {
                this.addInsurance();
                this.insuranceFormGroup.controls[index]
                  .get('id')
                  .setValue(el.id);
                this.insuranceFormGroup.controls[index]
                  .get('patient')
                  .setValue(el.patientId);
                this.insuranceFormGroup.controls[index]
                  .get('cardNumber')
                  .setValue(el.cardNumber);
                this.insuranceFormGroup.controls[index]
                  .get('insurance')
                  .setValue(el.insuranceId);
                this.insuranceFormGroup.controls[index]
                  .get('insuranceSuscriber')
                  .setValue(el.subscriberId);
                // this.insuranceFormGroup.controls[index]
                //   .get('isPrincipalInsured')
                //   .setValue(el.isPrincipalInsured);
                this.insuranceFormGroup.controls[index]
                  .get('coverage')
                  .setValue(el.coverage);
                // this.insuranceFormGroup.controls[index]
                //   .get('principalInsuredContact')
                //   .setValue(el.principalInsuredContact);
                // this.insuranceFormGroup.controls[index]
                //   .get('principalInsuredName')
                //   .setValue(el.principalInsuredName);
                // this.insuranceFormGroup.controls[index]
                //   .get('principalInsuredAffiliation')
                //   .setValue(el.principalInsuredAffiliation);
                  this.insuranceFormGroup.controls[index]
                  .get('society')
                  .setValue(el.society);
              });
            });
        });
    
    }else{
      this.addInsurance();
    this.insuranceFormGroup.controls[0].get('insurance').setValue(3);
    this.insuranceFormGroup.controls[0].get('insuranceSuscriber').setValue(3);
    this.insuranceFormGroup.controls[0].get('society').setValue("CNAM");
    }

    this.initInsuranceForm();
    
    this.onGetCountry();
    this.getInsuranceSimpleList();
    this.getInsuranceSubscriberSimpleList();
  }

  initForm() {
    this.patientForm = new FormGroup({
      id: new FormControl(null),
      // active: new FormControl(true),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl(''),
      cellPhone1: new FormControl('', [Validators.required]),
      // cellPhone2: new FormControl(''),
      birthDate: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      civility: new FormControl('', [Validators.required]),
      idcardType: new FormControl('', [Validators.required]),
      idCardNumber: new FormControl(''),
      // cnamNumber: new FormControl('', [Validators.minLength(13)]),
      profession: new FormControl('', [Validators.required]),
      correspondant: new FormControl('', [Validators.required]),
      correspondantCellPhone: new FormControl(''),
      maritalStatus: new FormControl(''),
      // maidenName: new FormControl(''),
      emergencyContact: new FormControl(''),
      // emergencyContact2: new FormControl(''),
      numberOfChildren: new FormControl('0'),
      country: new FormControl(null),
      cityId: new FormControl(null),
      // motherFirstName: new FormControl('Dosso', [Validators.required]),
      // motherLastName: new FormControl('Mariam', [Validators.required]),
      // motherProfession: new FormControl('commercante'),
      // fatherName: new FormControl('kanate ali'),
      age: new FormControl(null),
      height: new FormControl(null),
      weight: new FormControl(null),
      // patientExternalId: new FormControl("", [Validators.required]),
      insurances: new FormControl([]),
    });
  }
  get lastName() {
    return this.patientForm.get('lastName');
  }
  get firstName() {
    return this.patientForm.get('firstName');
  }
  get email() {
    return this.patientForm.get('email');
  }
  get cellPhone1() {
    return this.patientForm.get('cellPhone1');
  }
  // get cellPhone2() {
  //   return this.patientForm.get('cellPhone2');
  // }
  get address() {
    return this.patientForm.get('address');
  }
  get birthDate() {
    return this.patientForm.get('birthDate');
  }
  get gender() {
    return this.patientForm.get('gender');
  }
  get civility() {
    return this.patientForm.get('civility');
  }
  get idcardType() {
    return this.patientForm.get('idcardType');
  }
  get idCardNumber() {
    return this.patientForm.get('idCardNumber');
  }
  get cnamNumber() {
    return this.patientForm.get('cnamNumber');
  }
  get profession() {
    return this.patientForm.get('profession');
  }
  get correspondant() {
    return this.patientForm.get('correspondant');
  }
  get correspondantCellPhone() {
    return this.patientForm.get('correspondantCellPhone');
  }
  get maritalStatus() {
    return this.patientForm.get('maritalStatus');
  }
  // get maidenName() {
  //   return this.patientForm.get('maidenName');
  // }
  get emergencyContact() {
    return this.patientForm.get('emergencyContact');
  }
  // get emergencyContact2() {
  //   return this.patientForm.get('emergencyContact2');
  // }
  get numberOfChildren() {
    return this.patientForm.get('numberOfChildren');
  }
  get cityId() {
    return this.patientForm.get('cityId');
  }
  get country() {
    return this.patientForm.get('country');
  }
  // get motherFirstName() {
  //   return this.patientForm.get('motherFirstName');
  // }
  // get motherLastName() {
  //   return this.patientForm.get('motherLastName');
  // }
  // get motherProfession() {
  //   return this.patientForm.get('motherProfession');
  // }
  get patientExternalId() {
    return this.patientForm.get('patientExternalId');
  }

  initInsuranceForm() {
    this.insuranceForm = new FormGroup({
      id: new FormControl(null),
      active: new FormControl(true),
      cardNumber: new FormControl('', [Validators.required]),
      coverage: new FormControl(null, [Validators.required]),
      insurance: new FormControl(null, [Validators.required]),
      insuranceSuscriber: new FormControl(null, [Validators.required]),
      // isPrincipalInsured: new FormControl(null),
      patient: new FormControl(null),
      // principalInsuredAffiliation: new FormControl(''),
      // principalInsuredContact: new FormControl(''),
      // principalInsuredName: new FormControl(''),
      society : new FormControl('')
    });
  }

  addInsurance() {
    this.initInsuranceForm();
    this.insuranceFormGroup.push(this.insuranceForm);
  }

  removeInsurance(index: any) {
    this.insuranceFormGroup.removeAt(index);
  }

  save() {
    this.invalidFom = !this.patientForm.valid;
    for (let index = 0; index < this.insuranceFormGroup.length; index++) {
      const element = this.insuranceFormGroup.controls[index];
      this.invalidInsuranceFom = element.invalid;
    }
    this.formSubmitted = true;

    if (this.patientForm.valid) {
      this.invalidFom = !this.insuranceFormGroup.valid;
      if (this.insuranceFormGroup.valid) {
        this.showloading = true;
      this.patient = this.patientForm.value;      
      this.infoFormString();
      this.patient.insurances = this.insuranceFormGroup.value;
      if (this.patient.id) {
        this.subs.add(
          this.patientService.updatePatient(this.patient).subscribe(
            (response: IPatient) => {
              this.showloading = false;
              this.updatePatient.emit();
            },
            (errorResponse: HttpErrorResponse) => {
              this.showloading = false;
              this.notificationService.notify(
                NotificationType.ERROR,
                errorResponse.error.message
              );
            }
          )
        );
      } else {
        this.subs.add(
          this.patientService.createPatient(this.patient).subscribe(
            (response: IPatient) => {
              this.showloading = false;
              this.addPatient.emit();
            },
            (errorResponse: HttpErrorResponse) => {
              this.showloading = false;
              this.notificationService.notify(
                NotificationType.ERROR,
                errorResponse.error.message
              );
            }
          )
        );
      }
      }
      
    }
  }

  infoFormString() {
    this.patient.cellPhone1 = this.patientForm
      .get('cellPhone1')
      .value.toString();
    // this.patient.cellPhone2 = this.patientForm
    //   .get('cellPhone2')
    //   .value.toString();
    this.patient.emergencyContact = this.patientForm
      .get('emergencyContact')
      .value.toString();
    // this.patient.emergencyContact2 = this.patientForm
    //   .get('emergencyContact2')
    //   .value.toString();
    this.patient.numberOfChildren = this.patientForm
      .get('numberOfChildren')
      .value.toString();
    this.patient.correspondantCellPhone = this.patientForm
      .get('correspondantCellPhone')
      .value.toString();
  }

  onGetCountry() {
    this.patientService.getCountry().subscribe(
      (res) => {
        this.countryList = res;
      },
      (err: HttpErrorResponse) => {}
    );
  }

  onGetCityBycountry(idCountry: number) {
    this.patientService.getCityByCountry(idCountry).subscribe(
      (res) => {
        this.cityList = res;
      },
      (err: HttpErrorResponse) => {}
    );
  }

  getInsuranceSimpleList() {
    this.subs.add(
      this.insuranceService.getAllInsuranceActive().subscribe(
        (response: any) => {
          this.insurances = response;
        },
        (errorResponse: HttpErrorResponse) => {
          this.notificationService.notify(
            NotificationType.ERROR,
            errorResponse.error.message
          );
        }
      )
    );
  }

  getInsuranceSubscriberSimpleList() {
    this.subs.add(
      this.insuranceSubscriberService
        .getAllInsuranceSubscriberActive()
        .subscribe(
          (response: any) => {
            this.insurancesSubscribers = response;
          },
          (errorResponse: HttpErrorResponse) => {
            this.notificationService.notify(
              NotificationType.ERROR,
              errorResponse.error.message
            );
          }
        )
    );
  }

  isPrincipalInsuredChange(row) {  
    console.log( this.insuranceFormGroup.controls[row].get('isPrincipalInsured').value);
      
    // if (this.insuranceFormGroup.controls[row].get('isPrincipalInsured').value) {
    //   let insuredName =
    //     this.patientForm.get('firstName').value +
    //     '' +
    //     this.patientForm.get('maidenName').value +
    //     ' ' +
    //     this.patientForm.get('lastName').value;
    //   let insuredContact = this.patientForm.get('cellPhone1').value;
    //   this.insuranceFormGroup.controls[row]
    //     .get('principalInsuredName')
    //     .setValue(insuredName);
    //   this.insuranceFormGroup.controls[row]
    //     .get('principalInsuredContact')
    //     .setValue(insuredContact);
    //   this.insuranceFormGroup.controls[row]
    //     .get('principalInsuredName')
    //     .disable();
    //   this.insuranceFormGroup.controls[row]
    //     .get('principalInsuredAffiliation')
    //     .disable();
    // }
  }

  showInsuranceView() {
    this.patientInfo = !this.patientInfo;
  }
}
