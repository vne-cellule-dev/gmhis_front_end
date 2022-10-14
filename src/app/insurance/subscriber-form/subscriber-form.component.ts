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
import { InsuranceService } from '../insurance.service';
import { IInsuranceSubscriber } from '../insuranceSubscriber.model';
import { SubscriberService } from '../subscriber.service';

@Component({
  selector: 'app-subscriber-form',
  templateUrl: './subscriber-form.component.html',
  styleUrls: ['./subscriber-form.component.scss'],
})
export class SubscriberFormComponent implements OnInit {
  private subs = new SubSink();

  @Input()
  insuranceSubscriber: IInsuranceSubscriber;

  @Input()
  details: boolean;

  @Output('addInsuranceSubscriber') addInsuranceSubscriber: EventEmitter<any> =
    new EventEmitter();
  @Output('updateInsuranceSubscriber')
  updateInsuranceSubscriber: EventEmitter<any> = new EventEmitter();

  /**
   * form
   */
  public insuranceSubscriberForm: FormGroup;

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
    private insuranceSubscriberService: SubscriberService,
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
    if (this.insuranceSubscriber) {
      console.log(this.insuranceSubscriber);
      this.insuranceSubscriberForm.patchValue(this.insuranceSubscriber);
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

    merge(this.insuranceSubscriberForm.valueChanges, ...formControlBlurs)
      .pipe(
        //si on clique sur le boutton sauvegarder ne pas utiliser le debounce time sinon l'utiliser pour les autres
        // debounce(() => this.isFormSubmitted ? EMPTY : timer(800))
        debounceTime(500)
      )
      .subscribe(() => {
        this.formsErrors = this.globalGenericValidator.createErrorMessage(
          this.insuranceSubscriberForm,
          this.formSubmitted
        );
        console.log('error :', this.formsErrors);
      });
  }

  initForm() {
    this.insuranceSubscriberForm = new FormGroup({
      id: new FormControl(null),
      active: new FormControl(true),
      name: new FormControl('nom', [Validators.required]),
      address: new FormControl('address', [Validators.required]),
      code: new FormControl('code', [Validators.required]),
    });
  }
  get name() {
    return this.insuranceSubscriberForm.get('name');
  }
  get address() {
    return this.insuranceSubscriberForm.get('address');
  }
  get account() {
    return this.insuranceSubscriberForm.get('account');
  }
  get code() {
    return this.insuranceSubscriberForm.get('code');
  }

  save() {
    this.invalidFom = !this.insuranceSubscriberForm.valid;
    this.formSubmitted = true;
    if (this.insuranceSubscriberForm.valid) {
      this.showloading = true;
      this.insuranceSubscriber = this.insuranceSubscriberForm.value;
      console.log(this.insuranceSubscriber);

      if (this.insuranceSubscriber.id) {
        this.subs.add(
          this.insuranceSubscriberService
            .updateInsuranceSubscriber(this.insuranceSubscriber)
            .subscribe(
              (response: IInsuranceSubscriber) => {
                this.showloading = false;
                this.updateInsuranceSubscriber.emit();
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
          this.insuranceSubscriberService
            .createInsuranceSubscriber(this.insuranceSubscriber)
            .subscribe(
              (response: IInsuranceSubscriber) => {
                this.showloading = false;
                this.addInsuranceSubscriber.emit();
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
