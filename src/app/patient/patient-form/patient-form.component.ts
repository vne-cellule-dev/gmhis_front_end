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
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
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

  private globalGenericValidator!: GlobalGenerateValidator;

  @ViewChildren(FormControlName, { read: ElementRef })
  inputElements!: ElementRef[];

  public errorMessage!: string;

  public formsErrors: { [key: string]: string } = {};

  private isFormSubmitted: boolean = false;

  constructor(
    private patientService: PatientService,
    private notificationService: NotificationService
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
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      email: new FormControl(null),
      cellPhone1: new FormControl(null),
      cellPhone2: new FormControl(null),
      address: new FormControl('', [Validators.required]),
      birthDate: new FormControl(null),
      gender: new FormControl(null),
      civility: new FormControl(null),
      idcardType: new FormControl(null),
      idCardNumber: new FormControl(null),
      cnamNumber: new FormControl(null),
      profession: new FormControl(null),
      correspondant: new FormControl(null),
      correspondantCellPhone: new FormControl(null),
      maritalStatus: new FormControl(null),
      maidenName: new FormControl(null),
      emergencyContact: new FormControl(null),
      emergencyContact2: new FormControl(null),
      numberOfChildren: new FormControl(null),
      country: new FormControl(null),
      cityId: new FormControl(null),
      motherFirstName: new FormControl(null),
      motherLastName: new FormControl(null),
      motherProfession: new FormControl(null),
      patientExternalId: new FormControl(null),
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

  save() {
    this.invalidFom = !this.patientForm.valid;
    this.formSubmitted = true;
    if (this.patientForm.valid) {
      this.showloading = true;
      this.patient = this.patientForm.value;
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
}
