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
  FormBuilder,
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { IPatient } from 'src/app/patient/patient';
import { GlobalGenerateValidator } from 'src/app/shared/validators/global-generic.validator';
import { NotificationService } from 'src/app/_services/notification.service';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';
import { SubSink } from 'subsink';
import { IConstant } from '../../constantDomain/constant.model';
import { IConstantType } from '../../constantType/constant-type.model';
import { ConstantTypeService } from '../../constantType/constant-type.service';
import { IPatientConstantDto } from '../models/patient-constant-dto';
import { PatientConstantService } from '../service/patient-constant.service';

@Component({
  selector: 'app-patient-constant-form',
  templateUrl: './patient-constant-form.component.html',
  styleUrls: ['./patient-constant-form.component.scss'],
})
export class PatientConstantFormComponent implements OnInit {
  private subs = new SubSink();

  @Input()
  constantType: IConstantType;

  @Input()
  details: boolean;

  @Input()
  patient: IPatient;
  
  patientConstantDto : IPatientConstantDto

  @Output('addConstantType') addConstantType: EventEmitter<any> =
    new EventEmitter();
  @Output('updateConstantType') updateConstantType: EventEmitter<any> =
    new EventEmitter();


  /**
   * form
   */
  public constantTypeForm: FormGroup;

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
  constantDomainList: IConstant[];

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
    private fb: FormBuilder,
    private constantTypeService: ConstantTypeService,
    private notificationService: NotificationService,
    private patientConstantService : PatientConstantService
  ) {}

  // Unsubscribe when the component dies
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    console.log(this.patient);
    
    this.globalGenericValidator = new GlobalGenerateValidator(
      this.validatiomMessage
    );
    this.initForm();
    this.onGetPatientDomainActe();
    if (this.constantType) {
      console.log(this.constantType);
      this.constantTypeForm.patchValue(this.constantType);
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

    merge(this.constantTypeForm.valueChanges, ...formControlBlurs)
      .pipe(
        //si on clique sur le boutton sauvegarder ne pas utiliser le debounce time sinon l'utiliser pour les autres
        // debounce(() => this.isFormSubmitted ? EMPTY : timer(800))
        debounceTime(500)
      )
      .subscribe(() => {
        this.formsErrors = this.globalGenericValidator.createErrorMessage(
          this.constantTypeForm,
          this.formSubmitted
        );
        console.log('error :', this.formsErrors);
      });
  }

  initForm() {
    this.constantTypeForm = this.fb.group({
      id: new FormControl(null),
      constants: this.fb.array([this.createConstant()]),
    });
  }
  get name() {
    return this.constantTypeForm.get('name');
  }

  get constants(): FormArray {
    return <FormArray>this.constantTypeForm.get('constants') as FormArray;
  }

  createConstant(): FormGroup {
    return this.fb.group({
      value: [''],
      description: [''],
      constant: [null],
      observation : [""],
      patient : [this.patient.id]
    });
  }

  addConstant() {
    this.constants.push(this.createConstant());
  }

  removeConstant(index: number) {
    this.constants.removeAt(index);
  }

  save() {
    this.invalidFom = !this.constantTypeForm.valid;
    this.formSubmitted = true;
    if (this.constantTypeForm.valid) {
      // this.showloading = true;
      this.patientConstantDto =  this.constantTypeForm.get("constants").value;
      console.log(this.patientConstantDto);

      if (this.patientConstantDto.id) {
        this.subs.add(
          this.patientConstantService
            .updatePatientConstant(this.patientConstantDto)
            .subscribe(
              (response: IPatientConstantDto) => {
                this.showloading = false;
                this.updateConstantType.emit();
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
          this.patientConstantService
            .createPatientConstant(this.patientConstantDto)
            .subscribe(
              (response: IPatientConstantDto) => {
                this.showloading = false;
                this.addConstantType.emit();
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

  onGetPatientDomainActe() {
    this.constantTypeService.getNameAndIdOfConstanteTypeActive().subscribe(
      (res) => {
        console.log('Domaine acte ::', res);
        this.constantDomainList = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
