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
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { InsuranceService } from 'src/app/insurance/insurance.service';
import { SubscriberService } from 'src/app/insurance/subscriber.service';
import { GlobalGenerateValidator } from 'src/app/shared/validators/global-generic.validator';
import { NotificationService } from 'src/app/_services/notification.service';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';
import { SubSink } from 'subsink';
import { IPatient } from '../patient';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss'],
})
export class PatientFormComponent implements OnInit {
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

  statutMatrimonials = [
    { id: 'M', value: 'Marié(e)' },
    { id: 'C', value: 'Celibataire' },
    { id: 'V', value: 'Veuve' },
    { id: 'D', value: 'Divorcé(e)' },
  ];

  private validatiomMessage: { [key: string]: { [key: string]: string } } = {
    hotelName: {
      required: "Le nom de l'hotel est obligatoire",
      minlength: "Le nom de l'hotel doit comporter au moins 4 caractères",
    },
    price: {
      required: "Le prix de l'hotel est obligatoire",
      pattern: "Le prix de l'hotel doit etre un nombre",
    },
    rating: {
      range: 'Donnez une note comprise entre 1 et 5',
    },
  };

  isPrincipalInsuredOptions = [
    { id: 'Y', value: 'Oui' },
    { id: 'N', value: 'Non' }
  ]

  private globalGenericValidator!: GlobalGenerateValidator;

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

  constructor(
    private patientService: PatientService,
    private notificationService: NotificationService,
    private insuranceService : InsuranceService,
    private insuranceSubscriberService : SubscriberService
  ) {}

  // Unsubscribe when the component dies
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.globalGenericValidator = new GlobalGenerateValidator(
      this.validatiomMessage
    );
    this.initForm();
    if (this.patient) {
      console.log(this.patient);
      this.patientForm.patchValue(this.patient);
      // this.subs.add(
      //   this.communeService.getCommuneDetails(this.commune).subscribe(
      //     (response : Commune)=>{
      //       this.communeForm.patchValue(response);
      //       if (this.details) {
      //         this.communeForm.disable();
      //       }
      //     }
      //   )
      // )
    }

