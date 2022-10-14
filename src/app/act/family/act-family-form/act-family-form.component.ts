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
import { ActGroupService } from '../act-group.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { GlobalGenerateValidator } from 'src/app/shared/validators/global-generic.validator';
import {
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ActGroup } from '../model/act-group';
import { NotificationType } from 'src/app/_utilities/notification-type-enum';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-act-family-form',
  templateUrl: './act-family-form.component.html',
  styleUrls: ['./act-family-form.component.scss'],
})
export class ActFamilyFormComponent implements OnInit {
  private subs = new SubSink();

  @Input()
  actGroup: ActGroup;

  @Input()
  details: boolean;

  @Output('addActGroup') addActGroup: EventEmitter<any> = new EventEmitter();
  @Output('updateActGroup') updateActGroup: EventEmitter<any> =
    new EventEmitter();

  /**
   * form
   */
  public actGroupForm: FormGroup;

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
    private actGroupService: ActGroupService,
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
    if (this.actGroup) {
      console.log(this.actGroup);
      this.actGroupForm.patchValue(this.actGroup);
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

    merge(this.actGroupForm.valueChanges, ...formControlBlurs)
      .pipe(
        //si on clique sur le boutton sauvegarder ne pas utiliser le debounce time sinon l'utiliser pour les autres
        // debounce(() => this.isFormSubmitted ? EMPTY : timer(800))
        debounceTime(500)
      )
      .subscribe(() => {
        this.formsErrors = this.globalGenericValidator.createErrorMessage(
          this.actGroupForm,
          this.formSubmitted
        );
        console.log('error :', this.formsErrors);
      });
  }

  initForm() {
    this.actGroupForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', [Validators.required]),
      active: new FormControl(true),
    });
  }
  get name() {
    return this.actGroupForm.get('name');
  }

  save() {
    this.invalidFom = !this.actGroupForm.valid;
    this.formSubmitted = true;
    if (this.actGroupForm.valid) {
      this.showloading = true;
      this.actGroup = this.actGroupForm.value;
      console.log(this.actGroup);

      if (this.actGroup.id) {
        this.subs.add(
          this.actGroupService.updateActGroup(this.actGroup).subscribe(
            (response: ActGroup) => {
              this.showloading = false;
              this.updateActGroup.emit();
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
          this.actGroupService.createActGroup(this.actGroup).subscribe(
            (response: ActGroup) => {
              this.showloading = false;
              this.addActGroup.emit();
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
