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
import { ICashRegister } from '../cash-register.model';
import { CashRegisterService } from '../cash-register.service';

@Component({
  selector: 'app-cash-register-form',
  templateUrl: './cash-register-form.component.html',
  styleUrls: ['./cash-register-form.component.scss'],
})
export class CashRegisterFormComponent implements OnInit {
  private subs = new SubSink();

  @Input()
  cashRegister: ICashRegister;

  @Input()
  details: boolean;

  @Output('addCashRegister') addCashRegister: EventEmitter<any> =
    new EventEmitter();
  @Output('updateCashRegister') updateCashRegister: EventEmitter<any> =
    new EventEmitter();

  /**
   * form
   */
  public cashRegisterForm: FormGroup;

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
    private cashRegisterService: CashRegisterService,
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
    if (this.cashRegister) {
      console.log(this.cashRegister);
      this.cashRegisterForm.patchValue(this.cashRegister);
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

    merge(this.cashRegisterForm.valueChanges, ...formControlBlurs)
      .pipe(
        //si on clique sur le boutton sauvegarder ne pas utiliser le debounce time sinon l'utiliser pour les autres
        // debounce(() => this.isFormSubmitted ? EMPTY : timer(800))
        debounceTime(500)
      )
      .subscribe(() => {
        this.formsErrors = this.globalGenericValidator.createErrorMessage(
          this.cashRegisterForm,
          this.formSubmitted
        );
        console.log('error :', this.formsErrors);
      });
  }

  initForm() {
    this.cashRegisterForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', [Validators.required]),
      active: new FormControl(true),
      value: new FormControl(null),
    });
  }
  get name() {
    return this.cashRegisterForm.get('name');
  }

  save() {
    this.invalidFom = !this.cashRegisterForm.valid;
    this.formSubmitted = true;
    if (this.cashRegisterForm.valid) {
      this.showloading = true;
      this.cashRegister = this.cashRegisterForm.value;
      console.log(this.cashRegister);

      if (this.cashRegister.id) {
        this.subs.add(
          this.cashRegisterService
            .updateCashRegister(this.cashRegister)
            .subscribe(
              (response: ICashRegister) => {
                this.showloading = false;
                this.updateCashRegister.emit();
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
          this.cashRegisterService
            .createCashRegister(this.cashRegister)
            .subscribe(
              (response: ICashRegister) => {
                this.showloading = false;
                this.addCashRegister.emit();
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