    this.initInsuranceForm();
    this.insuranceFormGroup.push(this.insuranceForm);
    this.onGetCountry();
    this.getInsuranceSimpleList();
    this.getInsuranceSubscriberSimpleList();
  }

  ngAfterViewInit(): void {
    const formControlBlurs: Observable<unknown>[] = this.inputElements.map(
      (FormControlElementRef: ElementRef) =>
        fromEvent(FormControlElementRef.nativeElement, 'blur')
    );

    merge(this.patientForm.valueChanges, ...formControlBlurs)
      .pipe(
        //si on clique sur le boutton sauvegarder ne pas utiliser le debounce time sinon l'utiliser pour les autres
        // debounce(() => this.isFormSubmitted ? EMPTY : timer(800))
        debounceTime(500)
      )
      .subscribe(() => {
        this.formsErrors = this.globalGenericValidator.createErrorMessage(
          this.patientForm,
          this.formSubmitted
        );
        console.log('error :', this.formsErrors);
      });
  }

  initForm() {
    this.patientForm = new FormGroup({
      id: new FormControl(null),
      // active: new FormControl(true),
      firstName: new FormControl("coulibaly"),
      lastName: new FormControl("Cherif Ousmane"),
      email: new FormControl("cherif@gmail.com"),
      cellPhone1: new FormControl("1111111111"),
      cellPhone2: new FormControl("223334442222"),
      address: new FormControl('', [Validators.required]),
      birthDate: new FormControl(null),
      gender: new FormControl("M"),
      civility: new FormControl(null),
      idcardType: new FormControl(null),
      idCardNumber: new FormControl("CNI1234556"),
      cnamNumber: new FormControl("23387478487"),
      profession: new FormControl("COMMERCIAL"),
      correspondant: new FormControl("ADJA"),
      correspondantCellPhone: new FormControl("787898797978"),
      maritalStatus: new FormControl(null),
      maidenName: new FormControl(null),
      emergencyContact: new FormControl(''),
      emergencyContact2: new FormControl(null),
      numberOfChildren: new FormControl(null),
      country: new FormControl(null),
      cityId: new FormControl(null),
      motherFirstName: new FormControl(null),
      motherLastName: new FormControl(null),
      motherProfession: new FormControl(null),
      patientExternalId: new FormControl("PATIENT 10"),
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
  get cellPhone2() {
    return this.patientForm.get('cellPhone2');
  }
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
  get maidenName() {
    return this.patientForm.get('maidenName');
  }
  get emergencyContact() {
    return this.patientForm.get('emergencyContact');
  }
  get emergencyContact2() {
    return this.patientForm.get('emergencyContact2');
  }
  get numberOfChildren() {
    return this.patientForm.get('numberOfChildren');
  }
  get cityId() {
    return this.patientForm.get('cityId');
  }
  get country() {
    return this.patientForm.get('country');
  }
  get motherFirstName() {
    return this.patientForm.get('motherFirstName');
  }
  get motherLastName() {
    return this.patientForm.get('motherLastName');
  }
  get motherProfession() {
    return this.patientForm.get('motherProfession');
  }
  get patientExternalId() {
    return this.patientForm.get('patientExternalId');
  }

  initInsuranceForm() {
    this.insuranceForm = new FormGroup({
      id: new FormControl(null),
      active: new FormControl(''),
      cardNumber: new FormControl(''),
      coverage: new FormControl(null),
      insurance: new FormControl(null),
      insuranceSuscriber: new FormControl(null),
      isPrincipalInsured: new FormControl(''),
      patient: new FormControl(null),
      principalInsuredAffiliation: new FormControl(''),
      principalInsuredContact: new FormControl(''),
      principalInsuredName: new FormControl(''),
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
    this.formSubmitted = true;
    if (this.patientForm.valid) {
      this.showloading = true;
      this.patient = this.patientForm.value;
      this.infoFormString();
      this.patient.insurances = this.insuranceFormGroup.value;
      console.log(this.patient);

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

  infoFormString() {
    this.patient.cellPhone1 = this.patientForm
      .get('cellPhone1')
      .value.toString();
    this.patient.cellPhone2 = this.patientForm
      .get('cellPhone2')
      .value.toString();
    this.patient.emergencyContact = this.patientForm
      .get('emergencyContact')
      .value.toString();
    this.patient.emergencyContact2 = this.patientForm
      .get('emergencyContact2')
      .value.toString();
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
        console.log(res);
        this.countryList = res;
        console.log('TCL: onGetCountry -> ', this.countryList);
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }

  onGetCityBycountry(idCountry: number) {
    this.patientService.getCityByCountry(idCountry).subscribe(
      (res) => {
        console.log(res);
        this.cityList = res;
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }

  getInsuranceSimpleList(){
   this.subs.add(
     this.insuranceService.getAllInsuranceActive().subscribe(
       (response : any) => {
          this.insurances = response;
       },
       (errorResponse : HttpErrorResponse) => {
        this.notificationService.notify(
          NotificationType.ERROR,
          errorResponse.error.message
        );
       }
     )
   )
  }

  getInsuranceSubscriberSimpleList(){
    this.subs.add(
      this.insuranceSubscriberService.getAllInsuranceSubscriberActive().subscribe(
        (response : any) => {
           this.insurancesSubscribers = response;
           console.log(this.insurancesSubscribers);
           
        },
        (errorResponse : HttpErrorResponse) => {
         this.notificationService.notify(
           NotificationType.ERROR,
           errorResponse.error.message
         );
        }
      )
    )
   }

  isPrincipalInsuredChange(row){
    if(this.insuranceFormGroup.controls[row].get('isPrincipalInsured').value == 'Y') {
      let insuredName = this.patientForm.get('firstName').value + ""+ this.patientForm.get('maidenName').value +" "+ this.patientForm.get('lastName').value;
      let insuredContact = this.patientForm.get('cellPhone1').value;
      this.insuranceFormGroup.controls[row].get('principalInsuredName').setValue(insuredName);
      this.insuranceFormGroup.controls[row].get('principalInsuredContact').setValue(insuredContact);
      this.insuranceFormGroup.controls[row].get('principalInsuredName').disable();
      this.insuranceFormGroup.controls[row].get('principalInsuredAffiliation').disable();

    }
}
}
